export type Employee = {
  id?: number;
  name?: string;
  contact?: number | string;
  position?: string;
  department?: string;
};

type EmployeeResponse = {
  employees: Employee[];
  employee: Employee[];
  success: boolean;
  error: string;
};

export const fetchEmployees = (url: string) =>
  fetch(url).then<EmployeeResponse>((r) => r.json());

export const delEmployee = (url: string) =>
  fetch(url, { method: "DELETE" }).then<EmployeeResponse>((r) => r.json());

export const postEmployee = (url: string, data: Employee) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then<EmployeeResponse>((r) => r.json());

export const putEmployee = (url: string, data: Employee) =>
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then<EmployeeResponse>((r) => r.json());
