"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SignInDiscord() {
  // useSession hook to access session data and status, and the update function
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Get the current path

  // Determine button text based on the current path
  let buttonText = "Continue with Discord"; // Default text
  if (pathname === "/sign-in") {
    buttonText = "Continue with Discord";
  } else if (pathname === "/sign-up") {
    buttonText = "Continue with Discord";
  }

  const handleDiscordSignIn = async () => {
    // Determine the base URL for constructing the callback for the popup
    // Ensure NEXT_PUBLIC_URL is set in your .env.local (e.g., NEXT_PUBLIC_URL=http://localhost:3000)
    const appBaseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
    const popupCloseUrl = `${appBaseUrl}/auth-popup-close`; // This page will just close the popup

    try {
      // 1. Call signIn with redirect: false.
      // This tells NextAuth to return the sign-in URL instead of redirecting.
      // The callbackUrl provided here is where NextAuth will redirect the *popup*
      // *after* it has processed the OAuth callback from Google and set the session.
      const signInData = await signIn("discord", {
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
      onClick={handleDiscordSignIn}
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
          fill="#8c9eff"
          d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
        ></path>
      </svg>
      {buttonText}
    </Button>
  );
}
