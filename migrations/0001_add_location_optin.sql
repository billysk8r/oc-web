-- Migration: 0001_add_location_optin.sql
ALTER TABLE league_members ADD COLUMN location TEXT;
ALTER TABLE league_members ADD COLUMN opt_in INTEGER DEFAULT 0;
