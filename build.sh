#! /bin/sh -e
printf "\n-------- 拉取远端仓库 --------\n"
git pull

printf "\n-------- npm ci --------\n"
rm -rf node_modules
npm ci

printf "\n-------- 前端构建 --------\n"
npm run build

printf "\n-------- 检查 secret.json --------\n"
if [ ! -f "backend/secret.json" ]; then
  cp -r backend/secret.json.example backend/secret.json
fi

printf "\n-------- 检查简历 markdown --------\n"
if [ ! -f "backend/data/resume.md" ]; then
  cp -r backend/data/resume.md.example backend/data/resume.md
fi

printf "\n-------- 检查文件服务目录 --------\n"
if [ ! -d "backend/files" ]; then
  mkdir "backend/files"
fi

printf "\n-------- 重启服务 --------\n"
pm2 stop backend/server
pm2 start backend/server

printf "\n-------- 重启 nginx --------\n"
nginx -s reload

printf "\n-------- rhaego 已就绪. --------\n"