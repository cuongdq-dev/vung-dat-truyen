# ============================
# Stage 1: Build Astro (Dùng Node Alpine)
# ============================
FROM node:20-alpine AS builder
WORKDIR /app

# Cài đặt Git (Fix lỗi "git: not found")
RUN apk add --no-cache git

# Chỉ copy những file quan trọng trước để tận dụng cache
COPY package.json yarn.lock ./

# Cài dependencies
RUN yarn install --immutable

# Copy source code còn lại
COPY . .

# Build Astro
RUN yarn build

# ============================
# Stage 2: Run Astro SSR (Sử dụng Alpine nhẹ hơn)
# ============================
FROM node:20-alpine AS runner
WORKDIR /app

# Chỉ copy các file cần thiết từ builder
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Chạy ứng dụng
EXPOSE 5000
CMD ["node", "dist/server/entry.mjs"]
