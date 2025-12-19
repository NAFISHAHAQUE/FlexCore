# Backend (Express + MongoDB)

Simple Express backend with Mongoose models for `User` and `Workout`.

Run:

```powershell
cd backend
npm install
copy .env.example .env
# edit .env to set MONGO_URI if needed
npm run dev
```

Endpoints:
- `GET /api/profile` — get or create demo profile
- `PUT /api/profile` — update profile
- `GET /api/dashboard` — dashboard summary for demo user
