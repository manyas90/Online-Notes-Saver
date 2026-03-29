import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AUTH_URL } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data); // 👈 shows backend error
      throw new Error(data.message || "Login failed");
    }

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.userId);

    toast.success("Login Successful ✨");
    navigate("/");
  } catch (err) {
    console.log(err.message);
    toast.error(err.message);
  }
};

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,0,0,.75), rgba(0,0,0,.4)), url('/image/bnew.avif')",
      }}
    >
      <div
        className="
          w-full max-w-sm
          rounded-2xl
          bg-white/15 backdrop-blur-xl
          shadow-2xl
          border border-white/20
          p-8
          transition-all
          hover:scale-[1.02]
        "
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="
            w-full mb-4
            rounded-lg px-4 py-3
            bg-white/80
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full mb-6
            rounded-lg px-4 py-3
            bg-white/80
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="
            w-full py-3 rounded-lg
            bg-linear-to-r from-indigo-600 to-purple-600
            text-white font-semibold
            shadow-lg
            hover:shadow-xl hover:scale-105
            active:scale-95
            transition
          "
        >
          Login
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-white/80 mt-6">
          New user?{" "}
          <Link
            to="/register"
            className="text-indigo-300 hover:text-indigo-200 font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
