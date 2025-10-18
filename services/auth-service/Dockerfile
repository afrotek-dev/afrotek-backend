# ====== Build from Afrotek Base ======
FROM afrotek/nest-base:latest AS builder

WORKDIR /app/services/auth-service
COPY services/auth-service ./

# ✅ Use mirror for better reliability
RUN npm config --global set registry https://registry.npmmirror.com
RUN npm install --legacy-peer-deps
RUN npm run build

# ====== Runtime ======
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
COPY libs/common/package*.json libs/common/
COPY services/auth-service/package*.json services/auth-service/

# ✅ Persistent registry + clean cache
RUN npm config --global set registry https://registry.npmmirror.com \
    && npm config set registry https://registry.npmmirror.com \
    && npm cache clean --force \
    && npm install --omit=dev --legacy-peer-deps --workspaces

COPY --from=builder /app/services/auth-service/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
