
import { pool } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"
import { wishSchema } from "@/lib/zod-schemas"
import { nanoid } from "nanoid"

export async function POST(req: NextRequest) {
    // --- validate schema ---
    const parsed = z.safeParse(wishSchema, await req.json())

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error },
            { status: 400 }
        )
    }

    // --- fetch wish author, title, and body ---
    const { site_slug, author, title, body } = parsed.data
    const wish_slug = nanoid(10)

    const result = await pool.query(`
        INSERT INTO wishes ( site_slug, author, title, body, wish_slug )
        VALUES ( $1, $2, $3, $4, $5 )
        RETURNING id, wish_slug
        `, [ site_slug, author, title, body, wish_slug ])

    const id = result.rows[0].id
    
    // --- validate response and return ---
    if (!id){
        return NextResponse.json(
            { error: "Not found" }, 
            { status: 404 }
        )
    } else {
        return NextResponse.json({
            wishLink : `/wish/${wish_slug}`
        })
    }

    
}