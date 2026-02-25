#!/bin/bash

echo "=== LOCOMATE API Tests ==="
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s http://localhost:3000/health | jq '.'
echo ""
echo ""

# Test 2: Admin Login
echo "2. Testing Admin Login..."
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@locomate.com", "password": "admin123"}')
echo "$ADMIN_RESPONSE" | jq '.'
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.data.accessToken')
echo ""
echo ""

# Test 3: Mobile - Send OTP
echo "3. Testing Mobile Send OTP..."
OTP_RESPONSE=$(curl -s -X POST http://localhost:3000/api/mobile/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}')
echo "$OTP_RESPONSE" | jq '.'
OTP=$(echo "$OTP_RESPONSE" | jq -r '.data.otp')
echo "OTP: $OTP"
echo ""
echo ""

# Test 4: Mobile - Verify OTP
echo "4. Testing Mobile Verify OTP..."
MOBILE_RESPONSE=$(curl -s -X POST http://localhost:3000/api/mobile/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"+1234567890\", \"otp\": \"$OTP\"}")
echo "$MOBILE_RESPONSE" | jq '.'
MOBILE_TOKEN=$(echo "$MOBILE_RESPONSE" | jq -r '.data.accessToken')
echo ""
echo ""

# Test 5: Get Malls (with mobile token)
echo "5. Testing Get Malls (authenticated)..."
curl -s http://localhost:3000/api/mobile/malls \
  -H "Authorization: Bearer $MOBILE_TOKEN" | jq '.'
echo ""
echo ""

# Test 6: Get User Profile
echo "6. Testing Get User Profile..."
curl -s http://localhost:3000/api/mobile/users/profile \
  -H "Authorization: Bearer $MOBILE_TOKEN" | jq '.'
echo ""
echo ""

echo "=== Tests Complete ==="
