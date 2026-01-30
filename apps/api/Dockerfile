FROM node:20-alpine AS base

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/contracts/package.json packages/contracts/

RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY apps/api apps/api
COPY packages/contracts packages/contracts

RUN pnpm --filter "@bookinvideo/contracts" build \
  && pnpm --filter api build \
  && pnpm prune --prod

FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/contracts ./packages/contracts
COPY --from=build /app/apps/api/dist ./apps/api/dist

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/main"]
