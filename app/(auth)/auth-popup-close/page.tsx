// app/auth-popup-close/page.jsx
"use client";
import { useEffect } from "react";

export default function AuthPopupClosePage() {
  useEffect(() => {
    console.log(
      "AuthPopupClosePage (App Router - Simplified): Attempting to close popup..."
    );
    // Adding a slight delay
    setTimeout(() => {
      window.close();
    }, 100); // 100ms delay
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Authentication Complete</h2>
      <p>This window should close automatically.</p>
      <p>(Simplified close logic active)</p>
    </div>
  );
}
