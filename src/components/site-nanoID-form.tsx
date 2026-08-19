"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCelebrationSchema } from "@/lib/zod-schemas"

type siteNanoIDFormInput = z.input<typeof getCelebrationSchema>
type siteNanoIDFormOutput = z.output<typeof getCelebrationSchema>

export default function SiteNanoIDForm() {
  // --- init form with validation ---
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting, isSubmitSuccessful}
    } = useForm<siteNanoIDFormInput, unknown, siteNanoIDFormOutput>({
        resolver: zodResolver(getCelebrationSchema)
    })

  // --- submit handler to access site ---
  const getSite: SubmitHandler<siteNanoIDFormOutput> = async (data) => {
    // Sends form to API endpoint
    await fetch ("api/celebrations/unlock", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    
  }
  // --- render form ---
  return (
    <>        
        <Card
            className="w-80 h-fit min-h-fit p-5 bg-background backdrop-blur-md rounded-xl gap-5" >
            <form onSubmit={handleSubmit(getSite)}>
                {/* --- site code field --- */}
                <div className="flex flex-col bg-transparent border-0 gap-1">
                    <Label htmlFor="code">Unique Site Code</Label>
                    <Input 
                        {...register("site_slug")}
                        type="text"
                        placeholder="eg. er35ui78w4"
                        required
                    />
                    {errors.site_slug && 
                        <div className="w-full h-fit text-destructive">
                            {errors.site_slug.message}
                        </div>
                    }
                </div>

                {/* --- password field --- */}
                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="password">Site Password</Label>
                    <Input 
                        {...register("password")}
                        type="text"
                        placeholder="eg. er35ui78w4"
                    />
                    {errors.password && 
                        <div className="w-full h-fit text-destructive">
                            {errors.password.message}
                        </div>
                    }
                </div>

                {/* --- submit button changes based on form state --- */}
                <Button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="mt-5 w-full"
                    href={isSubmitSuccessful? "/" : ""}>
                    {isSubmitting? "Getting Your Special Site...": "Access Site"}
                </Button>

                {/* --- display root errors if any --- */}
                {errors.root && 
                    <div className="w-full h-fit text-destructive">
                        {errors.root.message}
                    </div>
                }
            </form>

        </Card>
    </>
  );
}