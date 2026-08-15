"use client"
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card"



const birthdayFormSchema = z.object({
    name: z
        .string({error: "Name must be a string"})
        .min(2, { error: "Name must contain at least 2 characters." })
        .max(50, { error: "Name must be less than 50 characters" })
        .regex(/^[a-zA-Z]+$/, { error: "Name must contain only alphabets."}),
    birthday: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { error: "Invalid date format" })
        .transform((val) => new Date(val))
        .refine((date) => date > new Date(), { error: "Birthday must be after today" }),
    age: z
        .coerce.number()
        .refine((num) => num > 0, { error: "Age must be positive"})
        .refine((num) => num <= 999, { error: "Celebrant's age must not be more than 3 digits" }),
    email: z
        .email({ error: "Invalid email address" })
        .optional(),
    password: z.string()
        .min(8, { error:"Site password must be at least 8 characters" })
        .max(20, )
        .optional(),
});

type BirthdayFormInput = z.input<typeof birthdayFormSchema>;
type BirthdayFormOutput = z.output<typeof birthdayFormSchema>;

export default function CreateSiteForm() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
        } = useForm<BirthdayFormInput, unknown, BirthdayFormOutput>({
            resolver: zodResolver(birthdayFormSchema),
            mode: "onChange"
        })
    
    const createCelebration: SubmitHandler<BirthdayFormOutput> = async (data) => {
        await fetch("/api/celebrations/route", {
            method: "POST",
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
    
    return(
        <Card 
            className="w-80 h-fit min-h-fit p-5 bg-background backdrop-blur-md rounded-xl gap-5" 
            >        
            <form 
                onSubmit={handleSubmit(createCelebration)}
                >
                <div className="flex flex-col bg-transparent border-0 gap-1">
                    <Label htmlFor="name">Name of Celebrant</Label>
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

                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="birthday">Celebrant&apos;s Birthday</Label>
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

                <div className="flex flex-col bg-transparent border-0 mt-5 gap-1">
                    <Label htmlFor="age">How old is the celebrant becoming?</Label>
                    <Input 
                        {...register("age")}
                        type="number"
                        min={0}
                        placeholder="16"
                        required
                        />
                    {errors.age && 
                        <div className="w-full h-fit text-destructive">
                            {errors.age.message}
                        </div>
                        }
                </div>
                    
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
                {/*Submit Button that changes based on state*/}
                <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
                    {isSubmitting? "Creating Your Form...": "Create Form"}
                </Button>
                {errors.root && 
                    <div className="w-full h-fit text-destructive">
                        {errors.root.message}
                    </div>
                }
            </form>
        </Card>
    )
}