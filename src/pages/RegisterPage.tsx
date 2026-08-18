import { SignupForm } from "@/components/signup-form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 mt-10 bg-slate-50/50 dark:bg-slate-950">
      <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-200">
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterPage;
