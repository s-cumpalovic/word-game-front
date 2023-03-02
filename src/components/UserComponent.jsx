import React from "react";
import { useForm } from "react-hook-form";

const UserFormComponent = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Your name..." {...register("user")} required />
        <button type="submit">CREATE USER</button>
      </form>
    </div>
  );
};

export default UserFormComponent;
