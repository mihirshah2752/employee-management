import React from "react";
import { Employee } from "../utils/fetchers";

interface TableProps {
  data: Employee[];
  columns: string[];
  noData: string;
  loadingText: string;
  actions: any;
  isLoading: boolean;
}

const EmployeeTable: React.FC<TableProps> = ({
  data,
  columns,
  noData,
  actions,
  isLoading,
  loadingText,
}) => {
  return (
    <div className="relative overflow-x-auto sm:overflow-hidden">
      <table className="min-w-full bg-white border-collapse border border-slate-500 table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((employee) => (
              <tr key={employee?.id} className="hover:bg-gray-100">
                <td className="td-default">{employee?.id}</td>
                <td className="td-default">{employee?.name}</td>
                <td className="td-default">{employee?.position}</td>
                <td className="td-default">{employee?.contact}</td>
                <td className="td-default">{employee?.department}</td>
                <td className="td-default">
                  {actions?.map((action: any, index: any) => (
                    <button
                      key={index}
                      ref={action.ref}
                      onClick={() => action.handleClick(employee)}
                      className={action.className}
                    >
                      {action.child}
                    </button>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {isLoading ? (
                <td colSpan={6} className="no-data">
                  {loadingText}
                </td>
              ) : (
                <td colSpan={6} className="no-data">
                  {noData}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
