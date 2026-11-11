/// <reference types="node"/>
import path from "node:path"
import { defineConfig } from 'drizzle-kit';
import {DATA} from "./src/config/paths";

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: path.join(DATA, "./app.db"),
    },
});
