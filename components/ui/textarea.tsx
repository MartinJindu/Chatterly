"use client";
import { useRef, useEffect } from "react";

export default function Textarea({
  name,
  setMessage,
  value,
}: {
  name: string;
  setMessage: (e: string) => void;
  value: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; // reset height
    const lineHeight = 24; // Tailwind's leading-6 = 1.5rem = 24px
    const maxHeight = lineHeight * 5; // 5 rows
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  };

  useEffect(() => {
    handleInput(); // adjust height on mount if it has content
  }, []);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      name={name}
      value={value}
      onChange={(e) => setMessage(e.target.value)}
      onInput={handleInput}
      style={{ scrollbarWidth: "none" }}
      className="flex-1 w-full resize-none max-h-[10rem] overflow-auto leading-6 border rounded-lg px-3 py-2"
      placeholder="Type a message"
    />
  );
}
