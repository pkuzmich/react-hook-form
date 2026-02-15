import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormData = {
  height: number;
  weight: number;
};

function BMI() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [bmi, setBmi] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { height, weight } = data;
    const bmi = (weight / height ** 2).toFixed(1);
    setBmi(bmi);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          {...register("height", { required: true, valueAsNumber: true })}
          placeholder="Height"
          step="any"
        />
        {errors.height?.type === "required" && <span className="error">Height is required</span>}
        <input
          type="number"
          {...register("weight", { required: true, valueAsNumber: true })}
          placeholder="Weight"
          step="any"
        />
        {errors.weight?.type === "required" && <span className="error">Weight is required</span>}
        <button type="submit">Calculate</button>
      </form>
      <div>BMI: {bmi || "N/A"}</div>
    </>
  );
}

export default BMI;
