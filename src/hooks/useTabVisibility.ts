// hooks/useTabVisibility.ts
"use client";

import { useEffect } from "react";

export function useTabVisibility(
    onHide?: () => void,
    onShow?: () => void
) {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                onHide?.();
            } else {
                onShow?.();
            }
        };

        const handleFocus = () => onShow?.();
        const handleBlur = () => onHide?.();

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("focus", handleFocus);
        document.addEventListener("blur", handleBlur);
        
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("focus", handleFocus);
            document.removeEventListener("blur", handleBlur);
        };
    }, [onHide, onShow]);
}
