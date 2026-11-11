import {drizzle} from "drizzle-orm/better-sqlite3";
import path from "node:path"
import Database from "better-sqlite3";

const sqlite = new Database(path.join(import.meta.dirname, "../../../data/app.db"));
sqlite.pragma("journal_mode = WAL")
export const db = drizzle({client: sqlite});