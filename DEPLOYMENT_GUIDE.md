# 🚀 Locomate Backend - Deployment Guide

## 📋 Server Information

- **Domain:** https://locomate.app
- **Server IP:** 35.154.41.10
- **Server:** AWS EC2 (Amazon Linux 2)
- **Database:** AWS RDS MySQL
- **Process Manager:** PM2
- **Web Server:** Nginx
- **SSL:** Let's Encrypt (Certbot)

---

## ⚡ Automatic Deployment (Recommended)

**GitHub Actions se automatic deployment setup hai!**

```bash
# Bas code push karo, automatically deploy ho jayega
git add .
git commit -m "Your changes"
git push origin main

# 2-3 minutes mein live ho jayega ✅
```

**Setup Guide:** See `QUICK_AUTO_DEPLOY_GUIDE.md` for 5-minute setup

**Benefits:**
- ✅ Automatic deployment on push
- ✅ No manual SSH needed
- ✅ Consistent deployment process
- ✅ Deployment history in GitHub Actions

---

## 🔄 Manual Deployment (Backup Method)

### Method 1: Using Deployment Script (Recommended)

```bash
# 1. SSH to server
ssh -i your-key.pem ec2-user@35.154.41.10

# 2. Go to project directory
cd locomate-backend

# 3. Run deployment script
./deploy-update.sh
```

**That's it!** Script automatically:
- ✅ Pulls latest code from GitHub
- ✅ Installs dependencies
- ✅ Runs database migrations
- ✅ Restarts server

---

### Method 2: Manual Deployment

```bash
# 1. SSH to server
ssh -i your-key.pem ec2-user@35.154.41.10

# 2. Go to project directory
cd locomate-backend

# 3. Pull latest code
git pull origin main

# 4. Install dependencies
npm install

# 5. Update Prisma
npx prisma generate
npx prisma migrate deploy

# 6. Restart server
pm2 restart all

# 7. Check status
pm2 list
pm2 logs server --lines 50
```

---

## 🆕 Fresh Deployment (From Scratch)

### Step 1: Prepare Local Code

```bash
# 1. Commit all changes
git add .
git commit -m "Your commit message"

# 2. Push to GitHub
git push origin main
```

### Step 2: SSH to Server

```bash
ssh -i your-key.pem ec2-user@35.154.41.10
```

### Step 3: Clone Repository (First Time Only)

```bash
# Clone from GitHub
git clone https://github.com/LOCOMATEAPP/locomate-backend.git
cd locomate-backend
```

### Step 4: Setup Environment

```bash
# Create .env file
nano .env
```

**Add these variables:**
```env
NODE_ENV=production
PORT=3000

# Database (RDS)
DATABASE_URL="mysql://admin:ENCODED_PASSWORD@database-1.c9ae0mq0o4bg.ap-south-1.rds.amazonaws.com:3306/locomate"

# JWT Secrets
JWT_ACCESS_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Other configs
PARKING_RATE_PER_HOUR=50
```

**Important:** Encode special characters in password:
- `:` → `%3A`
- `[` → `%5B`
- `]` → `%5D`
- `(` → `%28`
- `)` → `%29`
- `!` → `%21`
- `~` → `%7E`
- `#` → `%23`

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed data
npx tsx prisma/seed.ts
```

### Step 7: Start Server with PM2

```bash
# Start server
pm2 start dist/server.js --name server

# Save PM2 config
pm2 save

# Setup auto-start on reboot
pm2 startup
```

### Step 8: Configure Nginx

```bash
# Edit nginx config
sudo nano /etc/nginx/conf.d/locomate.conf
```

**Add this configuration:**
```nginx
server {
    server_name locomate.app www.locomate.app;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/locomate.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/locomate.app/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.locomate.app) {
        return 301 https://$host$request_uri;
    }

    if ($host = locomate.app) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name locomate.app www.locomate.app;
    return 404;
}
```

**Test and restart:**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔍 Troubleshooting

### Issue 1: Server Not Starting

```bash
# Check logs
pm2 logs server --lines 100

# Check if port is in use
netstat -tulpn | grep 3000

# Restart server
pm2 restart all
```

### Issue 2: Database Connection Error

```bash
# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Test database connection
npx prisma db pull
```

### Issue 3: bcrypt Error

```bash
# Rebuild bcrypt
npm rebuild bcrypt

# Or reinstall
rm -rf node_modules/bcrypt
npm install bcrypt

# Restart server
pm2 restart all
```

### Issue 4: 502 Bad Gateway

```bash
# Check if server is running
pm2 list
curl http://localhost:3000/health

# Check nginx config
sudo nginx -t

# Check nginx is pointing to correct port
sudo cat /etc/nginx/conf.d/locomate.conf | grep proxy_pass

# Should be: proxy_pass http://127.0.0.1:3000;
```

### Issue 5: Migration Failed

```bash
# Check database connection
npx prisma db pull

# Force reset (CAREFUL - deletes data!)
npx prisma migrate reset --force

# Or deploy specific migration
npx prisma migrate deploy
```

---

## 📊 Useful Commands

### PM2 Commands

```bash
# List all processes
pm2 list

# View logs
pm2 logs
pm2 logs server --lines 100

# Restart
pm2 restart all
pm2 restart server

# Stop
pm2 stop all
pm2 stop server

# Delete process
pm2 delete server

# Monitor
pm2 monit

# Save current state
pm2 save
```

### Nginx Commands

```bash
# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx

# Reload (no downtime)
sudo systemctl reload nginx

# Status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Git Commands

```bash
# Pull latest code
git pull origin main

# Check status
git status

# Discard local changes
git stash
git reset --hard HEAD

# View commit history
git log --oneline -10
```

### Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (CAREFUL!)
npx prisma migrate reset --force

# Open Prisma Studio
npx prisma studio
```

---

## 🔐 Security Checklist

- ✅ `.env` file has correct permissions (600)
- ✅ Database password is URL encoded
- ✅ JWT secrets are strong and unique
- ✅ SSL certificate is valid
- ✅ Firewall allows only necessary ports
- ✅ PM2 is set to auto-start on reboot
- ✅ Regular backups are configured

---

## 📝 Deployment Checklist

Before deploying:
- [ ] All tests passing locally
- [ ] Code committed to GitHub
- [ ] Database migrations tested
- [ ] Environment variables updated
- [ ] Dependencies updated

After deploying:
- [ ] Server started successfully
- [ ] Health check passes
- [ ] Database connected
- [ ] APIs responding correctly
- [ ] Logs checked for errors
- [ ] PM2 saved

---

## 🎯 Quick Reference

### Test Deployment

```bash
# Health check
curl https://locomate.app/health

# Test API
curl -X POST https://locomate.app/api/v1/mobile/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'
```

### Rollback (If Something Goes Wrong)

```bash
# Go back to previous commit
git log --oneline -5
git reset --hard COMMIT_HASH
npm install
npx prisma generate
pm2 restart all
```

---

## 📞 Support

**GitHub Repository:**  
https://github.com/LOCOMATEAPP/locomate-backend

**Documentation:**
- API Endpoints: `API_ENDPOINTS.txt`
- Auth Flow: `UPDATED_AUTH_FLOW.md`
- Postman Collections: `Locomate_Mobile.postman_collection.json`

---

## 🎉 Success!

Your deployment is complete when:
- ✅ `https://locomate.app/health` returns 200 OK
- ✅ PM2 shows server as "online"
- ✅ No errors in logs
- ✅ APIs responding correctly

**Happy Deploying! 🚀**
