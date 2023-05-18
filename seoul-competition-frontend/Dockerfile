FROM node:18-alpine AS base

LABEL maintainer="https://kyportfolio.tistory.com/"

FROM base AS builder

ARG NEXT_PUBLIC_ENV_API_DOMAIN
ARG NEXT_PUBLIC_ENV_API_URL
ARG NEXT_PUBLIC_ENV_DOMAIN

ENV NEXT_PUBLIC_ENV_API_DOMAIN=${NEXT_PUBLIC_ENV_API_DOMAIN}
ENV NEXT_PUBLIC_ENV_API_URL=${NEXT_PUBLIC_ENV_API_URL}
ENV NEXT_PUBLIC_ENV_DOMAIN=${NEXT_PUBLIC_ENV_DOMAIN}

WORKDIR /usr/src/nextjs

COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
  fi

COPY ./ ./

RUN npm run build

FROM base AS runner

ARG NEXT_PUBLIC_ENV_API_DOMAIN
ARG NEXT_PUBLIC_ENV_API_URL
ARG NEXT_PUBLIC_ENV_DOMAIN

ENV NEXT_PUBLIC_ENV_API_DOMAIN=${NEXT_PUBLIC_ENV_API_DOMAIN}
ENV NEXT_PUBLIC_ENV_API_URL=${NEXT_PUBLIC_ENV_API_URL}
ENV NEXT_PUBLIC_ENV_DOMAIN=${NEXT_PUBLIC_ENV_DOMAIN}

WORKDIR /usr/src/nextjs

COPY --from=builder /usr/src/nextjs/public ./public
COPY --from=builder /usr/src/nextjs/.next/standalone ./
COPY --from=builder /usr/src/nextjs/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
