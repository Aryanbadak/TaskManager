import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", { password: password, email: email });
      if (response.status === 201 || response.status === 200) {
        navigate("/tasks");
      }
      console.log(response.data);

    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setResponseError(err.response?.data?.message || "Something went wrong");
      } else {
        setResponseError("Something went wrong");
      }
      alert(responseError);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-100">
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}

export default Login;