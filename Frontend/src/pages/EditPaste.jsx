import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { PASTE_URL } from "../utils/api";


const EditPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const textRef = useRef(null);
  const lineRef = useRef(null);

  const token = sessionStorage.getItem("token");


  // LOAD EXISTING NOTE
  useEffect(() => {
    axios
      .get(``${PASTE_URL}/${id}``)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 🔥 UPDATE BUTTON HANDLER
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
      `${PASTE_URL}/${id}`,
        { title, content },
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       }
      );

      console.log("UPDATED:", res.data); // 🧪 DEBUG

      setLoading(false);
      navigate("/"); // redirect after success
    } catch (err) {
      setLoading(false);
      console.error("UPDATE ERROR:", err);
      alert("Update failed");
    }
  };

  const handleScroll = () => {
  if (lineRef.current && textRef.current) {
    lineRef.current.scrollTop = textRef.current.scrollTop;
  }
};


  const lines = content.split("\n").length;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,0,0,.8), rgba(0,0,0,.6)), url('/image/bnew.avif')",
      }}
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-black/40 border-b border-white/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between p-4">
          <input
            className="
            w-full sm:w-1/3
            rounded-lg px-4 py-2
            bg-white/80
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
            px-6 py-2 rounded-lg
            bg-linear-to-r from-indigo-600 to-purple-600
            text-white font-semibold
            shadow-lg
            hover:scale-105 hover:shadow-xl
            active:scale-95
            transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex justify-center mt-10 px-4 pb-10">
        <div
          className="
          w-full max-w-5xl
          rounded-2xl
          bg-black/70 backdrop-blur-xl
          border border-white/20
          shadow-2xl
        "
        >
          {/* WINDOW CONTROLS */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>

          <div className="flex h-[70vh] overflow-hidden font-mono text-sm text-white">

            {/* LINE NUMBERS */}
            <div
              ref={lineRef}
              className="
              px-4 py-4
              text-gray-400
              text-right
              select-none
              overflow-y-hidden
            "
            >
              {Array.from({ length: lines }, (_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* TEXTAREA */}
            <textarea
              ref={textRef}
              onScroll={handleScroll}
              className="
              w-full h-full
              p-4
              bg-transparent
              outline-none
              resize-none
              overflow-y-auto
              leading-6
              scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
            "
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start editing your note..."
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditPaste;
