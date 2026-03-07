# 🚀 GitHub Actions - Automatic Deployment Setup

## ✨ Kya Hoga?

Jab bhi aap code push karoge GitHub par:
1. ✅ Automatically EC2 server par deploy ho jayega
2. ✅ Dependencies install hongi
3. ✅ Database migrations run hongi
4. ✅ Server restart hoga
5. ✅ Aapko kuch manually karne ki zarurat nahi!

---

## 📋 Setup Steps

### Step 1: GitHub Secrets Add Karo

GitHub repository mein jao:
1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** par click karo
3. Teen secrets add karo:

#### Secret 1: EC2_HOST
```
Name: EC2_HOST
Value: 35.154.41.10
```

#### Secret 2: EC2_USER
```
Name: EC2_USER
Value: ec2-user
```

#### Secret 3: EC2_SSH_KEY
```
Name: EC2_SSH_KEY
Value: [Your complete .pem file content]
```

**EC2_SSH_KEY kaise copy kare:**
```bash
# Mac/Linux
cat your-key.pem

# Windows
type your-key.pem
```

Complete content copy karo (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

---

### Step 2: Workflow File Push Karo

```bash
# Local machine par
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions auto-deployment"
git push origin main
```

---

### Step 3: Test Karo

1. Koi bhi change karo code mein
2. Commit aur push karo:
```bash
git add .
git commit -m "Test auto deployment"
git push origin main
```

3. GitHub par jao:
   - **Actions** tab mein dekho
   - Deployment progress dikhega
   - Green checkmark = Success ✅
   - Red cross = Error ❌

---

## 🎯 Kaise Use Kare?

### Normal Workflow (Ab se)

```bash
# 1. Code change karo
# 2. Commit karo
git add .
git commit -m "Your changes"

# 3. Push karo - bas itna hi!
git push origin main

# 4. GitHub Actions automatically deploy kar dega
# 5. 2-3 minutes mein live ho jayega
```

---

## 🔍 Deployment Status Check Kare

### GitHub Par
1. Repository → **Actions** tab
2. Latest workflow run dekho
3. Logs dekh sakte ho har step ke

### Server Par (Optional)
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
pm2 logs server --lines 50
```

---

## ⚙️ Advanced Configuration

### Multiple Branches Deploy Karna

Agar `dev` branch bhi deploy karni ho:

```yaml
on:
  push:
    branches:
      - main
      - dev
```

### Deployment Notifications

Slack/Discord notification chahiye? Workflow mein add karo:

```yaml
- name: Notify on success
  if: success()
  run: echo "Deployment successful!"
```

### Build Step Add Karna

Agar TypeScript build karna ho:

```yaml
- name: Build TypeScript
  run: npm run build
```

---

## 🐛 Troubleshooting

### Error: Permission denied (publickey)

**Solution:** EC2_SSH_KEY secret check karo
- Complete .pem file content copy kiya hai?
- Newlines properly hai?

### Error: git pull failed

**Solution:** Server par manually check karo
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
cd locomate-backend
git status
git pull origin main
```

### Error: npm install failed

**Solution:** Dependencies issue ho sakta hai
```bash
# Server par
cd locomate-backend
rm -rf node_modules package-lock.json
npm install
```

### Error: pm2 restart failed

**Solution:** PM2 process check karo
```bash
pm2 list
pm2 restart all
```

---

## 🔐 Security Best Practices

✅ **DO:**
- Secrets mein sensitive data rakho
- .pem file ko secure rakho
- Regular backups lo

❌ **DON'T:**
- .pem file ko code mein commit mat karo
- Secrets ko publicly share mat karo
- Production credentials ko expose mat karo

---

## 📊 Workflow File Explanation

```yaml
name: Deploy to AWS EC2
# Workflow ka naam

on:
  push:
    branches:
      - main
# Jab main branch par push ho, tab run karo

jobs:
  deploy:
    runs-on: ubuntu-latest
    # Ubuntu machine par run hoga
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        # Code download karo
      
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        # SSH se EC2 connect karo
        
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          # Secrets use karo
          
          script: |
            cd /home/ec2-user/locomate-backend
            git pull origin main
            npm install
            npx prisma generate
            npx prisma migrate deploy
            pm2 restart all
            pm2 save
          # Ye commands server par run hongi
```

---

## 🎉 Benefits

1. **Time Saving** - Manual deployment ki zarurat nahi
2. **Consistency** - Har baar same process
3. **Error Reduction** - Manual mistakes nahi hongi
4. **Fast Deployment** - 2-3 minutes mein live
5. **History** - Har deployment ka log milega

---

## 📞 Quick Reference

### Push Code (Auto Deploy)
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Check Deployment Status
- GitHub → Actions tab

### Manual Deployment (Backup)
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
cd locomate-backend
./deploy-update.sh
```

---

## ✅ Setup Complete Checklist

- [ ] `.github/workflows/deploy.yml` file created
- [ ] GitHub Secrets added (EC2_HOST, EC2_USER, EC2_SSH_KEY)
- [ ] Workflow file pushed to GitHub
- [ ] Test deployment successful
- [ ] Actions tab mein green checkmark dikha

---

## 🚀 Ab Kya?

1. Secrets add karo GitHub mein
2. Workflow file push karo
3. Test karo ek small change se
4. Enjoy automatic deployments! 🎉

**Happy Coding! 🚀**
