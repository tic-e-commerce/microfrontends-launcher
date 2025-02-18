import React from "react";

interface BillingFormProps {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phoneNumber: string;
  };
  formErrors: {
    firstName: boolean;
    address: boolean;
    city: boolean;
    phoneNumber: boolean;
  };
  isTouched: {
    firstName: boolean;
    lastName: boolean;
    address: boolean;
    city: boolean;
    phoneNumber: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const BillingForm: React.FC<BillingFormProps> = ({
  formData,
  formErrors,
  isTouched,
  handleInputChange,
  handleBlur,
}) => {
  return (
    <form>
      {["firstName", "lastName", "address", "city", "phoneNumber"].map(
        (field) => (
          <div key={field} className="mb-3">
            <label htmlFor={field} className="form-label">
              {field
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/^./, (str) => str.toUpperCase())}
              {field !== "lastName" && " *"}
            </label>
            <input
              type={field === "phoneNumber" ? "tel" : "text"}
              className={`form-control ${
                isTouched[field as keyof typeof isTouched] &&
                formErrors[field as keyof typeof formErrors]
                  ? "is-invalid"
                  : ""
              }`}
              id={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={field !== "lastName"}
            />
            {field !== "lastName" &&
              isTouched[field as keyof typeof isTouched] &&
              formErrors[field as keyof typeof formErrors] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(
                    `${field.replace(/([A-Z])/g, " $1").trim()} is required.`
                  )}
                </div>
              )}
          </div>
        )
      )}
    </form>
  );
};

export default BillingForm;
