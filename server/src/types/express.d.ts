import { User as DrizzleUser } from "../db/schema.js";

declare global {
    namespace Express {
        interface User extends DrizzleUser {}
    }
}

export {};