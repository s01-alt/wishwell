"use client"
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card"
import { celebrationSchema } from "@/lib/zod-schemas";

type BirthdayFormInput = z.input<typeof celebrationSchema>;
type BirthdayFormOutput = z.output<typeof celebrationSchema>;

export default function CreateSiteForm() {
    // --- init form with validation ---
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
        } = useForm<BirthdayFormInput, unknown, BirthdayFormOutput>({
            resolver: zodResolver(celebrationSchema),
            mode: "onChange"
        })
    
    // --- submit handler to create celebration ---
    const createCelebration: SubmitHandler<BirthdayFormOutput> = async (data) => {
        // Sends form data to API endpoint
        await fetch("/api/celebrations", {
            method: "POST",
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
    
    // --- render form ---
    return(
        <Card 
            className="w-80 h-fit min-h-fit p-5 bg-background backdrop-blur-md rounded-xl gap-5" 
            >   
            <h1>Fields with &apos;*&apos; are compulsory</h1>     
            <form 
                onSubmit={handleSubmit(createCelebration)}
                >
                {/* --- name field --- */}
                <div className="flex flex-col bg-transparent border-0 gap-1">
                    <Label htmlFor="name">Name of Celebrant *</Label>
                    <Input 
                        {...register("name")}
                        type="text"
                        placeholder="Celebrant's Name"
                        required
                        />
                    {errors.name && 
                        <div className="w-full h-fit text-destructive">
                            {errors.name.message}
                        </div>
                        }
                </div>

                {/* --- birthday field --- */}
                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="birthday">Celebrant&apos;s Birthday *</Label>
                    <Input 
                        {...register("birthday")}
                        type="date"
                        placeholder={new Date().toISOString()}
                        required
                        />
                    {errors.birthday && 
                        <div className="w-full h-fit text-destructive">
                            {errors.birthday.message}
                        </div>
                        }
                </div>
                    
                {/* --- email field --- */}
                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="email">Celebrant&apos;s Email</Label>
                    <Input 
                        {...register("email")}
                        type="email"
                        placeholder="Celebrant's Contact Email"

                        />
                    {errors.email && 
                        <div className="w-full h-fit text-destructive">
                            {errors.email.message}
                        </div>
                        }
                </div>

                {/* --- password field --- */}
                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="password">Special Access Password</Label>
                    <Input 
                        {...register("password")}
                        type="password"
                        placeholder="Site Entry Password"
                        />
                    {errors.password && 
                        <div className="w-full h-fit text-destructive">
                            {errors.password.message}
                        </div>
                        }
                </div>

                {/* --- submit button changes based on form state --- */}
                <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
                    {isSubmitting? "Creating Your Form...": "Create Form"}
                </Button>

                {/* --- display root errors if any --- */}
                {errors.root && 
                    <div className="w-full h-fit text-destructive">
                        {errors.root.message}
                    </div>
                }
            </form>
        </Card>
    )
}