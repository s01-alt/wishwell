"use client";

import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <main>
            <div className="w-10 h-10 border items-center justify-center rounded-full fixed bottom-4 right-4 z-50">
                <Toggle variant="default" onClick={handleToggle}>
                    {/* Changing the icon based on mode */}
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