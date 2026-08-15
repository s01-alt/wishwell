import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
    return(
        <>
        <div className="w-full h-dvh flex flex-col p-5 pt-20 items-center justify-center gap-5">
            <h1 className="w-full h-fit text-center text-3xl md:text-5xl lg:text-7xl">
                Make Someone&apos;s Special Day Memorable
            </h1>
            <p className="w-full h-fit text-center text-lg md:text-xl lg:text-2xl">
                Create a personalized birthday website for your loved ones and make their special day unforgettable.
            </p>
            <div className="w-full h-fit flex flex-row flex-wrap items-center justify-center">
                <Button variant="default" className="w-fit h-fit m-5 p-5 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/create">
                        Create a Birthday Site
                    </Link>
                </Button>
                <Button variant="default" className="w-fit h-fit m-5 p-5 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/birthday">
                        It&apos;s My Birthday
                    </Link>
                </Button>
            </div>
        </div>
        </>
    )
}