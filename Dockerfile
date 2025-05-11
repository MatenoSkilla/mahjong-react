# Node.jsの軽量イメージを使用
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# Viteをグローバルにインストール
RUN npm install -g create-vite

# ViteでReactアプリを作成（ここでappディレクトリにReactアプリを作成）
RUN create-vite . --template react

# 必要なパッケージをインストール
RUN npm install

# Viteのデフォルトポートを開放
EXPOSE 5173

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
