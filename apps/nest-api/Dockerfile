FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app

# -------------------------
# deps (instala deps p/ build)
# -------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/nest-api/package.json apps/nest-api/
COPY packages/contracts/package.json packages/contracts/

RUN pnpm install --frozen-lockfile

# -------------------------
# build (compila)
# -------------------------
FROM deps AS build

COPY apps/nest-api apps/nest-api
COPY packages/contracts packages/contracts

ENV CI=true
RUN pnpm --filter "@bookinvideo/contracts" build \
  && pnpm --filter nest-api build

# -------------------------
# runner (instala só prod deps e roda)
# -------------------------
FROM base AS runner

ENV NODE_ENV=production
ENV CI=true

WORKDIR /app

# Copia manifests para instalar somente prod deps do subset (nest-api + deps)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/nest-api/package.json apps/nest-api/
COPY packages/contracts/package.json packages/contracts/

# instala somente dependências de produção do nest-api + dependências dele
RUN pnpm install --frozen-lockfile --prod --filter nest-api...

# Copia o build pronto
COPY --from=build /app/apps/nest-api/dist ./apps/nest-api/dist
# Se o contracts gera dist, garanta que ele vai junto
COPY --from=build /app/packages/contracts ./packages/contracts

WORKDIR /app/apps/nest-api
EXPOSE 4000
CMD ["node", "dist/main.js"]
