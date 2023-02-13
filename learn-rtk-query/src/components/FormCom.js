import React, { useState } from "react";
import { useAddUserMutation } from "../features/api/apiSlice";

const FormCom = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      status: status === "active" ? true : false,
    };
    addUser(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="form-control py-3 px-3 bg-white rounded text-sm block w-full placeholder:text-xs focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Your Email"
          className="form-control py-3 px-3 bg-white rounded text-sm block w-full placeholder:text-xs focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <input
          checked={status === "active"}
          type="radio"
          id="active"
          name="status"
          value="active"
          onChange={handleChange}
        />
        <label htmlFor="active" className="text-sm text-gray-600">
          Active
        </label>
        <input
          checked={status === "deactive"}
          type="radio"
          id="deactive"
          name="status"
          value="deactive"
          onChange={handleChange}
        />
        <label htmlFor="deactive" className="text-sm text-gray-600">
          Deactive
        </label>
      </div>

      <div className="mb-4">
        <button className="bg-orange-600 w-full p-3 text-sm text-white rounded">
          {isLoading ? "Loading..." : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default FormCom;
