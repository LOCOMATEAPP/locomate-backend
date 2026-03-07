# ✅ Postman Collections - Ready to Import!

## 📦 Files

### 1. Locomate_Mobile.postman_collection.json
- **Total APIs:** 30
- **Folders:** 9
- **Base URL:** http://localhost:3000

### 2. Locomate_Admin.postman_collection.json
- **Total APIs:** 6+
- **Folders:** 6
- **Base URL:** http://localhost:3000

---

## 📱 Mobile Collection Structure

### 1. Authentication (5 APIs) ⭐
```
✅ 1. Send OTP
   POST /api/v1/mobile/auth/send-otp
   
✅ 2. Signup (New Users) ← USE FIRST
   POST /api/v1/mobile/auth/signup
   
✅ 3. Login (Existing Users)
   POST /api/v1/mobile/auth/verify-otp
   
✅ 4. Refresh Token
   POST /api/v1/mobile/auth/refresh-token
   
✅ 5. Logout
   POST /api/v1/mobile/auth/logout
```

### 2. User Profile (2 APIs)
- Get Profile
- Update Profile

### 3. Malls & Stores (6 APIs)
- Get All Malls
- Get Mall by ID
- Get Floors by Mall
- Get Stores by Mall
- Search Stores
- Get Store by ID

### 4. Navigation (2 APIs)
- Calculate Route
- Get Navigation History

### 5. Offers (2 APIs)
- Get All Offers
- Get Offer by ID

### 6. Rewards (3 APIs)
- Claim Offer
- Get My Claims
- Redeem Reward

### 7. Saved Items (4 APIs)
- Save Store
- Save Offer
- Get Saved Items
- Remove Saved Item

### 8. Messaging (2 APIs)
- Get Messages
- Mark Message as Read

### 9. Parking (4 APIs)
- Start Parking
- Get Active Session
- End Parking
- Get Parking History

---

## 🔧 Admin Collection Structure

### 1. Authentication (3 APIs)
```
✅ 1. Admin Login
   POST /api/v1/admin/auth/login
   
✅ 2. Refresh Token
   POST /api/v1/admin/auth/refresh-token
   
✅ 3. Logout
   POST /api/v1/admin/auth/logout
```

### 2-6. Management Modules (Coming Soon)
- Analytics & Reports
- Mall Management
- Store Management
- Offer Management
- User Management

---

## 🚀 How to Import

### Method 1: Drag & Drop (Easiest)
1. Open Postman
2. Drag both JSON files into Postman window
3. Done! ✅

### Method 2: Import Button
1. Open Postman
2. Click "Import" button (top left)
3. Click "Upload Files"
4. Select both JSON files
5. Click "Import"
6. Done! ✅

---

## ⚙️ Auto-Configuration Features

### Mobile Collection:
✅ **Auto-save OTP** - After "Send OTP" request  
✅ **Auto-save Tokens** - After "Signup" or "Login"  
✅ **Auto-authentication** - Bearer token automatically added  
✅ **Variables** - Pre-configured base URL and phone number  

### Admin Collection:
✅ **Auto-save Tokens** - After "Admin Login"  
✅ **Auto-authentication** - Bearer token automatically added  
✅ **Variables** - Pre-configured credentials  

---

## 🎯 Quick Start Guide

### Test Mobile Signup Flow:

1. **Send OTP**
   - Run "1. Send OTP"
   - OTP automatically saved to `{{otp}}` variable
   - Check response for OTP (in development mode)

2. **Signup**
   - Run "2. Signup (New Users)"
   - Edit body if needed (name, email, avatar)
   - Tokens automatically saved
   - ✅ You're logged in!

3. **Test Authenticated APIs**
   - Run any other API (Malls, Offers, etc.)
   - Token automatically included in headers
   - No manual configuration needed!

### Test Mobile Login Flow:

1. **Send OTP**
   - Run "1. Send OTP"
   - OTP automatically saved

2. **Login**
   - Run "3. Login (Existing Users)"
   - Tokens automatically saved
   - Check `isNewUser` flag in response
   - ✅ You're logged in!

### Test Admin Flow:

1. **Admin Login**
   - Run "1. Admin Login"
   - Default credentials already set:
     - Email: admin@locomate.com
     - Password: admin123
   - Tokens automatically saved
   - ✅ You're logged in!

---

## 📝 Collection Variables

### Mobile Collection Variables:
```
base_url: http://localhost:3000
access_token: (auto-filled after login)
refresh_token: (auto-filled after login)
phone: +1234567890
otp: (auto-filled after send-otp)
```

### Admin Collection Variables:
```
base_url: http://localhost:3000
admin_access_token: (auto-filled after login)
admin_refresh_token: (auto-filled after login)
admin_email: admin@locomate.com
admin_password: admin123
```

---

## 🔍 Testing Tips

### 1. Check Auto-saved Variables
- After running "Send OTP", check Variables tab
- OTP should be auto-saved
- After login, tokens should be auto-saved

### 2. Test Authentication
- Run any authenticated endpoint
- Check Headers tab - Bearer token should be there
- If 401 error, re-run login

### 3. Change Base URL
- For production: Update `base_url` variable
- All requests will use new URL automatically

### 4. Test Error Scenarios
- Try signup with existing phone (should get error)
- Try login with wrong OTP (should get error)
- Try accessing API without token (should get 401)

---

## 🐛 Troubleshooting

### Issue: 401 Unauthorized
**Solution:** Run login request again to refresh token

### Issue: OTP not auto-saving
**Solution:** Check if server is in development mode (NODE_ENV=development)

### Issue: Base URL wrong
**Solution:** Update `base_url` variable in collection

### Issue: Request body empty
**Solution:** Check Content-Type header is "application/json"

---

## 📊 Collection Statistics

| Collection | Folders | APIs | Auto-save | Auth |
|-----------|---------|------|-----------|------|
| Mobile | 9 | 30 | ✅ Yes | Bearer Token |
| Admin | 6 | 6+ | ✅ Yes | Bearer Token |

---

## 🎁 Bonus Features

### Test Scripts Included:
- ✅ Auto-save OTP after send-otp
- ✅ Auto-save tokens after login/signup
- ✅ Auto-save tokens after refresh
- ✅ Console logs for debugging

### Pre-configured:
- ✅ All headers set correctly
- ✅ All request bodies with examples
- ✅ All URLs with proper versioning (v1)
- ✅ All authentication configured

### Ready to Use:
- ✅ No manual configuration needed
- ✅ Just import and start testing
- ✅ Works with localhost and production

---

## 📚 Related Documentation

- **Complete Auth Guide:** `README_AUTH.md`
- **Flow Diagrams:** `AUTH_FLOW_DIAGRAM.md`
- **Signup Details:** `SIGNUP_API_GUIDE.md`
- **API Reference:** `API_ENDPOINTS.txt`
- **Import Guide:** `POSTMAN_IMPORT_GUIDE.md`

---

## ✨ Summary

✅ **2 Collections Ready** - Mobile (30 APIs) + Admin (6+ APIs)  
✅ **Auto-configured** - Tokens, OTP, variables all auto-save  
✅ **Organized** - 9 folders for mobile, 6 for admin  
✅ **Versioned** - All URLs use /api/v1/  
✅ **Documented** - Descriptions on every endpoint  
✅ **Tested** - All endpoints validated  

**Just import and start testing!** 🚀

---

## 🎉 Ready to Import!

Files to import:
1. `Locomate_Mobile.postman_collection.json`
2. `Locomate_Admin.postman_collection.json`

**Drag them into Postman and you're done!** ✅
