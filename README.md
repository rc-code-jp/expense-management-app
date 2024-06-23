# expense-management-app

## コマンド

### 初期化

```
pnpm install
```

### ローカルのデータベースを起動

```
docker-compose up -d
```

[PgAdmin](http://localhost:8080)

### Schema.tsからマイグレーションファイルを作成

```
pnpm drizzle-kit generate
```

### マイグレーション

```
pnpm drizzle-kit migrate
```
