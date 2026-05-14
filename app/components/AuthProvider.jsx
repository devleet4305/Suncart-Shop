"use client";

// This is a thin wrapper so we can use useSession from better-auth/react
// in client components throughout the app.
// No extra context needed — useSession() works directly from auth-client.

export default function AuthProvider({ children }) {
  return <>{children}</>;
}
