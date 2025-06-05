import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout heading="Log in to your account">
      <LoginForm />
    </AuthLayout>
  );
}
