import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "src/context/LanguageContext";
import { sendEmail } from "src/helpers";
import { isValidEmail } from "src/helpers/validation";
import { canSendEmail, recordEmailSent, getRemainingEmails } from "src/helpers/rateLimit";
import { Toast } from "src/ui/Toast";
import style from "./style.module.css";

type ToastType = "success" | "error" | "info";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const MAX_SENDS = 2;

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

const FormContact = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });
  const [remaining, setRemaining] = useState<number>(MAX_SENDS);

  // Read from localStorage only on the client
  useEffect(() => {
    setRemaining(getRemainingEmails());
  }, []);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = t.contact.validation.nameRequired;
    } else if (values.name.trim().length < 2) {
      newErrors.name = t.contact.validation.nameMin;
    }

    if (!values.email.trim()) {
      newErrors.email = t.contact.validation.emailRequired;
    } else if (!isValidEmail(values.email)) {
      newErrors.email = t.contact.validation.emailInvalid;
    }

    if (!values.message.trim()) {
      newErrors.message = t.contact.validation.messageRequired;
    } else if (values.message.trim().length < 10) {
      newErrors.message = t.contact.validation.messageMin;
    }

    return newErrors;
  }, [values, t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSendEmail()) {
      showToast(t.contact.rateLimit.exceeded, "error");
      return;
    }

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");

    try {
      await sendEmail(values);
      recordEmailSent();
      setRemaining(getRemainingEmails());
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      showToast(t.contact.toast.success, "success");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      showToast(t.contact.toast.error, "error");
    }
  };

  const limitReached = remaining === 0;

  return (
    <>
      <form
        className={`${style.form} ${limitReached ? style.formDisabled : ""}`}
        onSubmit={onSubmit}
        noValidate
      >
        <div className={style.form_group}>
          <label htmlFor="name">{t.contact.form.name}</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder={t.contact.form.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className={style.error}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="email">{t.contact.form.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder={t.contact.form.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className={style.error}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="message">{t.contact.form.message}</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder={t.contact.form.messagePlaceholder}
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className={style.error}>
              {errors.message}
            </span>
          )}
        </div>

        <div className={style.buttonContainer}>
          {limitReached ? (
            <p className={style.limitReached}>
              {t.contact.rateLimit.exceeded}{" "}
              {t.contact.rateLimit.contact}
            </p>
          ) : (
            <>
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <span className={style.loading}>{t.contact.form.sending}</span>
                ) : (
                  t.contact.form.submit
                )}
              </button>
              {remaining < MAX_SENDS && (
                <span className={style.remainingHint}>
                  {remaining === 1
                    ? t.contact.rateLimit.remaining1
                    : t.contact.rateLimit.remainingN.replace("{count}", String(remaining))}
                </span>
              )}
            </>
          )}
        </div>

        {status === "success" && (
          <p className={style.success}>{t.contact.form.success}</p>
        )}
      </form>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  );
};

export { FormContact };
