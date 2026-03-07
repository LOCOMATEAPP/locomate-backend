#!/bin/bash

echo "🧪 Testing Complete Auth Flow"
echo "=============================="
echo ""

BASE_URL="http://localhost:3000/api/v1/mobile/auth"
PHONE="+9876543210"  # Use different phone for testing

echo "📱 Step 1: Check if user exists"
echo "---"
CHECK_RESPONSE=$(curl -s -X POST "$BASE_URL/check-user" \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"$PHONE\"}")

echo "$CHECK_RESPONSE" | jq '.'

USER_EXISTS=$(echo "$CHECK_RESPONSE" | jq -r '.data.exists')
echo ""
echo "User exists: $USER_EXISTS"
echo ""

echo "📨 Step 2: Send OTP"
echo "---"
OTP_RESPONSE=$(curl -s -X POST "$BASE_URL/send-otp" \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"$PHONE\"}")

echo "$OTP_RESPONSE" | jq '.'
OTP=$(echo "$OTP_RESPONSE" | jq -r '.data.otp // empty')

if [ -z "$OTP" ]; then
  echo "❌ Failed to get OTP"
  exit 1
fi

echo ""
echo "✅ OTP received: $OTP"
echo ""

if [ "$USER_EXISTS" = "true" ]; then
  echo "🔑 Step 3: Login (User exists)"
  echo "---"
  
  AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/verify-otp" \
    -H "Content-Type: application/json" \
    -d "{
      \"phone\": \"$PHONE\",
      \"otp\": \"$OTP\"
    }")
  
  echo "$AUTH_RESPONSE" | jq '.'
  
  ACCESS_TOKEN=$(echo "$AUTH_RESPONSE" | jq -r '.data.accessToken // empty')
  
  if [ -n "$ACCESS_TOKEN" ]; then
    echo ""
    echo "✅ Login Successful!"
    echo "Token: ${ACCESS_TOKEN:0:50}..."
  else
    echo ""
    echo "❌ Login failed"
    exit 1
  fi
  
else
  echo "📝 Step 3: Signup (New user)"
  echo "---"
  
  AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
    -H "Content-Type: application/json" \
    -d "{
      \"phone\": \"$PHONE\",
      \"otp\": \"$OTP\",
      \"name\": \"Test User\",
      \"email\": \"test@locomate.com\"
    }")
  
  echo "$AUTH_RESPONSE" | jq '.'
  
  ACCESS_TOKEN=$(echo "$AUTH_RESPONSE" | jq -r '.data.accessToken // empty')
  
  if [ -n "$ACCESS_TOKEN" ]; then
    echo ""
    echo "✅ Signup Successful!"
    echo "Token: ${ACCESS_TOKEN:0:50}..."
  else
    echo ""
    echo "❌ Signup failed"
    exit 1
  fi
fi

echo ""
echo "🎉 Authentication flow completed successfully!"
