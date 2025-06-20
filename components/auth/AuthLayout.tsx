// components/auth/AuthLayout.tsx
import Image from "next/image";
import { ReactNode } from "react";
import Logo from "../sidebar-components/Logo";

interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
}

export default function AuthLayout({ children, heading }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left section */}
      <div className="hidden md:flex flex-col items-center justify-center bg-teal-300/70 p-10 space-y-6">
        <Image
          src="/Chat-pana.png"
          alt="Auth illustration"
          width={400}
          height={400}
          className="rounded-xl object-cover"
        />
        <Logo textClassName="text-white font-bold" />
        <p className="text-white font-semibold text-center px-4">
          Connect. Communicate. Collaborate.
        </p>
      </div>

      {/* Right (Form) */}
      <div className="flex flex-col items-center justify-center p-5">
        <Image
          src="/Chat-pana.png"
          alt="Auth illustration"
          width={300}
          height={300}
          className=" md:hidden rounded-xl object-cover"
        />
        <Logo
          className="border-0 md:hidden"
          textClassName="-ml-2 text-teal-300"
        />
        <div className="w-full text-center max-w-md space-y-4">
          <h2 className="text-sm font-bold md:hidden">{heading}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
