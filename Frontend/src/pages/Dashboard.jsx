import axios from "axios";
import { useEffect, useState } from "react";
import { PASTE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [pastes, setPastes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastes = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(PASTE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPastes(res.data);
    };

    fetchPastes();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>My Pastes</h2>
      <button onClick={() => navigate("/create")}>New Paste</button>
      <button onClick={logout}>Logout</button>

      {pastes.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
