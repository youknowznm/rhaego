#! /bin/bash
set -e

printf "\n-------- npm i --------\n"
if [ ! -d "node_modules" ]; then
  npm i
fi

printf "\n-------- 前端构建 --------\n"
npm run build

printf "\n-------- 检查 secret.json --------\n"
if [ ! -f "./backend/secret.json" ]; then
  cp -r ./backend/secret.json.example backend/secret.json
fi

printf "\n-------- 检查 resume.md --------\n"
if [ ! -f "./backend/data/resume.md" ]; then
  cp -r ./backend/data/resume.md.example backend/data/resume.md
fi

printf "\n-------- 检查文件服务目录 --------\n"
if [ ! -d "./backend/files" ]; then
  mkdir "./backend/files"
fi

printf "\n-------- 初始化完成 --------\n"