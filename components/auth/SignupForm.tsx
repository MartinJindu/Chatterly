// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { signup } from "@/lib/actions";
// import { Eye, EyeClosed } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// export default function SignupForm() {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <form className="space-y-3">
//       <div className="space-y-2">
//         <Label htmlFor="username">Email</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           required
//           className="border focus:border-0 border-teal-300 focus-visible:ring-2 border-b-4 focus-visible:ring-teal-500 transition duration-300"
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <div className="flex relative">
//           <Input
//             id="password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             required
//             className="border border-teal-300 focus-visible:ring-2  focus-visible:ring-teal-500 border-b-4 focus:border-0  transition duration-300"
//           />
//           <Button
//             size={"icon"}
//             type="button"
//             onClick={handleShowPassword}
//             className="bg-transparent hover:bg-transparent cursor-pointer absolute right-0"
//           >
//             {showPassword ? <Eye /> : <EyeClosed />}
//           </Button>
//         </div>
//       </div>

//       <div className="text-right">
//         <Link
//           href="/forgot-password"
//           className="text-sm text-gray-300 hover:underline"
//         >
//           Forgot password?
//         </Link>
//       </div>
//       <Button
//         formAction={signup}
//         type="submit"
//         className="w-full bg-teal-400 text-gray-800 hover:bg-teal-500 cursor-pointer"
//       >
//         Sign up
//       </Button>

//       <p className="text-sm text-center text-gray-300">
//         Already have an account?{" "}
//         <Link href="/login" className="underline hover:text-gray-400">
//           Log in
//         </Link>
//       </p>
//     </form>
//   );
// }
