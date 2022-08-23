type ValidateTypes = {
  email?: string;
  password?: string;
  repeatedPassword?: string;
};
type ErrorsTypes = ValidateTypes & Record<string, never>;

export const validate = (values: ValidateTypes) => {
  const errors: ErrorsTypes = {};

  if (!values.email) {
    errors.email = 'Field is empty';
  } else if (!/[\w.-]+@([\w-]+\.)+[\w-]+/g.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Field is empty';
  } else if (values.password.length < 5) errors.password = 'less then 5 symbols';
  if (!values.repeatedPassword) {
    errors.repeatedPassword = 'Field is empty';
  } else if (values.repeatedPassword !== values.password) {
    errors.repeatedPassword = 'Password mismatch';
  }

  return errors;
};
