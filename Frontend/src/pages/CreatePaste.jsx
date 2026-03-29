import axios from "axios";
import { PASTE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreatePaste() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post(
      PASTE_URL,
      {
        title: e.target.title.value,
        content: e.target.content.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Paste created");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Paste</h2>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button>Create</button>
    </form>
  );
}
