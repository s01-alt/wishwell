"use client"

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

type page = {
    id: number;
    title: string;
    href: string;
}

interface NavProps {
    pages: page[];
}

export default function SiteNavigation({pages}: NavProps) {
    const pathname = usePathname();

    return (
        <>
        {/*Desktop Navigation*/}
        <nav className="hidden lg:flex lg:flex-row lg:gap-8">
            {pages.map((page) => (
                <Link 
                    key={page.id}
                    className={pathname === page.href
                        ? "w-fit h-fit p-2 bg-secondary-foreground text-primary hover:scale-105 transition-all duration-300 rounded-2xl" 
                        : "w-fit h-fit p-2 hover:text-primary hover:bg-accent-foreground hover:scale-105 transition all duration-300 rounded-2xl"
                    }
                    href={page.href}
                >
                    {page.title}
                </Link>
            ))}
        </nav>
        {/*Tablet Navigation*/}
        <nav className="hidden lg:hidden md:flex md:flex-row md:gap-4">
            {pages.map((page) => (
                <Link 
                    key={page.id}
                    className={pathname === page.href
                        ? "w-fit h-fit p-2 bg-secondary-foreground text-primary hover:scale-105 transition-all duration-300 rounded-2xl" 
                        : "w-fit h-fit p-2 hover:text-primary hover:bg-accent-foreground hover:scale-105 transition all duration-300 rounded-2xl"
                    }
                    href={page.href}
                >
                    {page.title}
                </Link>
            ))}
        </nav>
        {/*Mobile Phone Navigation*/}
        <div className="md:hidden flex flex-col bg-transparent z-10">
            <Sheet>
                <SheetHeader>
                    <SheetTrigger>
                        <IconMenu2 className="h-6 w-6" />
                    </SheetTrigger>
                </SheetHeader>
                <SheetContent>
                    <div className="w-full h-dvh flex flex-col gap-4 pt-15 p-3">
                        {pages.map((page) => (
                            <Link 
                                key={page.id}
                                className={pathname === page.href
                                    ? "w-fit h-fit p-2 bg-secondary-foreground text-primary hover:scale-105 transition-all duration-300 rounded-2xl" 
                                    : "w-fit h-fit p-2 hover:text-primary hover:bg-accent-foreground hover:scale-105 transition all duration-300 rounded-2xl"
                                }
                                href={page.href}
                            >
                                {page.title}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        </>
    )
}