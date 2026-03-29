import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { PASTE_URL } from "../utils/api";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const token = sessionStorage.getItem("token");

  const createPaste = async () => {
  // 🔴 VALIDATION FIRST
  if (!title.trim() && !value.trim()) {
    toast.error("Title or content is required");
    return;
  }

  if (!value.trim()) {
    toast.error("Content cannot be empty");
    return;
  }

  try {
    await axios.post(
      PASTE_URL,
      {
        title: title.trim() || "Untitled",
        content: value.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Paste saved ✨");
    setTitle("");
    setValue("");
  } catch (err) {
    toast.error("Paste not saved");
  }
};


  const lines = value.split("\n").length;

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,0,0,.6), rgba(0,0,0,.2)), url('/image/bnew.avif')",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-center gap-4 pt-8">
        <input
          className="
            w-[20%]
            rounded-xl
            px-4 py-3
            bg-white/80
            backdrop-blur
            shadow-md
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            transition
          "
          placeholder="Paste title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="
            rounded-xl
            bg-linear-to-r from-blue-600 to-purple-600
            px-6 py-3
            text-white
            font-medium
            shadow-lg
            hover:scale-105
            hover:shadow-xl
            active:scale-95
            transition
          "
        >
          Save Note
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex justify-center mt-8">
        <div
          className="
            w-[60%]
            rounded-2xl
            bg-white/20
            backdrop-blur-xl
            shadow-2xl
            border border-white/30
          "
        >
          {/* TOP BAR */}
          <div className="flex justify-between items-center px-5 py-3 border-b border-white/20">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied 📋");
              }}
              className="text-white hover:text-blue-300 transition"
            >
              <MdOutlineContentCopy size={20} />
            </button>
          </div>

          {/* EDITOR BODY */}
          <div className="flex h-[65vh] overflow-hidden font-mono text-sm">
            {/* LINE NUMBERS */}
            <div className="px-4 py-4 text-right text-white/70 select-none overflow-y-auto">
              {Array.from({ length: lines }, (_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* TEXTAREA */}
            <textarea
              className="
                w-full h-full
                px-4 py-4
                bg-transparent
                text-white
                outline-none
                resize-none
                overflow-y-auto
                leading-6
                placeholder:text-white/50
              "
              value={value}
              placeholder="Start typing your notes here..."
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
