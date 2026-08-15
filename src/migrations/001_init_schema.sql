

CREATE TABLE IF NOT EXISTS celebrations (
    id char(10) SERIAL PRIMARY KEY,
    celebrant_name TEXT NOT NULL,
    celebrant_birthday DATE NOT NULL,
    celebrant_email TEXT,
    celebrant_age NUMBER,
    celebration_slug char(10) nanoid() NOT NULL
    active BOOLEAN DEFAULT FALSE NOT NULL
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishes (
    id char(10) DEFAULT nanoid() PRIMARY KEY
    celebration_id TEXT NOT NULL REFERENCES celebrations(id)
    author_name TEXT NOT NULL
    title TEXT 
    message TEXT NOT NULL
)