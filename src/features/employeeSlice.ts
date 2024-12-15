import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  delEmployee,
  Employee,
  fetchEmployees,
  postEmployee,
  putEmployee,
} from "../utils/fetchers";

interface EmployeesInitialStateType {
  loading: boolean;
  employees: any[];
  error: string | null;
}

const initialState: EmployeesInitialStateType = {
  loading: false,
  employees: [],
  error: null,
};

// Fetch Employee async thunk
const getEmployeesList = createAsyncThunk(
  "employeesSlice/getEmployeesList",
  async (_, thunkApi) => {
    try {
      const response = await fetchEmployees("/api/employee");
      const data = response.employees;
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Add Employee async thunk
export const addEmployee = createAsyncThunk(
  "employeesSlice/addEmployee",
  async (newEmployee: Employee, thunkApi) => {
    try {
      const response = await postEmployee("/api/employee", newEmployee);
      const data = response.employee;
      return thunkApi.fulfillWithValue(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Update Employee async thunk
export const updateEmployee = createAsyncThunk(
  "employeesSlice/updateEmployee",
  async (updatedEmployee: Employee, thunkApi) => {
    try {
      const response = await putEmployee(
        `/api/employee/${updatedEmployee.id}`,
        updatedEmployee
      );
      const data = response.employee;
      return thunkApi.fulfillWithValue(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Delete Employee async thunk
const deleteEmployee = createAsyncThunk(
  "employeesSlice/deleteEmployee",
  async (employeeId: number, thunkApi) => {
    try {
      const response = await delEmployee(`/api/employee/${employeeId}`);
      console.log('response', response);
      
      if (response?.success) {
        return thunkApi.fulfillWithValue(employeeId);
      } else {
        return thunkApi.rejectWithValue(response.error);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const EmployeesSlice = createSlice({
  name: "employeesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeesList.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployeesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action: any) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        console.log('dfd',action.payload);
        
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const EmployeesThunks = {
  addEmployee, // C
  getEmployeesList, // R
  updateEmployee, // U
  deleteEmployee, // D
};

export const EmployeesServices = {
  ...EmployeesThunks,
  actions: EmployeesSlice.actions, //This includes all the action methods written above
};

const EmployeesReducer = EmployeesSlice.reducer; //This is stored in the main store

export default EmployeesReducer;
