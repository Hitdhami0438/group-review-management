"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SignInGoogle() {
  // useSession hook to access session data and status, and the update function
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Get the current path

  // Determine button text based on the current path
  let buttonText = "Continue with Google"; // Default text
  if (pathname === "/sign-in") {
    buttonText = "Continue with Google";
  } else if (pathname === "/sign-up") {
    buttonText = "Continue with Google";
  }

  const handleGoogleSignIn = async () => {
    // Determine the base URL for constructing the callback for the popup
    // Ensure NEXT_PUBLIC_URL is set in your .env.local (e.g., NEXT_PUBLIC_URL=http://localhost:3000)
    const appBaseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
    const popupCloseUrl = `${appBaseUrl}/auth-popup-close`; // This page will just close the popup

    try {
      // 1. Call signIn with redirect: false.
      // This tells NextAuth to return the sign-in URL instead of redirecting.
      // The callbackUrl provided here is where NextAuth will redirect the *popup*
      // *after* it has processed the OAuth callback from Google and set the session.
      const signInData = await signIn("google", {
        redirect: false, // Crucial: prevents main window redirect
        callbackUrl: popupCloseUrl, // Popup will be redirected here after auth to close itself
      });

      if (signInData && signInData.url) {
        // 2. Open the Google Sign-In URL (signInData.url) in a new popup window.
        const popupWidth = 500;
        const popupHeight = 600;
        const left = window.screenX + (window.outerWidth - popupWidth) / 2;
        const top = window.screenY + (window.outerHeight - popupHeight) / 2;

        const popup = window.open(
          signInData.url,
          "googleSignIn",
          `width=${popupWidth},height=${popupHeight},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes`
        );

        if (!popup || popup.closed || typeof popup.closed === "undefined") {
          // Handle cases where the popup might be blocked by the browser
          // NOTE: Changed alert to console.error for better UX in non-interactive environments.
          // Consider using a toast notification library for user-facing messages.
          console.error(
            "Popup blocked! Please allow popups for this site to sign in with Google. You may need to try signing in again after allowing popups."
          );
          // As a fallback, you could attempt a same-window sign-in here if desired:
          // await signIn("google");
          return;
        }

        // 3. Poll for the popup to be closed.
        // When closed, it means the auth flow is complete (or aborted by user).
        const timer = setInterval(() => {
          if (popup.closed) {
            clearInterval(timer);
            // 4. Manually trigger a session update in the main window.
            // The useSession hook will then reflect any changes to the session state (e.g., user is now authenticated).
            // The useEffect below will handle the redirect after session update.
            console.log(
              "Google Sign-In popup closed, requesting session update."
            );
            updateSession();
          }
        }, 500); // Check every 500ms
      } else {
        // This case should ideally not be reached if NextAuth is configured correctly.
        console.error(
          "Failed to get Google Sign-In URL from NextAuth:",
          signInData
        );
        // Consider using a toast notification library for user-facing messages.
      }
    } catch (error) {
      console.error("Error during Google Sign-In initiation:", error);
      // Consider using a toast notification library for user-facing messages.
    }
  };

  // useEffect to handle redirection based on authentication status
  useEffect(() => {
    // Only redirect if the status is 'authenticated' and not already loading
    if (status === "authenticated") {
      console.log("User is authenticated in main window. Session:", session);
      // Check if current path is not already /dashboard to prevent redirect loops
      // For App router, window.location.pathname can be used.
      // For Pages router, router.pathname would be more idiomatic.
      // Since this is a sign-in component, it's usually on a sign-in page,
      // so redirecting to dashboard is generally safe.
      if (window.location.pathname !== "/dashboard") {
        console.log("Redirecting to /dashboard...");
        router.push("/dashboard");
      }
    } else if (status === "unauthenticated") {
      console.log("User is not authenticated in main window.");
    }
    // 'loading' status is also possible, no action needed then
  }, [session, status, router]); // Add router to dependency array

  // If the user is already authenticated and this component renders (e.g., on a login page),
  // the useEffect above will handle the redirect.
  // If the user is loading, we can show a loading state or nothing.
  // if (status === "loading") {
  //   return <p>Loading session...</p>; // Or your custom loading component
  // }

  return (
    <Button
      onClick={handleGoogleSignIn}
      // onClick={() => signIn("google")}
      variant="outline"
      className="w-full ButtonRingHover"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 48 48"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        ></path>
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        ></path>
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
      </svg>
      {buttonText}
    </Button>
  );
}
