
import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    dob: "",
    address: "",
    profession: "",
    hobbies: "",
  });

  // ✅ Prefill values when editing
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      age: "",
      dob: "",
      address: "",
      profession: "",
      hobbies: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 shadow-lg rounded-lg space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">
        {initialData ? "Edit User" : "Add New User"}
      </h2>

      {/* Username */}
      <input
        name="username"
        placeholder="Username"
        className="w-full p-2 border rounded bg-white "
        value={form.username}
        onChange={handleChange}
        required
      />

      {/* First + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded bg-white"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded bg-white"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded bg-white"
        value={form.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded bg-white"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Phone, Age */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="phone"
          type="number"
          placeholder="Phone Number"
          className="w-full p-2 border rounded bg-white"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          className="w-full p-2 border rounded bg-white"
          value={form.age}
          onChange={handleChange}
          required
        />
      </div>

      {/* DOB */}
      <input
        name="dob"
        type="date"
        className="w-full p-2 border rounded bg-white text-shadow-gray-600"
        value={form.dob}
        onChange={handleChange}
        required
      />

      {/* Address dropdown */}
      <select
        name="address"
        className="w-full p-2 border rounded bg-white text-shadow-gray-600"
        value={form.address}
        onChange={handleChange}
        required
      >
        <option value="">Select Address</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Lahore">Lahore</option>
        <option value="Karachi">Karachi</option>
      </select>

      {/* Profession - Dropdown */}
      <div>
  <p className="font-medium">Profession:</p>
  <select
    name="profession"
    className="w-full p-2 border rounded mt-2"
    value={form.profession}
    onChange={handleChange}
    required
  >
    <option value="">Select Profession</option>
    <option value="Student">Student</option>
    <option value="Teacher">Teacher</option>
    <option value="Developer">Developer</option>
    <option value="Designer">Designer</option>
    <option value="Engineer">Engineer</option>
  </select>
</div>

      {/* Hobbies - Radio */}
      <div>
        <p className="font-medium">Hobbies:</p>
        <div className="flex gap-4 mt-2">
          {["Cricket", "Reading", "Gaming"].map((h) => (
            <label key={h}>
              <input
                type="radio"
                name="hobbies"
                value={h}
                checked={form.hobbies === h}
                onChange={handleChange}
                required
              />{" "}
              {h}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Update User" : "Submit"}
      </button>
    </form>
  );
}
