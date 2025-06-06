"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { store } from "@/lib/store";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const { loginWithGoogle } = store();
  const searchParams = useSearchParams();

  const next = searchParams.get("next") || "/";

  return (
    <form className="space-y-3">
      <Button
        className="w-full flex justify-center items-center gap-2.5 bg-white border border-teal-25 rounded-4xl py-6 text-base text-black font-semibold cursor-pointer -tracking-[0.8px] hover:bg-teal-400"
        onClick={() => loginWithGoogle(next)}
      >
        <Image src={"/google.svg"} alt="google" width={32} height={32} />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
}
