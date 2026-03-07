# ✅ Correct Authentication Flow

## 🎯 Aapka Flow (Implemented)

### Step-by-Step Process:

```
┌─────────────────────────────────────────────────────────────┐
│  Step 1: User enters phone number                           │
│          +1234567890                                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 2: Check if user exists                               │
│          POST /check-user                                    │
│          Body: { "phone": "+1234567890" }                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
              ┌───────────────────────┐
              │  Response received    │
              └───────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ exists: true      │           │ exists: false     │
│ (User found)      │           │ (New user)        │
└───────────────────┘           └───────────────────┘
        ↓                                   ↓
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ LOGIN FLOW        │           │ SIGNUP FLOW       │
└───────────────────┘           └───────────────────┘
        ↓                                   ↓
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ Send OTP          │           │ Send OTP          │
│ POST /send-otp    │           │ POST /send-otp    │
└───────────────────┘           └───────────────────┘
        ↓                                   ↓
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ Enter OTP         │           │ Enter OTP         │
│ 1 2 3 4 5 6       │           │ 1 2 3 4 5 6       │
└───────────────────┘           └───────────────────┘
        ↓                                   ↓
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ Verify OTP        │           │ Fill Details      │
│ POST /verify-otp  │           │ Name: John Doe    │
│                   │           │ Email: (optional) │
│ Response:         │           │ Avatar: (optional)│
│ - accessToken     │           └───────────────────┘
│ - refreshToken    │                     ↓
│ - user            │                     ↓
└───────────────────┘           ┌───────────────────┐
        ↓                       │ Submit Signup     │
        ↓                       │ POST /signup      │
┌───────────────────┐           │                   │
│ ✅ LOGGED IN      │           │ Response:         │
│ Go to Home        │           │ - accessToken     │
└───────────────────┘           │ - refreshToken    │
                                │ - user            │
                                └───────────────────┘
                                          ↓
                                          ↓
                                ┌───────────────────┐
                                │ ✅ LOGGED IN      │
                                │ Go to Home        │
                                └───────────────────┘
```

---

## 📱 API Endpoints (In Order)

### 1. Check User Exists
```bash
POST /api/v1/mobile/auth/check-user
Body: { "phone": "+1234567890" }

Response (User Exists):
{
  "success": true,
  "data": {
    "exists": true,
    "user": {
      "id": "uuid",
      "phone": "+1234567890",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}

Response (User Not Exists):
{
  "success": true,
  "data": {
    "exists": false
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
    "otp": "123456"  // Only in development
  }
}
```

### 3a. Signup (If exists: false)
```bash
POST /api/v1/mobile/auth/signup
Body: {
  "phone": "+1234567890",
  "otp": "123456",
  "name": "John Doe",
  "email": "john@example.com",  // optional
  "avatar": "https://..."       // optional
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
  }
}
```

### 3b. Login (If exists: true)
```bash
POST /api/v1/mobile/auth/verify-otp
Body: {
  "phone": "+1234567890",
  "otp": "123456"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... },
    "isNewUser": false
  }
}
```

---

## 💻 Mobile App Implementation

```typescript
// Step 1: User enters phone
const phone = await getPhoneFromUser();

// Step 2: Check if user exists
const checkResponse = await fetch('/api/v1/mobile/auth/check-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone })
});

const checkData = await checkResponse.json();

// Step 3: Send OTP
await fetch('/api/v1/mobile/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone })
});

// Step 4: Get OTP from user
const otp = await getOTPFromUser();

// Step 5: Branch based on user existence
if (checkData.data.exists) {
  // LOGIN FLOW - User exists
  const loginResponse = await fetch('/api/v1/mobile/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  
  const loginData = await loginResponse.json();
  
  if (loginData.success) {
    await saveTokens(loginData.data.accessToken, loginData.data.refreshToken);
    navigateToHome();
  }
  
} else {
  // SIGNUP FLOW - New user
  // Show signup form
  const { name, email, avatar } = await getSignupDetails();
  
  const signupResponse = await fetch('/api/v1/mobile/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp, name, email, avatar })
  });
  
  const signupData = await signupResponse.json();
  
  if (signupData.success) {
    await saveTokens(signupData.data.accessToken, signupData.data.refreshToken);
    navigateToHome();
  }
}
```

---

## 🧪 Testing with Postman

### Test Login Flow (Existing User):

1. **Check User**
   - Run "1. Check User Exists"
   - Response: `exists: true`

2. **Send OTP**
   - Run "2. Send OTP"
   - OTP auto-saves

3. **Login**
   - Run "4. Login (Existing Users)"
   - Tokens auto-save
   - ✅ Logged in!

### Test Signup Flow (New User):

1. **Check User**
   - Run "1. Check User Exists"
   - Change phone to new number
   - Response: `exists: false`

2. **Send OTP**
   - Run "2. Send OTP"
   - OTP auto-saves

3. **Signup**
   - Run "3. Signup (New Users)"
   - Fill name, email, avatar
   - Tokens auto-save
   - ✅ Logged in!

---

## 📊 Flow Comparison

| Step | Login Flow | Signup Flow |
|------|-----------|-------------|
| 1 | Enter phone | Enter phone |
| 2 | Check user (exists: true) | Check user (exists: false) |
| 3 | Send OTP | Send OTP |
| 4 | Enter OTP | Enter OTP |
| 5 | Verify OTP → Login | Fill details → Signup |
| 6 | ✅ Home | ✅ Home |

---

## ✅ Summary

**Your Flow is Now Implemented:**

1. ✅ Check user exists first
2. ✅ If exists → Login flow (OTP → Verify)
3. ✅ If not exists → Signup flow (OTP → Details → Signup)
4. ✅ Login and Signup are separate
5. ✅ Clear distinction between flows

**Endpoints:**
- `POST /check-user` - Check if user exists
- `POST /send-otp` - Send OTP
- `POST /signup` - Signup (new users)
- `POST /verify-otp` - Login (existing users)

**Postman Collection:**
- 6 Authentication APIs
- Correct order maintained
- Auto-save features included

Perfect! 🎉
