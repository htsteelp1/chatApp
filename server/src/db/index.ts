import {drizzle} from "drizzle-orm/better-sqlite3";
import {migrate} from "drizzle-orm/better-sqlite3/migrator"
import path from "node:path"
import Database from "better-sqlite3";
import {DATA, MIGRATIONS} from "../config/paths.js";

const sqlite = new Database(path.join(DATA, "./app.db"));
sqlite.pragma("journal_mode = WAL")
export const db = drizzle({client: sqlite});
await migrate(db, {migrationsFolder: MIGRATIONS});