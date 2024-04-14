import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputes from "./components/Inputes";
import InputError from "./components/InputError";
import { ISignup, signupSchema } from "./validation/auth";

// formik + yup
// react-hook-form + zod

const Form = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<ISignup> = ({
    first_name,
    last_name,
    email,
    password,
  }) => {
    // send data to the server backend and validate
    const user = {
      first_name,
      last_name,
      email,
      password,
    };
    // reset values from
    reset();
    console.log(user);
  };

  const signupInputes = [
    {
      type: "text",
      placeholder: "Enter your first name",
      register: register("first_name"),
      error: errors.first_name,
    },
    {
      type: "text",
      placeholder: "Enter your last name",
      register: register("last_name"),
      error: errors.last_name,
    },
    {
      type: "email",
      placeholder: "Enter your email",
      register: register("email"),
      error: errors.email,
    },
    {
      type: "password",
      placeholder: "Enter your password",
      register: register("password"),
      error: errors.password,
    },
    {
      type: "password",
      placeholder: "Enter your confirm password",
      register: register("confirm_password"),
      error: errors.confirm_password,
    },
  ];
  return (
    <div>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {signupInputes.map((input, i) => (
          <div key={i}>
            <Inputes
              type={input.type}
              placeholder={input.placeholder}
              register={input.register}
            />
            <InputError error={input.error} />
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Form;
