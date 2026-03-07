#!/bin/bash

echo "🚀 Locomate Backend - Update Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project directory?${NC}"
    exit 1
fi

echo "📥 Step 1: Pulling latest code from GitHub..."
git pull origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Git pull failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Code updated${NC}"
echo ""

echo "📦 Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

echo "🗄️  Step 3: Updating database..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma generate failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Prisma client generated${NC}"

npx prisma migrate deploy
if [ $? -ne 0 ]; then
    echo -e "${RED}⚠️  Warning: Migration failed (might be okay if no new migrations)${NC}"
fi
echo ""

echo "🔄 Step 4: Restarting server..."

# Try different restart methods
if command -v pm2 &> /dev/null; then
    echo "Using PM2..."
    pm2 restart all
    pm2 save
    echo -e "${GREEN}✅ Server restarted with PM2${NC}"
elif systemctl is-active --quiet locomate-backend; then
    echo "Using systemctl..."
    sudo systemctl restart locomate-backend
    echo -e "${GREEN}✅ Server restarted with systemctl${NC}"
elif [ -f "docker-compose.yml" ]; then
    echo "Using Docker Compose..."
    docker-compose down
    docker-compose up -d --build
    echo -e "${GREEN}✅ Server restarted with Docker${NC}"
else
    echo -e "${RED}❌ Could not find process manager (PM2/systemctl/docker)${NC}"
    echo "Please restart manually"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📊 Checking server status..."
sleep 3

if command -v pm2 &> /dev/null; then
    pm2 list
elif systemctl is-active --quiet locomate-backend; then
    sudo systemctl status locomate-backend --no-pager
fi

echo ""
echo "✅ Update complete! Test your API:"
echo "   curl http://localhost:3000/health"
echo ""
