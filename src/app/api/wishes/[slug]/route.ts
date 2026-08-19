
import { pool } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"
import { getWishSchema } from "@/lib/zod-schemas"

export async function GET(req: NextRequest) {
    // --- validate schema ---
    const parsed = z.safeParse(getWishSchema, await req.json())

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error },
            { status: 400 }
        )
    }

    // --- fetch wish slug ---
    const { wish_slug } = parsed.data

    const result = pool.query(`
        SELECT id, site_slug, author, title, body 
        FROM wishes 
        WHERE wish_slug = $1
        `, [ wish_slug ])

    const id = result.rows[0].id
    
    // --- validate response and return ---
    if (!id){
        return NextResponse.json(
            { error: "Not found" }, 
            { status: 404 }
        )
    } else {
        return NextResponse.json(result.rows, { status: 200 })
    }

    
}