# Locomate API - Postman Collections

## 📦 Files

1. **Locomate_Mobile.postman_collection.json** - Mobile App APIs (9 folders, 35+ endpoints)
2. **Locomate_Admin.postman_collection.json** - Admin Panel APIs (6 folders)

---

## 🚀 Postman Mein Import Kaise Karein

### Method 1: Drag & Drop
1. Postman open karein
2. Dono JSON files ko Postman window mein drag karein
3. Done! Collections import ho jayengi

### Method 2: Import Button
1. Postman open karein
2. Left sidebar mein **"Import"** button click karein
3. **"Upload Files"** select karein
4. Dono files select karein aur **"Open"** click karein
5. **"Import"** button click karein

---

## 📱 Mobile APIs Collection

### Folders:
1. **Authentication** (4 APIs)
   - Send OTP
   - Verify OTP & Login
   - Refresh Token
   - Logout

2. **User Profile** (2 APIs)
   - Get Profile
   - Update Profile

3. **Malls & Stores** (6 APIs)
   - Get All Malls
   - Get Mall by ID
   - Get Floors
   - Get Stores
   - Search Stores
   - Get Store by ID

4. **Navigation** (2 APIs)
   - Calculate Route
   - Get Navigation History

5. **Offers** (2 APIs)
   - Get All Offers
   - Get Offer by ID

6. **Rewards** (3 APIs)
   - Claim Offer
   - Get My Claims
   - Redeem Reward

7. **Saved Items** (4 APIs)
   - Save Store
   - Save Offer
   - Get Saved Items
   - Remove Saved Item

8. **Messaging** (2 APIs)
   - Get Messages
   - Mark as Read

9. **Parking** (4 APIs)
   - Start Parking
   - Get Active Session
   - End Parking
   - Get History

---

## 🔧 Admin APIs Collection

### Folders:
1. **Authentication** (3 APIs)
   - Admin Login
   - Refresh Token
   - Logout

2. **Analytics & Reports** (Coming Soon)
3. **Mall Management** (Coming Soon)
4. **Store Management** (Coming Soon)
5. **Offer Management** (Coming Soon)
6. **User Management** (Coming Soon)

---

## ⚙️ Configuration

### Variables (Auto-configured):

**Mobile Collection:**
- `base_url`: http://localhost:3000
- `access_token`: (Auto-filled after login)
- `refresh_token`: (Auto-filled after login)
- `phone`: +1234567890
- `otp`: (Auto-filled after Send OTP)

**Admin Collection:**
- `base_url`: http://localhost:3000
- `admin_access_token`: (Auto-filled after login)
- `admin_refresh_token`: (Auto-filled after login)
- `admin_email`: admin@locomate.com
- `admin_password`: admin123

---

## 🎯 Quick Start Workflow

### Mobile App Testing:

1. **Send OTP** request run karein
   - OTP automatically save ho jayega variable mein
   
2. **Verify OTP & Login** run karein
   - Access token aur refresh token automatically save ho jayenge
   
3. Ab koi bhi authenticated API call kar sakte hain!
   - Token automatically header mein add ho jayega

### Admin Panel Testing:

1. **Admin Login** request run karein
   - Default credentials already set hain
   - Tokens automatically save ho jayenge
   
2. Ab admin APIs use kar sakte hain

---

## 🔐 Authentication

**Mobile APIs:**
- Bearer token authentication
- Token automatically collection variable se pick hota hai
- Login ke baad manually token set karne ki zarurat nahi

**Admin APIs:**
- Bearer token authentication
- Separate admin token variable
- Login ke baad auto-configured

---

## 💡 Tips

1. **Environment vs Collection Variables:**
   - Ye collections **Collection Variables** use karti hain
   - Har collection ke apne variables hain
   - Agar multiple environments chahiye, to Postman Environment bana sakte hain

2. **Auto-save Tokens:**
   - Login/Verify OTP requests mein **Tests** tab check karein
   - Wahan script hai jo automatically tokens save karti hai

3. **Base URL Change:**
   - Collection variables mein `base_url` change kar sakte hain
   - Production URL: apni production URL set karein

4. **Request IDs:**
   - Mall ID, Store ID, Offer ID wale requests mein
   - Path variables manually enter karne honge
   - Ya collection variables mein save kar sakte hain

---

## 📝 Default Credentials

**Admin Account:**
```
Email: admin@locomate.com
Password: admin123
```

**Mobile User:**
```
Phone: +1234567890
OTP: (Development mode mein response mein milega)
```

---

## 🐛 Troubleshooting

**401 Unauthorized Error:**
- Login/Verify OTP request pehle run karein
- Token expire ho gaya ho to Refresh Token use karein

**404 Not Found:**
- Server running hai ya nahi check karein: `npm run dev`
- Base URL sahi hai ya nahi verify karein

**Validation Errors:**
- Request body check karein
- Required fields fill hain ya nahi dekhen

---

## 📞 Support

Issues ya questions ke liye API_ENDPOINTS.txt file dekhen.

Happy Testing! 🚀
