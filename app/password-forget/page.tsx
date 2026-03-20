import CardCompact from "@/components/CardCompact";
import { PasswordForgetForm } from "@/features/password/components/PasswordForgetForm";

const PasswordForgetPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105 animate-fade-in-top"
        title="Forget Password"
        description="Enter your email address to reset your password"
        content={<PasswordForgetForm />}
      />
    </div>
  );
};
export default PasswordForgetPage;
