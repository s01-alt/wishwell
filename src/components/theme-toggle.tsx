"use client";

import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // --- toggle between dark and light themes ---
    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // --- render theme toggle button ---
    return (
        <main>
            <div className="w-12 h-12 items-center justify-center rounded-full fixed bottom-4 right-4 z-50">
                <Toggle variant="default" onClick={handleToggle} className="rounded-full">
                    {/* --- show sun icon in dark mode, moon icon in light mode --- */}
                    {theme === "dark" ? (
                        <IconSun />
                    ) : (
                        <IconMoon />
                    )}
                </Toggle>
            </div>
        </main>
    );
}