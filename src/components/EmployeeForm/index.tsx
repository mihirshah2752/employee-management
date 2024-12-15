import React from "react";

interface EmployeeFormProps {
  formRef: React.Ref<any>;
  formFields: any;
  handleSubmit: any;
  handleChange: any;
  employeeData: any;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  formRef,
  handleSubmit,
  handleChange,
  employeeData,
  formFields,
}) => {
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {formFields?.map((field: any, index: any) => (
        <div key={index} className="mb-3 pt-0">
          <label>
            {field.label}{" "}
            {!!field.required && <span className="text-red-600">*</span>}
            <input
              className="form-input"
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={employeeData[field.name]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
    </form>
  );
};
