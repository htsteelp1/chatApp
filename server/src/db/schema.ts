import * as t from "drizzle-orm/sqlite-core";
import {sql, defineRelations} from "drizzle-orm"

const createdAt = () => t.integer("created_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch()
                                                                                           )`)
export const users = t.sqliteTable("users", {
    id: t.integer().primaryKey({autoIncrement: true}),
    name: t.text().notNull().unique(),
    hash: t.text().notNull(),
    createdAt: createdAt()
})


export const servers = t.sqliteTable("servers", {
    id: t.integer().primaryKey({autoIncrement: true}),
    name: t.text().notNull(),
    createdAt: createdAt(),
    ownerId: t.integer("owner_id").notNull().references(() => users.id, {onDelete: "cascade"}),
})


export const messages = t.sqliteTable("messages", {
    id: t.integer().primaryKey({autoIncrement: true}),
    content: t.text().notNull(),
    createdAt: createdAt(),
    userId: t.integer("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
    serverId: t.integer("server_id").notNull().references(() => servers.id, {onDelete: "cascade"})
})


export const serverMemberships = t.sqliteTable("serverMemberships", {
    userId: t.integer("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
    serverId: t.integer("server_id").notNull().references(() => servers.id, {onDelete: "cascade"}),
}, (table) => [t.primaryKey({columns: [table.userId, table.serverId]})])


export const relations = defineRelations({users, servers, messages, serverMemberships}, (r) => ({
    users: {
        messages: r.many.messages(),
        ownedServers: r.many.servers({alias: "ownedServer"}),
        servers: r.many.servers({alias: "serverUsers"}),
        memberships: r.many.serverMemberships()
    },
    servers: {
        owner: r.one.users({
            from: r.servers.ownerId,
            to: r.users.id,
            alias: "ownedServer"
        }),
        users: r.many.users({
            from: r.servers.id.through(r.serverMemberships.serverId),
            to: r.users.id.through(r.serverMemberships.userId),
            alias: "serverUsers"
        }),
        memberships: r.many.serverMemberships({})
    },
    messages: {
        author: r.one.users({
            from: r.messages.userId,
            to: r.users.id
        })
    },
    serverMemberships: {
        server: r.one.servers({
            from: r.serverMemberships.serverId,
            to: r.servers.id
        }),
        user: r.one.users({
            from: r.serverMemberships.userId,
            to: r.users.id
        })
    }
}))