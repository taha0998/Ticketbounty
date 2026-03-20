import Link from "next/link";
import CardCompact from "@/components/CardCompact";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { passwordForgotPath, signUpPath } from "@/lib/paths";

const signInPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105 animate-fade-in-top"
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forget Password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default signInPage;
