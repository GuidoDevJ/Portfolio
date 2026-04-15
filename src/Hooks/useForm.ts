import { useState, useCallback } from "react";
import type { FormValues, ValidationErrors } from "src/helpers/validation";
import { validateForm, hasErrors } from "src/helpers/validation";
import { sendEmail } from "src/helpers";

type FormStatus = "idle" | "loading" | "success" | "error";

interface UseFormReturn {
  values: FormValues;
  errors: ValidationErrors;
  status: FormStatus;
  errorMessage: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

export const useForm = (): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      const validationErrors = validateForm(values);
      setErrors(validationErrors);

      if (hasErrors(validationErrors)) {
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        await sendEmail(values);
        setStatus("success");
        setValues(initialValues);

        // Reset success status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again."
        );
      }
    },
    [values]
  );

  return {
    values,
    errors,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
