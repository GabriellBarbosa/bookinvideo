FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app

# -------------------------
# deps (instala deps p/ build)
# -------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/contracts/package.json packages/contracts/

RUN pnpm install --frozen-lockfile

# -------------------------
# build (compila)
# -------------------------
FROM deps AS build

COPY apps/api apps/api
COPY packages/contracts packages/contracts

ENV CI=true
RUN pnpm --filter "@bookinvideo/contracts" build \
  && pnpm --filter api build

# -------------------------
# runner (instala só prod deps e roda)
# -------------------------
FROM base AS runner

ENV NODE_ENV=production
ENV CI=true

WORKDIR /app

# Copia manifests para instalar somente prod deps do subset (api + deps)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/contracts/package.json packages/contracts/

# instala somente dependências de produção do api + dependências dele
RUN pnpm install --frozen-lockfile --prod --filter api...

# Copia o build pronto
COPY --from=build /app/apps/api/dist ./apps/api/dist
# Se o contracts gera dist, garanta que ele vai junto
COPY --from=build /app/packages/contracts ./packages/contracts

WORKDIR /app/apps/api
EXPOSE 4000
CMD ["node", "dist/main.js"]
