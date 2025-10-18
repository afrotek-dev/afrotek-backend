# ====== Build from Afrotek Base ======
FROM afrotek/nest-base:latest AS builder

WORKDIR /app/services/order-service
COPY services/order-service ./

# ✅ Set stable registry globally
RUN npm config --global set registry https://registry.npmmirror.com

# ✅ Install local deps safely (no workspace issue)
RUN npm install --legacy-peer-deps \
    && npm install -D @types/passport-jwt

RUN npm run build

# ====== Runtime ======
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
COPY libs/common/package*.json libs/common/
COPY services/order-service/package*.json services/order-service/

# ✅ Stable registry again for runtime
RUN npm config --global set registry https://registry.npmmirror.com \
    && npm install --omit=dev --legacy-peer-deps --workspaces

COPY --from=builder /app/services/order-service/dist ./dist

EXPOSE 3003
CMD ["node", "dist/main.js"]
