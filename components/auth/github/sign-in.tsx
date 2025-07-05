"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SignInGithub() {
  // useSession hook to access session data and status, and the update function
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Get the current path

  // Determine button text based on the current path
  let buttonText = "Continue with GitHub"; // Default text
  if (pathname === "/sign-in") {
    buttonText = "Continue with GitHub";
  } else if (pathname === "/sign-up") {
    buttonText = "Continue with GitHub";
  }

  const handleGitHubSignIn = async () => {
    // Determine the base URL for constructing the callback for the popup
    // Ensure NEXT_PUBLIC_URL is set in your .env.local (e.g., NEXT_PUBLIC_URL=http://localhost:3000)
    const appBaseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
    const popupCloseUrl = `${appBaseUrl}/auth-popup-close`; // This page will just close the popup

    try {
      // 1. Call signIn with redirect: false.
      // This tells NextAuth to return the sign-in URL instead of redirecting.
      // The callbackUrl provided here is where NextAuth will redirect the *popup*
      // *after* it has processed the OAuth callback from Google and set the session.
      const signInData = await signIn("github", {
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
      onClick={handleGitHubSignIn}
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
        viewBox="0 0 24 24"
      >
        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
      </svg>
      {buttonText}
    </Button>
  );
}
