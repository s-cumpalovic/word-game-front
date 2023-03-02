import React from "react";
import { useForm } from "react-hook-form";

const FormComponent = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Your word..." {...register("word")} required />
        <button type="submit">ENTER</button>
      </form>
    </div>
  );
};

export default FormComponent;
