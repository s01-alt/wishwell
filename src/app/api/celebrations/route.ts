
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { celebrationSchema } from "@/lib/zod-schemas"
import bcrypt from "bcrypt"
import { pool } from "@/lib/db"
import { nanoid } from "nanoid"

export async function POST(req: NextRequest) {
    // --- validate input ---
    const parsed = z.safeParse(
        celebrationSchema, 
        await req.json()
    )

    if(!parsed.success) {
        return NextResponse.json(
            { error: parsed.error }, 
            { status: 400 }
        )
    }

    // --- prep data for insertion ---
    const { name, birthday, email, password } = parsed.data;
    const site_slug = nanoid(10);
    const form_slug = nanoid(10);
    const active = false;

    if (typeof password !== "string") {
        return NextResponse.json(
            { error: "Invalid password" },
            { status: 400 }
        );
    }
    const hashed_password = await bcrypt.hash(password, 12)


    // --- insert to database ---
    const result = await pool.query(`
        INSERT INTO celebrations 
        ( name, birthday, email, password, site_slug, form_slug, active )
        VALUES ( $1, $2, $3, $4, $5, $6, $7 )
        RETURNING id, site_slug, form_slug
        `, [ name, birthday, email, hashed_password, site_slug, form_slug, active ]
    );
    const id = result.rows[0].id
    let message = ""

    // --- check id and add special celebration message ---
    if (id % 10 === 0) {
        message = `You are our ${id}th celebration, Hooray!`
    }

    // --- validate response and return ---
    if (!id){
        return NextResponse.json(
            { error: "Not found" }, 
            { status: 404 }
        )
    } else {
        return NextResponse.json({
            site_Link: `/site/${site_slug}`,
            form_Link: `/form/${form_slug}`,
            message: message
        })
    } 
}

      