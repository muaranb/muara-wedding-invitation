"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

export default function AppInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!auth.currentUser) {
      signInAnonymously(auth)
        .catch((err) => {
          console.error("Anonymous sign-in error:", err);
        });
    }
  }, []);

  return <>{children}</>;
}
