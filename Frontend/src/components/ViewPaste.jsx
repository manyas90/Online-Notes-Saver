import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPasteById } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const textRef = useRef(null);
  const lineRef = useRef(null);

  const { currentPaste, loading, error } = useSelector(
    (state) => state.paste
  );

  useEffect(() => {
    dispatch(fetchPasteById(id));
  }, [id, dispatch]);

  const handleScroll = () => {
    if (textRef.current && lineRef.current) {
      lineRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Loading paste...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-400">
        Error loading paste
      </p>
    );

  if (!currentPaste)
    return (
      <p className="text-center mt-10 text-gray-400">
        No paste found
      </p>
    );

  const lines = currentPaste.content.split("\n").length;

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10 bg-linear-to-br from-gray-900 to-black">
      
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">

        {/* Title */}
        <div className="p-5 border-b border-white/20">
          <input
            value={currentPaste.title}
            disabled
            className="
              w-full
              bg-transparent
              text-white
              text-xl
              font-semibold
              outline-none
              cursor-default
            "
          />
        </div>

        {/* Editor */}
        <div className="flex h-[65vh] font-mono text-sm overflow-hidden">

          {/* Line Numbers */}
          <div
            ref={lineRef}
            className="
              px-4 py-4
              text-gray-400
              text-right
              select-none
              overflow-hidden
            "
          >
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Content */}
          <textarea
            ref={textRef}
            onScroll={handleScroll}
            value={currentPaste.content}
            disabled
            className="
              w-full
              h-full
              p-4
              bg-transparent
              text-gray-200
              outline-none
              resize-none
              overflow-y-auto
              leading-6
              scrollbar-thin
              scrollbar-thumb-gray-600
              scrollbar-track-transparent
            "
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
