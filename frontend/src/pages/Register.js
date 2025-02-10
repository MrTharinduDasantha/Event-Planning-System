import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded outline-none focus:border-blue-500"
          required
        />
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 pr-10 border rounded outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>

        <div className="mb-4">
          <p className="font-bold">Do you want to be an admin?</p>
          <div className="flex items-center justify-end gap-4 mt-3">
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 border rounded ${
                formData.role === "admin" ? "bg-blue-100" : ""
              }`}
              onClick={() => handleRoleSelect("admin")}
            >
              {formData.role === "admin" ? <RiAdminFill /> : <RiAdminLine />}
              <span>Yes</span>
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 border rounded ${
                formData.role === "user" ? "bg-blue-100" : ""
              }`}
              onClick={() => handleRoleSelect("user")}
            >
              {formData.role === "user" ? <RiAdminFill /> : <RiAdminLine />}
              <span>No</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Register
        </button>
        <p className="italic text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-300 ease-in-out"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
