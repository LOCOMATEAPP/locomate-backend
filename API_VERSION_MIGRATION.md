# API Versioning Migration Guide

## ✅ Changes Applied

API URLs mein versioning add kar di gayi hai. Ab saare endpoints `/api/v1/` prefix use karte hain.

---

## 🔄 URL Changes

### Mobile APIs

**Old Format:**
```
/api/mobile/auth/send-otp
/api/mobile/users/profile
/api/mobile/malls
```

**New Format (v1):**
```
/api/v1/mobile/auth/send-otp
/api/v1/mobile/users/profile
/api/v1/mobile/malls
```

### Admin APIs

**Old Format:**
```
/api/admin/auth/login
/api/admin/users
```

**New Format (v1):**
```
/api/v1/admin/auth/login
/api/v1/admin/users
```

---

## 📝 Updated Files

1. ✅ `src/app.ts` - Route prefixes updated
2. ✅ `API_ENDPOINTS.txt` - All examples updated
3. ✅ `Locomate_Mobile.postman_collection.json` - All URLs updated
4. ✅ `Locomate_Admin.postman_collection.json` - All URLs updated

---

## 🚀 Testing

Server restart karein aur test karein:

```bash
npm run dev
```

**Test Mobile Auth:**
```bash
curl -X POST http://localhost:3000/api/v1/mobile/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'
```

**Test Admin Auth:**
```bash
curl -X POST http://localhost:3000/api/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@locomate.com", "password": "admin123"}'
```

---

## 🔮 Future Versions

Jab API mein breaking changes aayenge, to aap easily v2 add kar sakte hain:

```typescript
// v1 routes (existing users)
await app.register(authRoutes, { prefix: '/api/v1/mobile/auth' });

// v2 routes (new features)
await app.register(authRoutesV2, { prefix: '/api/v2/mobile/auth' });
```

Is tarah se:
- Purane clients v1 use karte rahenge
- Naye clients v2 use kar sakte hain
- Backward compatibility maintain rahegi

---

## 📱 Mobile App Update Required

Agar aapka mobile app already deployed hai, to:

1. **Option 1 (Recommended):** Dono versions support karein
   - v1 ko deprecate karein (6 months notice)
   - Gradually v2 pe migrate karein

2. **Option 2:** Force update
   - App update mandatory karein
   - Purane version ko block karein

---

## 🎯 Benefits

1. **Clear versioning** - API version URL mein clearly visible
2. **Backward compatibility** - Multiple versions parallel run kar sakte hain
3. **Easier migration** - Clients apne pace pe migrate kar sakte hain
4. **Better documentation** - Version-specific docs maintain kar sakte hain

---

## ⚠️ Important Notes

- Health check endpoint versioned nahi hai: `/health`
- Postman collections automatically updated hain
- Koi code changes mobile/admin modules mein nahi chahiye
- Sirf route registration mein changes hain

---

## 📞 Rollback (Agar zarurat ho)

Agar purane URLs pe wapas jaana ho:

```bash
# src/app.ts mein
sed -i '' 's|/api/v1/mobile/|/api/mobile/|g' src/app.ts
sed -i '' 's|/api/v1/admin/|/api/admin/|g' src/app.ts
```

---

Happy Coding! 🚀
