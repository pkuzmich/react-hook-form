import { useForm, type SubmitHandler } from "react-hook-form";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

function SignUpForm() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>();
  const { errors, isDirty, isSubmitting } = formState;

  const sleep = async (timeout: number) => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    await sleep(2000);
    fetch("/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("firstName", { required: true })} />
      {errors.firstName?.type === "required" && <p className="error">First name is required</p>}

      <input type="text" placeholder="Last name" {...register("lastName", { required: true })} />
      {errors.lastName?.type === "required" && <span className="error">Last name is required</span>}

      <input
        type="email"
        placeholder="E-mail"
        {...register("email", { required: true, pattern: emailPattern })}
      />
      {errors.email?.type === "required" && <span className="error">Email is required</span>}
      {errors.email?.type === "pattern" && <span className="error">Email is invalid</span>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, minLength: 3 })}
      />
      {errors.password?.type === "required" && <p className="error">Password is required</p>}
      {errors.password?.type === "minLength" && (
        <p className="error">Password must be at least 3 characters long</p>
      )}

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? "Submitting " : "Sign Up"}
      </button>
    </form>
  );
}

export default SignUpForm;
