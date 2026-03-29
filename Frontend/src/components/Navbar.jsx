import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `
      relative px-4 py-2 text-sm font-medium tracking-wide
      transition-all duration-300
      ${
        isActive
          ? "text-indigo-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-indigo-400"
          : "text-white/80 hover:text-indigo-300"
      }
      after:transition-all after:duration-300
    `;

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full h-16
        flex items-center justify-center gap-16
        bg-linear-to-r from-black/60 via-black/40 to-black/60
        backdrop-blur-xl
        shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)]
      "
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('/image/navji.jpeg')",
      }}
    >
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/pastes" className={linkClass}>
        Pastes
      </NavLink>

      <NavLink to="/login" className={linkClass}>
        Log Out
      </NavLink>
    </nav>
  );
};

export default Navbar;
