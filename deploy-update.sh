#!/bin/bash

echo "🚀 Locomate - Full Deployment Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project directory?${NC}"
    exit 1
fi

# ─────────────────────────────────────────
# STEP 1: Pull latest code
# ─────────────────────────────────────────
echo -e "${BLUE}📥 Step 1: Pulling latest code from GitHub...${NC}"
git pull origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Git pull failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Code updated${NC}"
echo ""

# ─────────────────────────────────────────
# STEP 2: Backend - Install dependencies
# ─────────────────────────────────────────
echo -e "${BLUE}📦 Step 2: Installing backend dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# ─────────────────────────────────────────
# STEP 3: Database - Prisma
# ─────────────────────────────────────────
echo -e "${BLUE}🗄️  Step 3: Updating database...${NC}"
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

# ─────────────────────────────────────────
# STEP 4: Backend - Build TypeScript
# ─────────────────────────────────────────
echo -e "${BLUE}🔨 Step 4: Building backend (TypeScript)...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend build completed${NC}"
echo ""

# ─────────────────────────────────────────
# STEP 5: Frontend - Deploy pre-built React Admin
# ─────────────────────────────────────────
echo -e "${BLUE}⚛️  Step 5: Deploying React Admin Frontend...${NC}"
if [ -d "locomate-admin/dist" ]; then
    sudo mkdir -p /var/www/locomate-admin
    sudo cp -r locomate-admin/dist/. /var/www/locomate-admin/
    sudo chmod -R 755 /var/www/locomate-admin
    echo -e "${GREEN}✅ Frontend deployed to /var/www/locomate-admin${NC}"
else
    echo -e "${RED}⚠️  locomate-admin/dist not found, skipping frontend deploy${NC}"
fi
echo ""

# ─────────────────────────────────────────
# STEP 5b: Landing Page - Deploy static HTML
# ─────────────────────────────────────────
echo -e "${BLUE}🌐 Step 5b: Deploying Landing Page...${NC}"
if [ -f "landing/index.html" ]; then
    sudo mkdir -p /var/www/locomate-landing
    sudo cp -r landing/. /var/www/locomate-landing/
    sudo chmod -R 755 /var/www/locomate-landing
    echo -e "${GREEN}✅ Landing page deployed to /var/www/locomate-landing${NC}"
else
    echo -e "${RED}⚠️  landing/index.html not found, skipping landing deploy${NC}"
fi
echo ""

# ─────────────────────────────────────────
# STEP 6: Nginx - Update config if needed
# ─────────────────────────────────────────
echo -e "${BLUE}🌐 Step 6: Checking Nginx config...${NC}"
NGINX_CONF="/etc/nginx/conf.d/locomate.conf"

# Check if admin location already exists in nginx config
if ! sudo grep -q "locomate-admin" "$NGINX_CONF" 2>/dev/null; then
    echo "Adding admin panel to Nginx config..."
    # Insert admin location block before the closing brace of the first server block
    sudo sed -i '/proxy_cache_bypass \$http_upgrade;/a\    \n    # Admin Panel\n    location \/admin {\n        alias \/var\/www\/locomate-admin;\n        index index.html;\n        try_files \$uri \$uri\/ \/admin\/index.html;\n    }' "$NGINX_CONF"
    sudo nginx -t && sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx updated - Admin panel at /admin${NC}"
else
    echo -e "${GREEN}✅ Nginx config already has admin panel${NC}"
fi
echo ""

# ─────────────────────────────────────────
# STEP 7: Restart backend server
# ─────────────────────────────────────────
echo -e "${BLUE}🔄 Step 7: Restarting backend server...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 restart all
    pm2 save
    echo -e "${GREEN}✅ Server restarted with PM2${NC}"
else
    echo -e "${RED}❌ PM2 not found${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Full deployment completed successfully!${NC}"
echo ""
echo "📊 Server status:"
sleep 3
pm2 list

echo ""
echo "✅ Your apps are live:"
echo "   🔗 API:          https://locomate.app/api/v1"
echo "   🔗 Admin Panel:  https://locomate.app/admin"
echo "   🔗 Health Check: https://locomate.app/health"
echo ""
