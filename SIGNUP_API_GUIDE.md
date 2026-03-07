# 🎉 Signup API - Complete Guide

## ✅ Authentication Flow (Correct Order)

### For New Users (Signup First):
```
1. Send OTP
   ↓
2. Signup (with name, email)
   ↓
3. ✅ Logged In with complete profile
```

### For Existing Users (Login):
```
1. Send OTP
   ↓
2. Login (Verify OTP)
   ↓
3. ✅ Logged In
```

---

## 🆕 Signup API (Use This First for New Users)

### Request

**Endpoint:** `POST /api/v1/mobile/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456",
  "name": "John Doe",           // Required
  "email": "john@example.com",  // Optional
  "avatar": "https://..."       // Optional
}
```

### Response (201 Created)

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
      "avatar": "https://..."
    }
  },
  "error": null
}
```

### Validation Rules

- **phone**: Valid international format (+1234567890)
- **otp**: Exactly 6 digits
- **name**: 2-100 characters (required)
- **email**: Valid email format (optional)
- **avatar**: Valid URL (optional)

### Error Responses

**Invalid OTP:**
```json
{
  "success": false,
  "message": "Signup failed",
  "error": "Invalid or expired OTP"
}
```

**User Already Exists:**
```json
{
  "success": false,
  "message": "Signup failed",
  "error": "User already exists. Please login instead."
}
```

---

## 🔄 Updated Verify OTP API

Ab `verify-otp` endpoint ek naya field return karta hai:

### Response
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {...},
    "isNewUser": false  // ← New field
  }
}
```

**isNewUser:**
- `true` - User pehli baar login kar raha hai (profile incomplete ho sakta hai)
- `false` - Existing user hai

---

## 📱 Mobile App Implementation Guide

### Recommended Flow (Signup First, Then Login):

```typescript
// Step 1: Send OTP
const otpResponse = await sendOTP(phone);

// Step 2: User enters OTP
const otp = getUserInput();

// Step 3: Check if user is new or existing
// Option A: Ask user "New here? Signup" or "Already have account? Login"

// For NEW USERS - Show Signup Form First
if (userClickedSignup) {
  const signupData = {
    phone,
    otp,
    name: "User's Name",      // Required
    email: "user@email.com",  // Optional
    avatar: "https://..."     // Optional
  };
  
  const response = await signup(signupData);
  // ✅ User is now logged in with complete profile
  navigateToHome();
}

// For EXISTING USERS - Direct Login
if (userClickedLogin) {
  const response = await verifyOTP(phone, otp);
  // ✅ User is logged in
  navigateToHome();
}
```

### Alternative: Auto-detect Flow

```typescript
// Try signup first, if user exists, show login option
try {
  const response = await signup({ phone, otp, name, email });
  // ✅ Signup successful
  navigateToHome();
} catch (error) {
  if (error.message.includes('already exists')) {
    // User exists, use login instead
    const response = await verifyOTP(phone, otp);
    navigateToHome();
  }
}
```

---

## 🎯 Use Cases

### Use Case 1: Signup First (Recommended)
**Best for:** Clear separation between new and existing users

```
Screen 1: Welcome
  - "New User? Sign Up" button
  - "Already have account? Login" button

If Signup clicked:
  1. User enters phone
  2. Receives OTP
  3. Enters OTP
  4. Fills signup form (name, email, avatar)
  5. Calls /signup endpoint
  6. ✅ Logged in with complete profile

If Login clicked:
  1. User enters phone
  2. Receives OTP
  3. Enters OTP
  4. Calls /verify-otp endpoint
  5. ✅ Logged in
```

### Use Case 2: Auto-detect
**Best for:** Seamless experience

```
1. User enters phone
2. Receives OTP
3. Enters OTP
4. Try signup first
   - If success → ✅ Logged in
   - If "user exists" error → Call login instead
5. ✅ Logged in
```

---

## 🔧 Testing

### Test Signup (Postman/cURL)

```bash
# 1. Send OTP
curl -X POST http://localhost:3000/api/v1/mobile/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'

# 2. Signup (use OTP from response)
curl -X POST http://localhost:3000/api/v1/mobile/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890",
    "otp": "123456",
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Test with Postman Collection

1. Import `Locomate_Mobile.postman_collection.json`
2. Run "1. Send OTP" (OTP auto-saves)
3. Run "2. Signup (New Users)"
4. Tokens automatically saved!

---

## 📊 Comparison

| Feature | Signup API | Login API (Verify OTP) |
|---------|-----------|------------------------|
| **Order** | Use FIRST for new users | Use for existing users |
| **Use Case** | First-time registration | Returning users |
| **Required Fields** | phone, otp, name | phone, otp |
| **Optional Fields** | email, avatar | - |
| **Creates User** | Yes (with details) | Yes (if not exists, minimal) |
| **Returns** | Tokens + complete user | Tokens + user + isNewUser |
| **Error if exists** | Yes ("already exists") | No (logs in) |
| **Best For** | Complete profile upfront | Quick access |

---

## 🚀 Migration Guide

### For Existing Apps:

**No breaking changes!** Purana flow (`verify-otp`) abhi bhi kaam karega.

**To add signup:**
1. Update Postman collection (already done)
2. Mobile app mein signup screen add karein
3. Signup API call karein with user details
4. Done!

---

## 💡 Best Practices

1. **Validate on Frontend:**
   - Name: 2-100 characters
   - Email: Valid format
   - Avatar: Valid URL

2. **Handle Errors:**
   - OTP expired → Ask to resend
   - User exists → Redirect to login
   - Network error → Show retry

3. **UX Tips:**
   - Make email optional for faster signup
   - Allow profile completion later
   - Show profile completion progress

4. **Security:**
   - Never store OTP on device
   - Clear OTP input after use
   - Implement rate limiting on frontend

---

## 📝 Updated Files

1. ✅ `src/modules/mobile/auth/schema.ts` - Added signupSchema
2. ✅ `src/modules/mobile/auth/repository.ts` - Added createUserWithDetails
3. ✅ `src/modules/mobile/auth/service.ts` - Added signup method
4. ✅ `src/modules/mobile/auth/controller.ts` - Added signup controller
5. ✅ `src/modules/mobile/auth/routes.ts` - Added /signup route
6. ✅ `Locomate_Mobile.postman_collection.json` - Added signup request
7. ✅ `API_ENDPOINTS.txt` - Updated with signup example

---

## 🎊 Summary

Ab aapke app mein proper signup flow hai jahan users apna naam aur email provide kar sakte hain registration ke time pe!

**New Users:** Send OTP → Signup (with details) → Logged In  
**Existing Users:** Send OTP → Verify OTP → Logged In

Happy Coding! 🚀
