import { useEffect, useState } from "react";

const messages = [
  "Successful",
  "Failed message",
  "Warning message",
  "Loading message",
];

const Toast = ({ id }: { id: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (id < 0 || id >= messages.length) return;

    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div
      className={`fixed top-3 right-5 z-50
        flex items-center gap-4 px-4 py-2 rounded-md
        bg-amber-300 text-black shadow-lg
        transition-all duration-300 ease-out
        ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }
      `}
    >
      <p className="text-sm font-medium">{messages[id]}</p>

      <button
        onClick={() => setIsVisible(false)}
        className="text-sm font-bold hover:opacity-70"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
