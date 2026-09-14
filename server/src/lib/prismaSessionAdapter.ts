/**
 * THIS IS A TEMP FILE TIL PRISMA SESSION STORE GETS UPDATED
 * prisma8-session-adapter.ts
 *
 * `prisma-session-store` (https://github.com/kleydon/prisma-session-store) was
 * written against the classic Prisma Client shape: `prisma.session.findMany()`,
 * `.create()`, `.update()`, `.delete()`, `.deleteMany()`, `.findUnique()`, plus
 * `$connect()` / `$disconnect()` on the client itself.
 *
 * Prisma 8 replaces that with a contract-based client: models live under
 * `db.orm.<schema>.<Model>` (e.g. `db.orm.public.Session`) and use a chained
 * `.where(filter).method()` API instead.
 *
 * This adapter wraps a Prisma 8 model namespace so it looks like the old flat
 * delegate `prisma-session-store` expects. Pass the *adapter*, not the raw
 * Prisma 8 client, into `new PrismaSessionStore(...)`.
 *
 * NOTES / CAVEATS:
 * - Prisma 8 is currently a release candidate; method names/behaviour
 *   (especially `deleteAll()` with an empty `{}` filter) may still change.
 *   Test the "delete everything" path (used by `store.clear()`) before
 *   relying on it in production.
 * - The `enableNativeMysqlSetUpsert` option (which calls
 *   `prisma.$executeRawUnsafe`) is NOT implemented here. If you need it,
 *   wire it up using Prisma 8's `db.sql` / `db.runtime().query()` raw query
 *   APIs and add an `$executeRawUnsafe` method to the returned object.
 * - Typed loosely (`any`) since the exact model type comes from your own
 *   generated `contract.d.ts`. Tighten the types locally if you want full
 *   type safety.
 */

type WhereSid = { where: { sid: string } };
type SelectShape = Record<string, boolean>;

export interface Prisma8SessionAdapterOptions {
    /** Key under which the wrapped model is exposed (must match `sessionModelName` passed to PrismaSessionStore). Defaults to 'session'. */
    modelName?: string;
}

/**
 * @param dbClient   The Prisma 8 client returned by `postgres(...)` / `mongo(...)` (needs a `.close()` method).
 * @param sessionModel  The model namespace, e.g. `db.orm.public.Session`.
 * @param options
 */
export function createPrisma8SessionAdapter(
    dbClient: { close: () => Promise<void> },
    sessionModel: any,
    options: Prisma8SessionAdapterOptions = {}
) {
    const modelName = options.modelName ?? 'session';

    const wrappedModel = {
        findMany: async (args?: { select?: SelectShape }) => {
            const fields = args?.select
                ? Object.keys(args.select).filter((k) => args!.select![k])
                : undefined;
            const query = fields ? sessionModel.select(...fields) : sessionModel;
            return query.all();
        },

        findUnique: async ({ where }: WhereSid) => {
            return sessionModel.where(where).first();
        },

        create: async ({ data }: { data: Record<string, unknown> }) => {
            return sessionModel.create(data);
        },

        update: async ({ where, data }: WhereSid & { data: Record<string, unknown> }) => {
            return sessionModel.where(where).update(data);
        },

        delete: async ({ where }: WhereSid) => {
            return sessionModel.where(where).delete();
        },

        deleteMany: async (args?: Partial<WhereSid>) => {
            // NOTE: verify that an empty `{}` filter matches every row on your
            // Prisma 8 RC version — this is what store.clear() relies on.
            const where = args?.where ?? {};
            return sessionModel.where(where).deleteAll();
        },
    };

    return {
        [modelName]: wrappedModel,
        // PrismaSessionStore calls this optionally (`this.prisma?.$connect?.()`),
        // so a no-op is fine — Prisma 8 clients connect lazily.
        $connect: async () => {},
        // PrismaSessionStore.shutdown() calls this directly (not optionally),
        // so it must exist.
        $disconnect: async () => {
            await dbClient.close();
        },
    };
}