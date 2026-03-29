import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFileDownload } from "react-icons/md";
import { SlEye } from "react-icons/sl";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PASTE_URL } from "../utils/api";

const Paste = () => {
  const [pastes, setPastes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchPastes = async () => {
    try {
      const res = await axios.get(PASTE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastes(res.data);
    } catch {
      toast.error("Failed to load pastes");
    }
  };

  useEffect(() => {
    fetchPastes();
  }, []);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setPastes((prev) => prev.filter((p) => p._id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDownload = async (id) => {
  const pdfUrl = `http://localhost:5000/api/paste/${id}/pdf`;

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "note.pdf";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed", error);
  }
};


  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center backdrop-blur bg-black/40"
      style={{ backgroundImage: "url('/image/bnew.avif')" }}
    >
      {/* SEARCH */}
      <div className="sticky top-0 z-10">
        <div className="flex justify-center p-6">
          <input
            className="
              w-full max-w-md
              rounded-xl px-4 py-3
              bg-white/90 shadow
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
            "
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* LIST */}
      <div className="flex justify-center h-[calc(100vh-100px)] overflow-y-auto px-4 pb-10">
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {filteredData.length ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="
                  group
                  bg-white/80 backdrop-blur
                  rounded-2xl p-5
                  shadow-md hover:shadow-xl
                  transition-all
                  hover:scale-[1.01]
                "
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* LEFT */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {paste.title}
                    </h2>
                    <p className="mt-2 text-gray-700 line-clamp-2">
                      {paste.content}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex gap-2 text-xl text-gray-700">
                      <button
                        onClick={() => navigate(`/edit/${paste._id}`)}
                        className="icon-btn"
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        onClick={() => navigate(`/paste/${paste._id}`)}
                        className="icon-btn"
                      >
                        <SlEye />
                      </button>

                      <button className="icon-btn"
                       onClick={() => handleDownload(paste._id)}>
                        <MdFileDownload />
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paste.content);
                          toast.success("Copied");
                        }}
                        className="icon-btn"
                      >
                        <MdOutlineContentCopy />
                      </button>

                      <button
                        onClick={() => deleteNote(paste._id)}
                        className="icon-btn text-red-600"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>

                    <span className="text-xs text-gray-500">
                      {new Date(paste.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 mt-20">
              No pastes found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
