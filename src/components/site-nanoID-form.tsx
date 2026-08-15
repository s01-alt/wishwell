"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const getSiteFormSchema = z.object({
  code: z
    .string() 
    .length(10,{ error: "Site Code must be 10 characters long." }),
  password: z
    .string({ error: "Password must be a string."})
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(20, { error: "Password must not be longer than 20 characters."})
})

type siteNanoIDFormInput = z.input<typeof getSiteFormSchema>
type siteNanoIDFormOutput = z.output<typeof getSiteFormSchema>

export default function SiteNanoIDForm() {

  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting}
    } = useForm<siteNanoIDFormInput, unknown, siteNanoIDFormOutput>({
        resolver: zodResolver(getSiteFormSchema)
    })

  const getSite: SubmitHandler<siteNanoIDFormOutput> = async (data) => {
    console.log(data)
  }
  return (
    <>        
        <Card
            className="w-80 h-fit min-h-fit p-5 bg-background backdrop-blur-md rounded-xl gap-5" >
            <form onSubmit={handleSubmit(getSite)}>
                <div className="flex flex-col bg-transparent border-0 gap-1">
                    <Label htmlFor="code">Unique Site Code</Label>
                    <Input 
                        {...register("code")}
                        type="text"
                        placeholder="eg. er35ui78w4"
                        required
                    />
                    {errors.code && 
                        <div className="w-full h-fit text-destructive">
                            {errors.code.message}
                        </div>
                    }
                </div>

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
                {/*Submit Button that changes based on state*/}
                <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
                    {isSubmitting? "Getting Your Special Site...": "Access Site"}
                </Button>
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