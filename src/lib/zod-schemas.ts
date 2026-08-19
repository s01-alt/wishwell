

import * as z from "zod";

export const celebrationSchema = z.object({
    name: z.string({error: "Name must be a string"})
        .min(2, { error: "Name must contain at least 2 characters." })
        .max(50, { error: "Name must be less than 50 characters" })
        .regex(/^[a-zA-Z]+[\s]+$/, { error: "Name must contain only alphabets."}),
    birthday: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { error: "Invalid date format" })
        .transform((val) => new Date(val))
        .refine((date) => date > new Date(), { error: "Birthday must be after today" }),
    email: z.email({ error: "Invalid email address" })
        .optional(),
    password: z.string()
        .min(8, { error:"Site password must be at least 8 characters" })
        .max(20, )
        .optional(),
});


export const getCelebrationSchema = z.object({
    site_slug: z.string() 
        .length(10,{ error: "Site Code must be 10 characters long." }),
    password: z.string({ error: "Password must be a string."})
        .min(8, { error: "Password must be at least 8 characters long." })
        .max(20, { error: "Password must not be longer than 20 characters."})
        .optional()
})

export const wishSchema = z.object({
    author: z.string({ error: "Name must be a string" })
        .min(2, { error: "Name must contain at least 2 characters." })
        .max(50, { error: "Name must be less than 50 characters" }),
    title: z.string({error: "The title of your wish must be a string"})
        .min(2, { error: "Name must contain at least 2 characters." })
        .max(50, { error: "Name must be less than 50 characters" }),
    body: z.string({ error: "Wish must be a string."})
        .min(2, { error: "Name must contain at least 2 characters." })
        .max(50, { error: "Name must be less than 50 characters" }),
    site_slug: z.string()
        .length(10,{ error: "Site Code must be 10 characters long." }),
})

export const getWishSchema = z.object({
    wish_slug: z.string() 
        .length(10,{ error: "Site Code must be 10 characters long." })
})