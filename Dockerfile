# 基于 arm64/v8 的 nginx 镜像
FROM --platform=linux/arm64/v8 nginx:latest

# 删除默认配置（可选）
RUN rm -f /etc/nginx/conf.d/default.conf

# 复制你的自定义 nginx 配置（可选）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制打包好的前端文件到 nginx html 目录
COPY dist/ /usr/share/nginx/html/

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]