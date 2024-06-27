# expense-management-app

## ライブラリ

- [Next.js App Router](https://nextjs.org/docs/app)
- [DaisyUI](https://daisyui.com/components/button/)
- [Tailwind](https://tailwindcss.com/)

## コマンド

### 初期化

```
npm install
```

```
cp ./env/.env.example .env.local
```

### ローカルのデータベースを起動

```
docker-compose up -d
```

[PgAdmin](http://localhost:8080)

### Schema.tsからマイグレーションファイルを作成

```
npx drizzle-kit generate
```

### マイグレーション

```
npx drizzle-kit migrate
```
