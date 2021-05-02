#! /bin/sh

echo "-------- 拉取远端仓库 --------"
git pull

echo "-------- npm ci --------"
rm -rf node_modules
npm ci

echo "-------- 前端构建 --------"
npm run build

echo "-------- 检查 secret.json --------"
if [ ! -f "backend/secret.json" ]; then
  cp -r backend/secret.json.example backend/secret.json
  echo "-------- 请在 backend/secret.json 维护账户. --------"
fi

echo "-------- 服务启动 --------"
pm2 stop backend/server
pm2 start backend/server

nginx -s reload

echo "-------- rhaego 已就绪. --------"