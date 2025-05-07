#!/bin/bash

# Database name
DB_NAME="secret_clubhouse"

# Optional: Drop and recreate the database (be careful with real data!)
dropdb --if-exists "$DB_NAME"
createdb "$DB_NAME"

# Create tables
psql "$DB_NAME" <<EOF
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  clubmember BOOLEAN DEFAULT false,
  admin BOOLEAN DEFAULT false
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
EOF

# Insert sample data (Plain text passwords = "pw1", "pw2", "pw3")
psql "$DB_NAME" <<EOF
INSERT INTO users (firstname, lastname, username, password, clubmember, admin)
VALUES
  ('Alice', 'Wonderland', 'alice', '$2b$10$M3Gb/mUzGOf/qly6O2tPYu7vdhON9iG0hYLBMNw..wP0WrH5i/teG', true, true),
  ('Bob', 'Builder', 'bob', '$2b$10$M4TmJFRq0V5RLSENNZEq4u5pifNx1wwy.9iSG7TgJXhyPLbWR3aQ.', true, false),
  ('Charlie', 'Brown', 'charlie', '$2b$10$.J0bFu.ra/P0GcgGqt7KjeEtV2Tv6RAL30aLLqC6KauqL47xnE8l2', false, false);

INSERT INTO messages (author_id, title, body)
VALUES
  (1, 'Welcome to the Club', 'This is a secret message for members only.'),
  (2, 'Bob''s First Post', 'I love building things!');
EOF

echo "✔️ Database '$DB_NAME' was successfully created and seeded."
