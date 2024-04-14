import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// formik + yup
// react-hook-form + zod

const App = () => {
  const signupSchema = z
    .object({
      first_name: z.string().min(1, { message: "First name is required" }),
      last_name: z.string().min(1, { message: "Last name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required " })
        .email({ message: "Not valid email" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, { message: "Password must be at least 20 characters " }),
      confirm_password: z
        .string()
        .min(6, { message: "Cinfirm must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });

  type ISignup = z.infer<typeof signupSchema>;
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
    reset()
    console.log(user);
  };
  return (
    <div>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter your first name"
          // name="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && <span>{errors.first_name.message}</span>}
        <input
          type="text"
          placeholder="Enter your last name"
          // name="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <span>{errors.last_name.message}</span>}
        <input
          type="email"
          placeholder="Enter your email"
          // name="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Enter your password"
          // name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="password"
          placeholder="Enter your confirm password"
          // name="confirm_password"
          {...register("confirm_password", { required: true })}
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}

        <button type="submit" disabled={isSubmitting}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default App;
