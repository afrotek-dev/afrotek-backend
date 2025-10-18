# ====== Build from Afrotek Base ======
FROM afrotek/nest-base:latest AS builder

WORKDIR /app/services/product-service
COPY services/product-service ./

RUN npm install --legacy-peer-deps

RUN npm run build

# ====== Runtime ======
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
COPY libs/common/package*.json libs/common/
COPY services/product-service/package*.json services/product-service/

RUN npm config --global set registry https://registry.npmmirror.com

RUN npm install --omit=dev --legacy-peer-deps --workspaces

COPY --from=builder /app/services/product-service/dist ./dist

EXPOSE 3002
CMD ["node", "dist/main.js"]
