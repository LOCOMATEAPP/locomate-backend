# 🔐 Locomate Authentication Guide

## Quick Start

### For New Users: Signup → Login
### For Existing Users: Login Only

---

## 📱 Complete Authentication Flow

### Step 1: Send OTP (Common for Both)

**Endpoint:** `POST /api/v1/mobile/auth/send-otp`

```bash
curl -X POST http://localhost:3000/api/v1/mobile/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "OTP sent successfully",
    "otp": "123456"  // Only in development mode
  }
}
```

---

### Step 2a: Signup (New Users) ⭐ USE THIS FIRST

**Endpoint:** `POST /api/v1/mobile/auth/signup`

```bash
curl -X POST http://localhost:3000/api/v1/mobile/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890",
    "otp": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

**Required Fields:**
- `phone` - Phone number with country code
- `otp` - 6-digit OTP
- `name` - User's full name (2-100 characters)

**Optional Fields:**
- `email` - Email address
- `avatar` - Profile picture URL

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "phone": "+1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

---

### Step 2b: Login (Existing Users)

**Endpoint:** `POST /api/v1/mobile/auth/verify-otp`

```bash
curl -X POST http://localhost:3000/api/v1/mobile/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890",
    "otp": "123456"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "phone": "+1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "isNewUser": false
  }
}
```

**Note:** `isNewUser` flag indicates if user was just created (profile might be incomplete)

---

## 🎯 When to Use Which Endpoint?

| Scenario | Use Endpoint | Why |
|----------|-------------|-----|
| First-time user | `/signup` | Collect user details upfront |
| Returning user | `/verify-otp` | Quick login |
| User exists but tries signup | `/signup` → Error → `/verify-otp` | Graceful fallback |

---

## 🔄 Complete Mobile App Flow

```
┌─────────────────────────────────────┐
│         Welcome Screen              │
│                                     │
│   ┌──────────────┐ ┌─────────────┐│
│   │  📝 SIGN UP  │ │  🔑 LOGIN   ││
│   │  (Primary)   │ │ (Secondary) ││
│   └──────────────┘ └─────────────┘│
└─────────────────────────────────────┘
         ↓                    ↓
         ↓                    ↓
    SIGNUP FLOW          LOGIN FLOW
         ↓                    ↓
  1. Enter Phone        1. Enter Phone
  2. Enter OTP          2. Enter OTP
  3. Fill Form          3. Done!
     (Name, Email)
  4. Done!
```

---

## 📝 Implementation Examples

### React Native / Expo

```typescript
// Signup Flow
const handleSignup = async () => {
  try {
    // Step 1: Send OTP
    await sendOTP(phone);
    
    // Step 2: User enters OTP
    const otp = await getOTPFromUser();
    
    // Step 3: Signup with details
    const response = await fetch('/api/v1/mobile/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        otp,
        name: userName,
        email: userEmail,
        avatar: userAvatar
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Save tokens
      await AsyncStorage.setItem('accessToken', data.data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Navigate to home
      navigation.navigate('Home');
    }
  } catch (error) {
    if (error.message.includes('already exists')) {
      // User exists, switch to login
      handleLogin();
    }
  }
};

// Login Flow
const handleLogin = async () => {
  try {
    // Step 1: Send OTP
    await sendOTP(phone);
    
    // Step 2: User enters OTP
    const otp = await getOTPFromUser();
    
    // Step 3: Verify OTP
    const response = await fetch('/api/v1/mobile/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Save tokens
      await AsyncStorage.setItem('accessToken', data.data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Check if profile is complete
      if (data.data.isNewUser || !data.data.user.name) {
        navigation.navigate('CompleteProfile');
      } else {
        navigation.navigate('Home');
      }
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

---

## 🧪 Testing with Postman

### Import Collection
1. Import `Locomate_Mobile.postman_collection.json`
2. Collection has 5 authentication endpoints in correct order

### Test Signup Flow
1. Run **"1. Send OTP"** - OTP auto-saves to variable
2. Run **"2. Signup (New Users)"** - Tokens auto-save
3. ✅ You're logged in!

### Test Login Flow
1. Run **"1. Send OTP"** - OTP auto-saves
2. Run **"3. Login (Existing Users)"** - Tokens auto-save
3. ✅ You're logged in!

---

## 🔒 Security Best Practices

1. **OTP Expiry:** OTP expires in 5 minutes
2. **Token Expiry:** 
   - Access Token: 15 minutes
   - Refresh Token: 7 days
3. **Rate Limiting:** Implemented on all endpoints
4. **HTTPS Only:** Use HTTPS in production
5. **Secure Storage:** Store tokens in secure storage (Keychain/Keystore)

---

## ❌ Error Handling

### Common Errors

**Invalid OTP:**
```json
{
  "success": false,
  "message": "Signup failed",
  "error": "Invalid or expired OTP"
}
```
**Action:** Ask user to re-enter OTP or resend

**User Already Exists:**
```json
{
  "success": false,
  "message": "Signup failed",
  "error": "User already exists. Please login instead."
}
```
**Action:** Redirect to login flow

**Validation Error:**
```json
{
  "success": false,
  "message": "Signup failed",
  "error": "Name must be at least 2 characters"
}
```
**Action:** Show validation message to user

---

## 📚 Additional Resources

- **Complete Guide:** `SIGNUP_API_GUIDE.md`
- **Flow Diagram:** `AUTH_FLOW_DIAGRAM.md`
- **API Reference:** `API_ENDPOINTS.txt`
- **Postman Guide:** `POSTMAN_IMPORT_GUIDE.md`

---

## 🎊 Summary

✅ **Signup First** - For new users with complete profile  
✅ **Login Second** - For existing users  
✅ **OTP Based** - Secure phone verification  
✅ **JWT Tokens** - Stateless authentication  
✅ **Auto-save** - Postman auto-saves tokens  

**Order:** Send OTP → Signup (new) / Login (existing) → Logged In

Happy Coding! 🚀
