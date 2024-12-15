import React, { useEffect, useRef, useState } from "react";
import {
  ADD_MODAL_FIELDS,
  ADD_NEW_EMP,
  MODAL_FIELDS,
  UPDATE_MODAL_FIELDS,
} from "../config/dashboard.config";
import { CustomModal } from "../components/CustomModal";
import { Employee } from "../utils/fetchers";
import { EmployeeForm } from "../components/EmployeeForm";
import { EmployeesServices } from "../features/employeeSlice";
import { useAppDispatch, useTypedSelector } from "../redux/store";
import EmployeeTable from "../components/EmployeeTable";
import {
  ACTIONS,
  LOADING_TEXT,
  NO_DATA_TEXT,
  TABLE_COLUMNS,
} from "../config/table.config";
import {
  EMPLOYEE_INITIAL_STATE,
  FORM_FIELDS,
} from "../config/employeeForm.config";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalFields, setModalFields] = useState(MODAL_FIELDS);
  const [newEmployee, setNewEmployee] = useState<Employee>(
    EMPLOYEE_INITIAL_STATE
  );
  const formRef = useRef<HTMLFormElement>();
  const dispatch = useAppDispatch();
  const employees = useTypedSelector(
    (state) => state.EmployeesReducer.employees
  );
  const isLoading = useTypedSelector((state) => state.EmployeesReducer.loading);
  const error = useTypedSelector((state) => state.EmployeesReducer.error);

  console.log(error);

  useEffect(() => {
    dispatch(EmployeesServices.getEmployeesList());
  }, [dispatch]);

  const clearStates = () => {
    setNewEmployee(EMPLOYEE_INITIAL_STATE);
    setShowModal(false);
    setModalFields(MODAL_FIELDS);
  };

  const handleCloseModal = () => {
    clearStates();
    setModalFields(MODAL_FIELDS);
  };

  const handleDialogAction = () => {
    formRef.current && formRef.current.requestSubmit();
  };

  const handleDeleteEmployee = (data: any) => {
    dispatch(EmployeesServices.deleteEmployee(data.id));
  };

  const handleUpdateClick = async (data: Employee) => {
    setNewEmployee({
      name: data.name,
      position: data.position,
      department: data.department,
      contact: data.contact,
      id: data.id,
    });
    setModalFields(UPDATE_MODAL_FIELDS);
    setShowModal(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (modalFields.actionBtnText === "Update") {
      const result = await dispatch(
        EmployeesServices.updateEmployee(newEmployee)
      );
      if (result.meta.requestStatus === "fulfilled") {
        clearStates();
      }
    } else {
      const result = await dispatch(EmployeesServices.addEmployee(newEmployee));
      if (result.meta.requestStatus === "fulfilled") {
        clearStates();
      } else {
        // validation logic
      }
    }
  };

  return (
    <div className="container">
      <div className="flex justify-end my-4">
        <button
          onClick={() => {
            setModalFields(ADD_MODAL_FIELDS);
            setShowModal(true);
          }}
          className="btn-primary text-pretty tracking-tight text-sm"
        >
          {ADD_NEW_EMP}
        </button>
      </div>
      {error && (
        <p className="text-right text-red-600 font-semibold">{error}</p>
      )}
      <EmployeeTable
        isLoading={isLoading}
        loadingText={LOADING_TEXT}
        data={employees}
        columns={TABLE_COLUMNS}
        noData={NO_DATA_TEXT}
        actions={[
          { ...ACTIONS[0], handleClick: handleUpdateClick },
          { ...ACTIONS[1], handleClick: handleDeleteEmployee },
        ]}
      />
      <CustomModal
        showModal={showModal}
        title={modalFields.title}
        handleCloseModal={handleCloseModal}
        handleDialogAction={handleDialogAction}
        body={
          <EmployeeForm
            formRef={formRef}
            employeeData={newEmployee}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formFields={FORM_FIELDS}
          />
        }
        actionBtnText={modalFields.actionBtnText}
      />
    </div>
  );
};
