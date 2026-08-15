"use client"
import SiteNanoIDForm from "@/components/site-nanoID-form";


export default function Birthday() {
  return (
    <>
      <main className="w-full h-screen min-h-screen flex flex-col flex-1 items-center justify-center bg-radial from-5% from-secondary to-90% to-primary pt-20">
        <div className="w-full h-fit flex flex-col flex-1 items-center justify-center gap-10">
          <h1 className="w-full h-fit text-center text-3xl md:text-5xl lg:text-7xl">
            It&apos;s Your Day To Celebrate!
          </h1>
          <SiteNanoIDForm />
        </div>
      </main>
    </>
  )
}