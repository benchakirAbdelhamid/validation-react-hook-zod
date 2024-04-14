import { FieldError } from "react-hook-form";

const InputError = ({ error }: { error: FieldError | undefined }) => {
  return error && <span>{error.message}</span>;
};

export default InputError;
