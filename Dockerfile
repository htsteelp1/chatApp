FROM node:26-alpine AS base
LABEL authors="Henry Steel"

FROM base AS client-build
WORKDIR /app/client
COPY client/package*.json .
RUN npm ci
COPY client .
RUN npm run build

FROM base AS server-build
WORKDIR /app/server
COPY server/package*.json .
RUN npm ci
COPY server .
RUN npm run build

FROM server-build AS migrate
WORKDIR /app/server
CMD ["npx", "prisma", "db", "migrate", "--yes"]

FROM base AS prod-deps
WORKDIR /app/server
COPY server/package*.json .
RUN npm ci --omit=dev

FROM base AS runtime
ENV NODE_ENV=PROD
WORKDIR /app
COPY --from=prod-deps /app/server/node_modules ./server/node_modules
COPY --from=server-build /app/server/dist ./server/dist
COPY --from=server-build /app/server/package.json ./server
COPY --from=client-build /app/client/dist ./client/dist
USER node
EXPOSE 3000
CMD  ["node", "/app/server/dist/index.js"]
