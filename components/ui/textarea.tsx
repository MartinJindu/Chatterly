"use client";
import { useRef, useEffect } from "react";

export default function Textarea() {
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
      onInput={handleInput}
      style={{ scrollbarWidth: "none" }}
      className="w-full resize-none overflow-auto leading-6 border rounded-lg px-3 py-2"
      placeholder="Type a message"
    />
  );
}
