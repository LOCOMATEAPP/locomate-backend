# ✅ Updated Authentication Flow

## 🎯 Clear Separation

### Signup API - Only Creates User (No Login)
```
POST /api/v1/mobile/auth/signup
Body: {
  "phone": "+1234567890",
  "name": "John Doe",
  "avatar": "https://...",  // optional
  "gender": "male",         // optional: male, female, other
  "dob": "1990-01-15"       // optional: ISO date
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "uuid",
      "phone": "+1234567890",
      "name": "John Doe",
      "avatar": "https://...",
      "gender": "male",
      "dob": "1990-01-15T00:00:00.000Z"
    }
  }
}

Note: NO tokens returned, NO OTP verification
```

### Login API - Verifies OTP & Returns Tokens
```
POST /api/v1/mobile/auth/verify-otp
Body: {
  "phone": "+1234567890",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "uuid",
      "phone": "+1234567890",
      "name": "John Doe",
      "avatar": "https://...",
      "gender": "male",
      "dob": "1990-01-15T00:00:00.000Z"
    }
  }
}
```

---

## 🔄 Complete Flow

### New User Flow (Signup + Login):
```
1. Check User
   POST /check-user
   Response: { "exists": false }
   
2. Signup (Create User)
   POST /signup
   Body: { phone, name, avatar, gender, dob }
   Response: { "user": {...} }  ← No tokens!
   
3. Send OTP
   POST /send-otp
   Body: { phone }
   Response: { "otp": "123456" }
   
4. Login (Verify OTP)
   POST /verify-otp
   Body: { phone, otp }
   Response: { "accessToken", "refreshToken", "user" }
   
✅ User Created & Logged In
```

### Existing User Flow (Login Only):
```
1. Check User
   POST /check-user
   Response: { "exists": true, "user": {...} }
   
2. Send OTP
   POST /send-otp
   Body: { phone }
   Response: { "otp": "123456" }
   
3. Login (Verify OTP)
   POST /verify-otp
   Body: { phone, otp }
   Response: { "accessToken", "refreshToken", "user" }
   
✅ Logged In
```

---

## 📱 Mobile App Implementation

```typescript
// New User Signup + Login
const handleNewUser = async (phone: string) => {
  try {
    // Step 1: Create user account
    const signupData = {
      phone,
      name: "John Doe",
      avatar: "https://...",
      gender: "male",
      dob: "1990-01-15"
    };
    
    const signupResponse = await fetch('/api/v1/mobile/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData)
    });
    
    const signupResult = await signupResponse.json();
    
    if (!signupResult.success) {
      throw new Error(signupResult.error);
    }
    
    console.log('User created:', signupResult.data.user);
    
    // Step 2: Send OTP for login
    await fetch('/api/v1/mobile/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    
    // Step 3: Get OTP from user
    const otp = await getOTPInput();
    
    // Step 4: Login
    const loginResponse = await fetch('/api/v1/mobile/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    
    const loginResult = await loginResponse.json();
    
    if (loginResult.success) {
      await saveTokens(loginResult.data.accessToken, loginResult.data.refreshToken);
      navigateToHome();
    }
    
  } catch (error) {
    showError(error.message);
  }
};

// Existing User Login
const handleExistingUser = async (phone: string) => {
  try {
    // Step 1: Send OTP
    await fetch('/api/v1/mobile/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    
    // Step 2: Get OTP from user
    const otp = await getOTPInput();
    
    // Step 3: Login
    const loginResponse = await fetch('/api/v1/mobile/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    
    const loginResult = await loginResponse.json();
    
    if (loginResult.success) {
      await saveTokens(loginResult.data.accessToken, loginResult.data.refreshToken);
      navigateToHome();
    }
    
  } catch (error) {
    showError(error.message);
  }
};
```

---

## 📊 API Summary

| API | Purpose | Input | Output | OTP? |
|-----|---------|-------|--------|------|
| `/check-user` | Check if user exists | phone | exists: true/false | No |
| `/send-otp` | Send OTP to phone | phone | otp (dev mode) | Sends OTP |
| `/signup` | Create new user | phone, name, avatar, gender, dob | user | No |
| `/verify-otp` | Login user | phone, otp | tokens + user | Verifies OTP |

---

## 🎯 Key Changes

### Before:
- ❌ Signup verified OTP and returned tokens
- ❌ Signup had email field
- ❌ Confusing - signup did both create + login

### After:
- ✅ Signup only creates user (no OTP, no tokens)
- ✅ Signup has: name, avatar, gender, dob
- ✅ Clear separation: Signup = Create, Login = Authenticate
- ✅ New users: Signup → Login
- ✅ Existing users: Login only

---

## 🧪 Testing

### Test Signup (Postman):
```
1. Run "1. Check User Exists"
   - Change phone to new number
   - Response: exists: false

2. Run "3. Signup (New Users)"
   - Fill: phone, name, avatar, gender, dob
   - Response: user created (no tokens)

3. Run "2. Send OTP"
   - OTP auto-saves

4. Run "4. Login (Existing Users)"
   - Tokens auto-save
   - ✅ Logged in!
```

### Test Login (Postman):
```
1. Run "1. Check User Exists"
   - Response: exists: true

2. Run "2. Send OTP"
   - OTP auto-saves

3. Run "4. Login (Existing Users)"
   - Tokens auto-save
   - ✅ Logged in!
```

---

## ✅ Summary

**Signup API:**
- ✅ Only creates user
- ✅ Fields: phone, name, avatar, gender, dob
- ✅ No OTP verification
- ✅ No tokens returned
- ✅ Returns user object only

**Login API:**
- ✅ Verifies OTP
- ✅ Returns tokens + user
- ✅ Only for existing users
- ✅ Throws error if user not found

**Flow:**
- New User: Signup → Send OTP → Login
- Existing User: Send OTP → Login

Perfect separation! 🎉
