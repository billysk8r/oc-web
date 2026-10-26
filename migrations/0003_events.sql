-- Migration: 0003_events.sql
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date_text TEXT,
    time_text TEXT,
    venue TEXT,
    description TEXT,
    ticket_link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
