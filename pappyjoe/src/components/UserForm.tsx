import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { v4 as uuidv4 } from "uuid";

const states = ["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi"];

export default function UserForm() {
  const { addUser, updateUser, editUser, setEditUser } = useUserContext();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (editUser) {
      setForm({ ...editUser, age: String(editUser.age) });
    }
  }, [editUser]);

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(form.name))
      newErrors.name = "Name must contain only letters and spaces";
    if (!form.age) newErrors.age = "Age is required";
    else if (isNaN(Number(form.age))) newErrors.age = "Age must be a number";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const user = {
      ...form,
      age: Number(form.age),
      id: editUser ? editUser.id : uuidv4(),
    };
    editUser ? updateUser(user) : addUser(user);
    setForm({ name: "", age: "", gender: "", state: "" });
    setEditUser(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-6">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="number"
        placeholder="Age"
        className="border p-2 w-full"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

      <div>
        <label className="mr-2">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={form.gender === "Male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />{" "}
          Male
        </label>
        <label className="mr-2">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={form.gender === "Female"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />{" "}
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={form.gender === "Other"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />{" "}
          Other
        </label>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      <select
        type="text"
        placeholder="Search State"
        list="state-options"
        className="border p-2 w-full"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      >
        {states.map((s) => (
          <option key={s} value={s}>
            {s}     
          </option>
        ))}
      </select>
      {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
