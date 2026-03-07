# 🔐 Recommended Authentication Flow

## ✅ Simple & Natural Flow (Best Practice)

### User Journey:
```
User Opens App
    ↓
Enter Phone Number
    ↓
Receive & Enter OTP
    ↓
System Auto-detects:
    ├─ User Exists? → Login (Profile Complete) ✅
    └─ New User? → Login + Prompt "Complete Profile" ✅
```

---

## 🎯 Implementation (Recommended)

### Single Endpoint Approach - Use `verify-otp` for Everything

```typescript
// Step 1: Send OTP
const sendOTP = async (phone: string) => {
  const response = await fetch('/api/v1/mobile/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};

// Step 2: Verify OTP (handles both new and existing users)
const verifyOTP = async (phone: string, otp: string) => {
  const response = await fetch('/api/v1/mobile/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Save tokens
    await saveTokens(data.data.accessToken, data.data.refreshToken);
    
    // Check if profile is complete
    if (data.data.isNewUser || !data.data.user.name) {
      // New user or incomplete profile
      // Show "Complete Your Profile" screen
      navigation.navigate('CompleteProfile');
    } else {
      // Existing user with complete profile
      // Go to home
      navigation.navigate('Home');
    }
  }
};
```

---

## 📱 Mobile App Screens

### Screen 1: Welcome
```
┌─────────────────────────────┐
│                             │
│      LOCOMATE               │
│      🏢                     │
│                             │
│   Navigate Malls Easily     │
│                             │
│   ┌─────────────────────┐  │
│   │  Enter Phone Number │  │
│   │  +1234567890        │  │
│   └─────────────────────┘  │
│                             │
│   ┌─────────────────────┐  │
│   │   Continue →        │  │
│   └─────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Screen 2: OTP Verification
```
┌─────────────────────────────┐
│                             │
│   Enter OTP                 │
│   Sent to +1234567890       │
│                             │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│   │ 1 │ │ 2 │ │ 3 │ │ 4 │ │
│   └───┘ └───┘ └───┘ └───┘ │
│   ┌───┐ ┌───┐              │
│   │ 5 │ │ 6 │              │
│   └───┘ └───┘              │
│                             │
│   Didn't receive?           │
│   Resend OTP                │
│                             │
│   ┌─────────────────────┐  │
│   │   Verify →          │  │
│   └─────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Screen 3a: Complete Profile (New Users)
```
┌─────────────────────────────┐
│                             │
│   Complete Your Profile     │
│                             │
│   ┌─────────────────────┐  │
│   │  Name *             │  │
│   │  John Doe           │  │
│   └─────────────────────┘  │
│                             │
│   ┌─────────────────────┐  │
│   │  Email (optional)   │  │
│   │  john@example.com   │  │
│   └─────────────────────┘  │
│                             │
│   ┌─────────────────────┐  │
│   │  📷 Add Photo       │  │
│   └─────────────────────┘  │
│                             │
│   ┌─────────────────────┐  │
│   │   Save & Continue → │  │
│   └─────────────────────┘  │
│                             │
│   Skip for now              │
│                             │
└─────────────────────────────┘
```

### Screen 3b: Home (Existing Users)
```
┌─────────────────────────────┐
│                             │
│   Welcome back, John! 👋    │
│                             │
│   [Nearby Malls]            │
│   [Active Offers]           │
│   [Your Rewards]            │
│                             │
└─────────────────────────────┘
```

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER OPENS APP                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              ENTER PHONE NUMBER SCREEN                  │
│                  +1234567890                            │
└─────────────────────────────────────────────────────────┘
                          ↓
                  POST /send-otp
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 ENTER OTP SCREEN                        │
│                    1 2 3 4 5 6                          │
└─────────────────────────────────────────────────────────┘
                          ↓
                POST /verify-otp
                          ↓
              ┌───────────────────────┐
              │  System Auto-detects  │
              └───────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│  isNewUser: true  │           │ isNewUser: false  │
│  OR                │           │ AND               │
│  name is null     │           │ name exists       │
└───────────────────┘           └───────────────────┘
        ↓                                   ↓
┌───────────────────┐           ┌───────────────────┐
│ COMPLETE PROFILE  │           │   HOME SCREEN     │
│     SCREEN        │           │   (Logged In)     │
│                   │           └───────────────────┘
│ - Enter Name      │
│ - Enter Email     │
│ - Add Avatar      │
│                   │
│ [Save] [Skip]     │
└───────────────────┘
        ↓
