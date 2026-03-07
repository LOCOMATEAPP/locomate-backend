# 🔐 Authentication Flow Diagram

## Complete Flow (Signup First, Then Login)

```
┌─────────────────────────────────────────────────────────────┐
│                     USER OPENS APP                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  WELCOME SCREEN                             │
│                                                             │
│         ┌──────────────────┐  ┌──────────────────┐        │
│         │   📝 SIGN UP     │  │   🔑 LOGIN       │        │
│         │  (New Users)     │  │ (Existing Users) │        │
│         └──────────────────┘  └──────────────────┘        │
└─────────────────────────────────────────────────────────────┘
              ↓                           ↓
              ↓                           ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│   SIGNUP FLOW           │   │   LOGIN FLOW            │
│   (New Users)           │   │   (Existing Users)      │
└─────────────────────────┘   └─────────────────────────┘
              ↓                           ↓
              ↓                           ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│ 1. Enter Phone Number   │   │ 1. Enter Phone Number   │
│    +1234567890          │   │    +1234567890          │
└─────────────────────────┘   └─────────────────────────┘
              ↓                           ↓
              ↓                           ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│ 2. Send OTP             │   │ 2. Send OTP             │
│    POST /send-otp       │   │    POST /send-otp       │
└─────────────────────────┘   └─────────────────────────┘
              ↓                           ↓
              ↓                           ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│ 3. Enter OTP            │   │ 3. Enter OTP            │
│    123456               │   │    123456               │
└─────────────────────────┘   └─────────────────────────┘
              ↓                           ↓
              ↓                           ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│ 4. Fill Signup Form     │   │ 4. Verify OTP           │
│    Name: John Doe       │   │    POST /verify-otp     │
│    Email: john@...      │   │                         │
│    Avatar: (optional)   │   │    Response:            │
└─────────────────────────┘   │    - accessToken        │
              ↓               │    - refreshToken       │
              ↓               │    - user               │
┌─────────────────────────┐   │    - isNewUser: false   │
│ 5. Submit Signup        │   └─────────────────────────┘
│    POST /signup         │               ↓
│                         │               ↓
│    Response:            │   ┌─────────────────────────┐
│    - accessToken        │   │ ✅ LOGGED IN            │
│    - refreshToken       │   │    Navigate to Home     │
│    - user (complete)    │   └─────────────────────────┘
└─────────────────────────┘
              ↓
              ↓
┌─────────────────────────┐
│ ✅ LOGGED IN            │
│    Navigate to Home     │
└─────────────────────────┘
```

---

## API Endpoints Order

### 1️⃣ Send OTP (Common for both)
```
POST /api/v1/mobile/auth/send-otp
Body: { "phone": "+1234567890" }
```

### 2️⃣ Signup (New Users - Use This First)
```
POST /api/v1/mobile/auth/signup
Body: {
  "phone": "+1234567890",
  "otp": "123456",
  "name": "John Doe",
  "email": "john@example.com",  // optional
  "avatar": "https://..."       // optional
}
```

### 3️⃣ Login (Existing Users)
```
POST /api/v1/mobile/auth/verify-otp
Body: {
  "phone": "+1234567890",
  "otp": "123456"
}
```

---

## Decision Tree

```
User Opens App
    ↓
Is user new?
    ↓
    ├─ YES (New User)
    │   ↓
    │   Show "Sign Up" button prominently
    │   ↓
    │   User clicks Sign Up
    │   ↓
    │   Enter Phone → Send OTP → Enter OTP
    │   ↓
    │   Show Signup Form (Name, Email, Avatar)
    │   ↓
    │   Call POST /signup
    │   ↓
    │   ✅ Logged In with complete profile
    │
    └─ NO (Existing User)
        ↓
        Show "Login" button
        ↓
        User clicks Login
        ↓
        Enter Phone → Send OTP → Enter OTP
        ↓
        Call POST /verify-otp
        ↓
        ✅ Logged In
```

---

## Error Handling

```
User tries to Signup
    ↓
POST /signup
    ↓
    ├─ Success (201)
    │   ↓
    │   Save tokens
    │   ↓
    │   Navigate to Home
    │
    ├─ Error: "User already exists"
    │   ↓
    │   Show message: "You already have an account!"
    │   ↓
    │   Redirect to Login
    │   ↓
    │   Call POST /verify-otp
    │   ↓
    │   ✅ Logged In
    │
    └─ Error: "Invalid OTP"
        ↓
        Show error message
        ↓
        Allow user to:
        - Re-enter OTP
        - Resend OTP
```

---

## Postman Collection Order

```
📁 Authentication
  ├─ 1. Send OTP
  ├─ 2. Signup (New Users)        ← Use this FIRST for new users
  ├─ 3. Login (Existing Users)    ← Use this for returning users
  ├─ 4. Refresh Token
  └─ 5. Logout
```

---

## Mobile App Screens Flow

```
Screen 1: Welcome/Splash
    ↓
Screen 2: Auth Choice
    ├─ "New here? Sign Up" (Primary button)
    └─ "Already have account? Login" (Secondary button)
    ↓
    ├─ If Signup clicked:
    │   ↓
    │   Screen 3a: Enter Phone
    │   ↓
    │   Screen 4a: Enter OTP
    │   ↓
    │   Screen 5a: Signup Form (Name, Email, Avatar)
    │   ↓
    │   API: POST /signup
    │   ↓
    │   Screen 6: Home (Logged In)
    │
    └─ If Login clicked:
        ↓
        Screen 3b: Enter Phone
        ↓
        Screen 4b: Enter OTP
        ↓
        API: POST /verify-otp
        ↓
        Screen 5: Home (Logged In)
```

---

## Best Practices

1. **Show Signup First**: Make signup more prominent for new users
2. **Clear Distinction**: Separate buttons for "Sign Up" vs "Login"
3. **Error Handling**: If signup fails with "user exists", auto-switch to login
4. **Profile Completion**: For login, check `isNewUser` flag and prompt profile completion
5. **Token Storage**: Securely store tokens after successful auth
6. **Auto-login**: Use refresh token for seamless re-authentication

---

## Summary

✅ **Signup comes FIRST** - for new users to create account with details  
✅ **Login comes SECOND** - for existing users to access their account  
✅ **Both use OTP** - same OTP flow, different endpoints  
✅ **Clear separation** - better UX and data collection  

Happy Coding! 🚀
