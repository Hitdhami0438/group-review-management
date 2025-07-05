import { cn } from "@/lib/utils";
import SignInGoogle from "./auth/google/sign-in";
import SignInGithub from "./auth/github/sign-in";
import SignInDiscord from "./auth/discord/sign-in";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            continue with
          </span>
        </div>

        <div>
          <SignInGoogle />
        </div>

        <div>
          <SignInGithub />
        </div>

        <div>
          <SignInDiscord />
        </div>
      </div>
    </form>
  );
}
