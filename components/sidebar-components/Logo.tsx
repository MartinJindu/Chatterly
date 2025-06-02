import Image from "next/image";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      aria-label="logo"
      className={cn(
        "flex items-center justify-center w-full border-b border-b-teal-100",
        className
      )}
    >
      <Image
        src={logo}
        alt="logo"
        height={50}
        width={50}
        className="w-16 h-16"
      />
      <h1 className="text-2xl font-semibold text-teal-500">Chatterly</h1>
    </div>
  );
}
