import CreateSiteForm from "@/components/create-site-form";


export default function CreateSitePage() {
    return (
        <>
            <main className="w-full h-screen min-h-screen flex flex-col flex-1 items-center justify-center bg-radial from-5% from-secondary to-90% to-primary dark:from-secondary-foreground dark:to-accent-foreground">
                <div className="w-full h-fit flex flex-col flex-1 items-center justify-center gap-10">
                    <h1 className="w-full h-fit text-center text-3xl md:text-5xl lg:text-7xl">
                        Let&apos;s Celebrate A Friend
                    </h1>
                    <CreateSiteForm />
                </div>
            </main>
        </>
                
    )
}