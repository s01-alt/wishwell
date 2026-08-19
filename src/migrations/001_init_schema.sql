

CREATE TABLE IF NOT EXISTS celebrations (
    id char(10) SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    email TEXT,
    password TEXT,
    site_slug TEXT DEFAULT nanoid(10) NOT NULL,
    form_slug TEXT DEFAULT nanoid(10) NOT NULL,
    active BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishes (
    id char(10) SERIAL PRIMARY KEY,
    site_slug TEXT NOT NULL REFERENCES celebrations(site_slug),
    author TEXT NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    wish_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
)