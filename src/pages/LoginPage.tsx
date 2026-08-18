import { LoginForm } from "../components/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 mt-10 bg-slate-50/50 dark:bg-slate-950">
      <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-200">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
