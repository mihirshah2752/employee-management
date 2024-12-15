import { Employee } from "../utils/fetchers";

export type FieldsType = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
};

export const EMPLOYEE_INITIAL_STATE: Employee = {
  name: "",
  position: "",
  department: "",
  contact: "",
};

export const FORM_FIELDS: FieldsType[] = [
  {
    label: "Enter employee name",
    type: "text",
    name: "name",
    placeholder: "Employee Name",
    required: true,
  },
  {
    label: "Enter employee contact number",
    type: "number",
    name: "contact",
    placeholder: "Contact Number",
    required: true,
  },
  {
    label: "Enter employee position",
    type: "text",
    name: "position",
    placeholder: "Position",
    required: true,
  },
  {
    label: "Enter employee department",
    type: "text",
    name: "department",
    placeholder: "Department",
    required: true,
  },
];
