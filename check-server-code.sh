#!/bin/bash

echo "🔍 Checking Server Code Status"
echo "================================"
echo ""

echo "1️⃣ Current Git Branch and Commit:"
git branch
git log -1 --oneline
echo ""

echo "2️⃣ Checking if auth routes file exists:"
ls -la src/modules/mobile/auth/routes.ts
echo ""

echo "3️⃣ Checking signup route in routes.ts:"
grep -n "signup" src/modules/mobile/auth/routes.ts
echo ""

echo "4️⃣ Checking app.ts for route registration:"
grep -n "authRoutes" src/app.ts
echo ""

echo "5️⃣ PM2 Process Info:"
pm2 info server
echo ""

echo "6️⃣ Recent PM2 Logs (last 30 lines):"
pm2 logs server --lines 30 --nostream
echo ""

echo "7️⃣ Testing localhost directly:"
curl -s http://localhost:3000/health | jq '.'
echo ""

echo "8️⃣ Testing all auth endpoints on localhost:"
echo "GET /api/v1/mobile/auth/check-user"
curl -s -X POST http://localhost:3000/api/v1/mobile/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'
echo ""
echo ""

echo "POST /api/v1/mobile/auth/signup"
curl -s -X POST http://localhost:3000/api/v1/mobile/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "name": "Test"}'
echo ""
