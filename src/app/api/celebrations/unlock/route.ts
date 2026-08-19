import { pool } from "@/lib/db";
import { getCelebrationSchema } from "@/lib/zod-schemas";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    // --- validate schema ---
    const parsed = getCelebrationSchema.safeParse(await req.json());

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error },
            { status: 400 }
        );
    }

    // --- fetch site data and password ---
    const { site_slug, password } = parsed.data;

    if (typeof password !== "string") {
        return NextResponse.json(
            { error: "Invalid password" },
            { status: 400 }
        );
    }

    const result = await pool.query<{ password: string; id: number }>(`
        SELECT password, id
        FROM celebrations
        WHERE site_slug = $1
    `, [site_slug]);

    const celebration = result.rows[0];

    if (!celebration) {
        return NextResponse.json(
            { error: "Site not found" },
            { status: 404 }
        );
    }

    const dbPassword = celebration.password;

    // --- handle invalid password ---
    const correctPassword = await bcrypt.compare(password, dbPassword);

    if (!correctPassword) {
        return NextResponse.json(
            { error: "Wrong Password" },
            { status: 401 }
        );
    }

    // --- verify password and fetch wishes ---
    const celebrationData = await pool.query(`
        SELECT author_name, title, body
        FROM wishes
        WHERE celebration_id = $1
        ORDER BY created_at
    `, [celebration.id]);

    return NextResponse.json(celebrationData.rows, { status: 200 });
}
