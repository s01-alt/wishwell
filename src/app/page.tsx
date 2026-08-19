import ProcessSection from "@/components/home/process-section";
import Hero from "@/components/home/hero";


export default function Home() {
  return (
    <>
      <main className="w-full h-screen min-h-screen flex flex-col flex-1 items-center justify-center bg-radial from-5% from-secondary to-90% to-primary dark:from-secondary-foreground dark:to-accent-foreground">
        < Hero />
        <ProcessSection />
      </main>
    </>
  );
}
