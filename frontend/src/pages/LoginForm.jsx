import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const loginUser = useUserStore((state) => state.loginUser);
  const error = useUserStore((state) => state.error);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser(formData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
