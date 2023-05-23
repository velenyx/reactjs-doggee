/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
interface UseFormParams<Values> {
  initialValues?: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => string | null;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends object>({
  initialValues,
  validateSchema,
  validateOnChange = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Pick<Values, K>[K]) => {
    // @ts-ignore
    setValues({ ...values, [field]: value });

    const validateSchemeExistForFields = !!validateSchema && !!validateSchema[field];
    if (!validateSchemeExistForFields || !validateOnChange) return;

    // @ts-ignore
    const error = validateSchema[field](value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldsError = <K extends keyof Values>(field: K, error: Pick<Values, K>[K]) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmiting(true);
    // @ts-ignore
    return !!onSubmit && onSubmit(values);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldsError,
    handleSubmit,
    isSubmiting,
    setIsSubmiting
  };
};
