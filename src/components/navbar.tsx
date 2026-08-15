

import Link from "next/link";
import SiteNavigation from "./site-navigation";

export default function NavBar() {
    

    const pageList = [
        { id: 1, title: "Home", href: "/" },
        { id: 2, title: "It's My Birthday", href: "/birthday" },
        { id: 3, title: "Create a Site", href: "/create" },
        { id: 4, title: "Contact", href: "/contact" },
    ];

    return (
        <>
            <div className="w-full h-15 fixed flex flex-row border-b-2 justify-around items-center backdrop-blur-sm z-50">
                <>
                <Link href="/">
                    <h1 className="font-semibold">WishWell</h1>
                </Link>
                </>
                <>
                    <SiteNavigation pages={pageList} />
                </>
            </div>        
        </>
    )
}