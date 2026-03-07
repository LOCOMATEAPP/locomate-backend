# ⚡ Quick Auto-Deploy Setup (5 Minutes)

## 🎯 Goal
GitHub par push karo → Automatically server par deploy ho jaye!

---

## 📝 Step-by-Step Setup

### Step 1: GitHub Secrets Add Karo (2 minutes)

1. **GitHub repository kholo:** https://github.com/LOCOMATEAPP/locomate-backend

2. **Settings par jao** (top right)

3. **Left sidebar mein:**
   - Scroll down
   - **Secrets and variables** par click
   - **Actions** par click

4. **New repository secret** button (green) par click

5. **Teen secrets add karo ek-ek karke:**

#### Secret #1
```
Name: EC2_HOST
Secret: 35.154.41.10
```
Click **Add secret**

#### Secret #2
```
Name: EC2_USER
Secret: ec2-user
```
Click **Add secret**

#### Secret #3
```
Name: EC2_SSH_KEY
Secret: [Your .pem file ka complete content]
```

**PEM file kaise copy kare:**
- Mac/Linux: Terminal mein `cat your-key.pem` run karo
- Windows: Notepad se file kholo
- Complete content copy karo (including BEGIN and END lines)
- GitHub secret mein paste karo

Click **Add secret**

---

### Step 2: Workflow File Push Karo (1 minute)

```bash
# Terminal mein ye commands run karo
git add .github/workflows/deploy.yml
git add GITHUB_ACTIONS_SETUP.md
git add QUICK_AUTO_DEPLOY_GUIDE.md
git commit -m "Setup GitHub Actions auto-deployment"
git push origin main
```

---

### Step 3: Test Karo (2 minutes)

1. **GitHub repository mein jao**

2. **Actions tab par click karo** (top menu)

3. **Latest workflow run dekho:**
   - Yellow dot = Running 🟡
   - Green checkmark = Success ✅
   - Red cross = Failed ❌

4. **Click karke logs dekh sakte ho**

---

## ✅ Setup Complete!

Ab se jab bhi code push karoge, automatically deploy ho jayega!

---

## 🚀 Daily Use

### Har Din Ka Workflow

```bash
# 1. Code change karo (VS Code, etc.)

# 2. Changes commit karo
git add .
git commit -m "Added new feature"

# 3. Push karo
git push origin main

# 4. Done! Automatically deploy ho jayega
# 5. 2-3 minutes wait karo
# 6. https://locomate.app par check karo
```

---

## 🔍 Deployment Check Kaise Kare?

### Method 1: GitHub Actions (Recommended)
1. GitHub → Actions tab
2. Latest run par click
3. Green = Success ✅

### Method 2: Direct API Test
```bash
curl https://locomate.app/health
```

### Method 3: Server Logs
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
pm2 logs server --lines 20
```

---

## ⏱️ Deployment Time

- **Automatic:** 2-3 minutes
- **Manual:** 5-10 minutes

**Time saved:** 50-70% 🎉

---

## 🐛 Common Issues

### Issue 1: Workflow Failed - Permission Denied

**Reason:** SSH key galat hai

**Fix:**
1. GitHub → Settings → Secrets → Actions
2. EC2_SSH_KEY edit karo
3. Complete .pem file content paste karo
4. Save karo
5. Retry workflow

### Issue 2: Workflow Failed - Git Pull Error

**Reason:** Server par git conflict ho sakta hai

**Fix:**
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
cd locomate-backend
git reset --hard HEAD
git pull origin main
```

### Issue 3: Workflow Success But Site Not Working

**Reason:** Server error ho sakta hai

**Fix:**
```bash
ssh -i your-key.pem ec2-user@35.154.41.10
pm2 logs server --lines 50
# Error dekho aur fix karo
```

---

## 💡 Pro Tips

### Tip 1: Deployment Notification
Actions tab mein email notification enable kar sakte ho

### Tip 2: Multiple Environments
Dev aur Production alag-alag deploy kar sakte ho

### Tip 3: Rollback
Agar kuch galat ho jaye:
```bash
git revert HEAD
git push origin main
# Automatically previous version deploy ho jayega
```

### Tip 4: Skip Deployment
Agar deployment nahi karni:
```bash
git commit -m "docs: updated readme [skip ci]"
```

---

## 📊 Comparison

### Before (Manual)
```
1. Code change ✏️
2. Git commit 📝
3. Git push 🚀
4. SSH to server 🔐
5. Git pull 📥
6. npm install 📦
7. Prisma migrate 🗄️
8. PM2 restart 🔄
9. Check logs 📋
10. Test API ✅

Time: 5-10 minutes ⏱️
```

### After (Automatic)
```
1. Code change ✏️
2. Git commit 📝
3. Git push 🚀
4. Done! ✅

Time: 30 seconds (your work) ⏱️
GitHub Actions does rest automatically!
```

---

## 🎯 Next Steps

1. ✅ Setup complete karo (5 minutes)
2. ✅ Test deployment karo
3. ✅ Team ko batao
4. ✅ Enjoy automatic deployments!

---

## 📞 Need Help?

### Check These Files:
- `GITHUB_ACTIONS_SETUP.md` - Detailed guide
- `DEPLOYMENT_GUIDE.md` - Manual deployment
- `.github/workflows/deploy.yml` - Workflow file

### Workflow Not Working?
1. Check GitHub Actions tab for errors
2. Verify all 3 secrets are added correctly
3. Check server is accessible via SSH
4. Review workflow logs

---

## 🎉 Success Indicators

✅ GitHub Actions tab mein green checkmark  
✅ https://locomate.app working  
✅ PM2 logs mein no errors  
✅ APIs responding correctly  

**Congratulations! Auto-deployment setup complete! 🚀**

---

## 🔄 Workflow Diagram

```
Local Machine          GitHub              AWS EC2
     |                    |                    |
     | git push           |                    |
     |------------------>|                    |
     |                    |                    |
     |                    | Trigger Action     |
     |                    |                    |
     |                    | SSH Connect        |
     |                    |------------------->|
     |                    |                    |
     |                    |    git pull        |
     |                    |    npm install     |
     |                    |    prisma migrate  |
     |                    |    pm2 restart     |
     |                    |                    |
     |                    | Success ✅         |
     |                    |<-------------------|
     |                    |                    |
     | Notification       |                    |
     |<-------------------|                    |
     |                    |                    |
```

**Total Time: 2-3 minutes automatically! ⚡**
