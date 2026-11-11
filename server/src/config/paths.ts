import path from "node:path";

export const SRC = path.join(import.meta.dirname, "../.")
export const ROOT = path.join(import.meta.dirname, "../../../.")
export const PROJECT_ROOT = path.join(ROOT, "./server")
export const DATA = path.join(ROOT, "./data")
export const MIGRATIONS = path.join(PROJECT_ROOT, "./drizzle")