import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AUTH_URL } from "../utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (!res.ok) throw new Error();

      toast.success("Registered Successfully 🎉");
      navigate("/login");
    } catch {
      toast.error("Registration Failed");
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
          Create Account
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

        {/* NAME */}
        <input
          type="text"
          placeholder="Full name"
          className="
            w-full mb-4
            rounded-lg px-4 py-3
            bg-white/80
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          onChange={(e) => setName(e.target.value)}
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
          onClick={handleRegister}
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
          Register
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-300 hover:text-indigo-200 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
