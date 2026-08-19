<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Section-header comments

Use inline section comments to mark distinct logical steps within a handler
(validation, data prep, side effects, response). Keep each header short —
a few words, not a sentence.

**Style:** `// --- label ---`, placed on its own line directly above the
section it describes.

\```ts
export async function POST(req: NextRequest) {
  // --- validate input ---
  const parsed = celebrationSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // --- prep data for insertion ---
  const { name, email, birthDate } = parsed.data;
  const siteSlug = nanoid(10);

  // --- insert + respond ---
  ...
}
\```

Do not use `{/* ... */}` outside of JSX children — in `.ts` files it isn't
a comment, and even in `.tsx` files it only behaves as one inside an actual
JSX return, not inside plain function-body logic. Use `//` everywhere
outside JSX markup.