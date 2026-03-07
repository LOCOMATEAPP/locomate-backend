# ✅ Final Authentication Flow (As Per Screens)

## 🎯 Correct Implementation

### Login Flow (Existing Users):
```
1. Check User → exists: true
2. Send OTP
3. Verify OTP (Login API)
   ↓
   ✅ Returns: accessToken, refreshToken, user
   ✅ Login Successful
```

### Signup Flow (New Users):
```
1. Check User → exists: false
2. Send OTP
3. Fill Details (Name, Email, Avatar)
4. Submit Signup
   ↓
   ✅ Returns: accessToken, refreshToken, user
   ✅ User Created & Logged In
```

---

## 📱 API Endpoints

### 1. Check User Exists
```bash
POST /api/v1/mobile/auth/check-user
Body: { "phone": "+1234567890" }

Response:
{
  "success": true,
  "data": {
    "exists": true/false,
    "user": {...}  // Only if exists
  }
}
```

### 2. Send OTP
```bash
POST /api/v1/mobile/auth/send-otp
Body: { "phone": "+1234567890" }

Response:
{
  "success": true,
  "data": {
    "message": "OTP sent successfully",
    "otp": "123456"  // Dev mode only
  }
}
```

### 3a. Login (Existing Users Only)
```bash
POST /api/v1/mobile/auth/verify-otp
Body: {
  "phone": "+1234567890",
  "otp": "123456"
}

Success Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "...",
      "phone": "+1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "..."
    }
  }
}

Error Response (User Not Found):
{
  "success": false,
  "message": "Login failed",
  "error": "User not found. Please signup first."
}
```

### 3b. Signup (New Users Only)
```bash
POST /api/v1/mobile/auth/signup
Body: {
  "phone": "+1234567890",
  "otp": "123456",
  "name": "John Doe",
  "email": "john@example.com",  // optional
  "avatar": "https://..."       // optional
}

Success Response:
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "...",
      "phone": "+1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "..."
    }
  }
}

Error Response (User Exists):
{
  "success": false,
  "message": "Signup failed",
  "error": "User already exists. Please login instead."
}
```

---

## 🔄 Complete Flow Diagram

```
User Opens App
    ↓
Enter Phone Number
    ↓
POST /check-user
    ↓
    ├─────────────────────┬─────────────────────┐
    ↓                     ↓                     ↓
exists: true        exists: false         Error
    ↓                     ↓                     ↓
LOGIN FLOW          SIGNUP FLOW          Show Error
    ↓                     ↓
    ↓                     ↓
POST /send-otp      POST /send-otp
    ↓                     ↓
Enter OTP           Enter OTP
    ↓                     ↓
    ↓               Fill Details:
    ↓               - Name (required)
    ↓               - Email (optional)
    ↓               - Avatar (optional)
    ↓                     ↓
POST /verify-otp    POST /signup
    ↓                     ↓
    ├─────────────────────┤
    ↓                     ↓
Success?            Success?
    ↓                     ↓
    ├─────────────────────┤
    ↓                     ↓
Save Tokens         Save Tokens
    ↓                     ↓
✅ Navigate to Home
```

---

## 💻 Mobile App Implementation

```typescript
// Step 1: Check if user exists
const checkUser = async (phone: string) => {
  const response = await fetch('/api/v1/mobile/auth/check-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};

// Step 2: Send OTP
const sendOTP = async (phone: string) => {
  const response = await fetch('/api/v1/mobile/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};

// Step 3a: Login (existing users)
const login = async (phone: string, otp: string) => {
  const response = await fetch('/api/v1/mobile/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  return response.json();
};

// Step 3b: Signup (new users)
const signup = async (phone: string, otp: string, name: string, email?: string, avatar?: string) => {
  const response = await fetch('/api/v1/mobile/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp, name, email, avatar })
  });
  return response.json();
};

// Complete Flow
const handleAuth = async () => {
  try {
    // Get phone from user
    const phone = await getPhoneInput();
    
    // Check if user exists
    const checkResult = await checkUser(phone);
    
    // Send OTP
    await sendOTP(phone);
    
    // Get OTP from user
    const otp = await getOTPInput();
    
    if (checkResult.data.exists) {
      // LOGIN FLOW
      const loginResult = await login(phone, otp);
      
      if (loginResult.success) {
        await saveTokens(loginResult.data.accessToken, loginResult.data.refreshToken);
        navigateToHome();
      } else {
        showError(loginResult.error);
      }
      
    } else {
      // SIGNUP FLOW
      // Show signup form
      const { name, email, avatar } = await getSignupForm();
      
      const signupResult = await signup(phone, otp, name, email, avatar);
      
      if (signupResult.success) {
        await saveTokens(signupResult.data.accessToken, signupResult.data.refreshToken);
        navigateToHome();
      } else {
        showError(signupResult.error);
      }
    }
    
  } catch (error) {
    showError(error.message);
  }
};
```

---

## 🎯 Key Points

### Login API (`/verify-otp`):
- ✅ Only for EXISTING users
- ✅ Verifies OTP
- ✅ Returns tokens + user data
- ❌ Does NOT create new users
- ❌ Throws error if user not found

### Signup API (`/signup`):
- ✅ Only for NEW users
- ✅ Verifies OTP
- ✅ Creates user with details
- ✅ Returns tokens + user data
- ❌ Throws error if user already exists

### Check User API (`/check-user`):
- ✅ Checks if phone number is registered
- ✅ Returns user data if exists
- ✅ Use BEFORE sending OTP
- ✅ Determines which flow to use

---

## 📊 API Behavior Summary

| API | User Exists? | Action | Returns |
|-----|-------------|--------|---------|
| `/check-user` | Yes | Return user info | `exists: true, user: {...}` |
| `/check-user` | No | Return false | `exists: false` |
| `/send-otp` | Any | Send OTP | `otp: "123456"` |
| `/verify-otp` (Login) | Yes | Login | `tokens + user` |
| `/verify-otp` (Login) | No | ❌ Error | `"User not found"` |
| `/signup` | No | Create user | `tokens + user` |
| `/signup` | Yes | ❌ Error | `"User already exists"` |

---

## ✅ Summary

**Perfect Implementation:**

1. ✅ Login API - Sirf existing users ke liye
2. ✅ Signup API - Sirf new users ke liye
3. ✅ Check User API - Pehle check karo
4. ✅ Clear separation - No confusion
5. ✅ Proper error messages

**Flow:**
- Check user → Send OTP → Login/Signup based on exists flag

**Screens match:**
- Login screen → verify-otp API
- Signup screen → signup API
- Both return tokens for authentication

Perfect! 🎉