┌───────────────────┐
│   HOME SCREEN     │
│   (Logged In)     │
└───────────────────┘
```

---

## 📝 API Endpoints Usage

### Primary Flow (Use This):

**1. Send OTP**
```bash
POST /api/v1/mobile/auth/send-otp
Body: { "phone": "+1234567890" }
```

**2. Verify OTP (Auto-handles new & existing users)**
```bash
POST /api/v1/mobile/auth/verify-otp
Body: { "phone": "+1234567890", "otp": "123456" }

Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "phone": "+1234567890",
    "name": "John Doe" or null,
    "email": "..." or null
  },
  "isNewUser": true/false
}
```

**3. Update Profile (If needed)**
```bash
PUT /api/v1/mobile/users/profile
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://..."
}
```

### Alternative: Explicit Signup (Optional)

**Use only if you want to collect profile info BEFORE login:**

```bash
POST /api/v1/mobile/auth/signup
Body: {
  "phone": "+1234567890",
  "otp": "123456",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 🎯 When to Use Which Approach?

### Approach 1: Auto-detect (Recommended) ✅
**Use `verify-otp` for everything**

**Pros:**
- ✅ Simpler for users (no "Signup vs Login" confusion)
- ✅ Faster onboarding
- ✅ One endpoint to maintain
- ✅ Profile completion can be deferred

**Cons:**
- ⚠️ Profile might be incomplete initially
- ⚠️ Need to prompt profile completion later

**Best for:**
- Consumer apps
- Quick onboarding priority
- Optional profile details

### Approach 2: Explicit Signup (Optional)
**Use separate `signup` and `verify-otp` endpoints**

**Pros:**
- ✅ Complete profile from start
- ✅ Clear distinction between new/existing users
- ✅ Better data collection

**Cons:**
- ⚠️ Extra step for users
- ⚠️ "Signup vs Login" confusion
- ⚠️ More complex flow

**Best for:**
- Enterprise apps
- Apps requiring complete profiles
- Regulated industries

---

## 💡 Recommended Implementation

```typescript
// Simple, clean, user-friendly flow

const handleAuth = async () => {
  try {
    // Step 1: Get phone number
    const phone = await getPhoneFromUser();
    
    // Step 2: Send OTP
    await sendOTP(phone);
    
    // Step 3: Get OTP from user
    const otp = await getOTPFromUser();
    
    // Step 4: Verify OTP (handles everything)
    const response = await verifyOTP(phone, otp);
    
    // Step 5: Save tokens
    await saveTokens(response.accessToken, response.refreshToken);
    
    // Step 6: Check profile status
    if (response.isNewUser || !response.user.name) {
      // Show profile completion screen
      showCompleteProfileScreen({
        canSkip: true,
        onComplete: () => navigateToHome(),
        onSkip: () => navigateToHome()
      });
    } else {
      // Go directly to home
      navigateToHome();
    }
    
  } catch (error) {
    showError(error.message);
  }
};
```

---

## 🔍 Profile Completion Strategy

### Option 1: Mandatory (Blocking)
```typescript
if (response.isNewUser || !response.user.name) {
  // User MUST complete profile
  showCompleteProfileScreen({
    canSkip: false,
    onComplete: () => navigateToHome()
  });
}
```

### Option 2: Optional (Recommended)
```typescript
if (response.isNewUser || !response.user.name) {
  // User CAN skip
  showCompleteProfileScreen({
    canSkip: true,
    onComplete: () => navigateToHome(),
    onSkip: () => {
      // Show reminder later
      scheduleProfileReminder();
      navigateToHome();
    }
  });
}
```

### Option 3: Deferred
```typescript
// Let user explore app first
navigateToHome();

// Show profile completion prompt later
if (response.isNewUser || !response.user.name) {
  setTimeout(() => {
    showProfileCompletionBanner();
  }, 5000); // After 5 seconds
}
```

---

## ✅ Summary

**Recommended Flow:**
1. User enters phone → Send OTP
2. User enters OTP → Verify OTP (auto-detects new/existing)
3. System checks `isNewUser` flag:
   - New user → Show "Complete Profile" (optional)
   - Existing user → Go to Home

**Key Benefits:**
- ✅ No "Signup vs Login" confusion
- ✅ Faster user onboarding
- ✅ Flexible profile completion
- ✅ Single endpoint to maintain
- ✅ Better user experience

**Use `/signup` endpoint only if:**
- You need complete profile BEFORE login
- Regulatory requirements
- Business needs upfront data collection

Otherwise, stick with the simple `verify-otp` flow! 🚀
