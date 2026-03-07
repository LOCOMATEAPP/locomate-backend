#!/bin/bash

echo "🧪 Testing Signup API Flow"
echo "=========================="
echo ""

BASE_URL="http://localhost:3000/api/v1/mobile/auth"
PHONE="+1234567890"

echo "📱 Step 1: Sending OTP to $PHONE"
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

echo "📝 Step 2: Signing up with user details"
echo "---"
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone\": \"$PHONE\",
    \"otp\": \"$OTP\",
    \"name\": \"Test User\",
    \"email\": \"test@locomate.com\"
  }")

echo "$SIGNUP_RESPONSE" | jq '.'

ACCESS_TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.data.accessToken // empty')

if [ -z "$ACCESS_TOKEN" ]; then
  echo ""
  echo "❌ Signup failed (User might already exist)"
  echo ""
  echo "🔄 Trying login instead..."
  echo "---"
  
  LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/verify-otp" \
    -H "Content-Type: application/json" \
    -d "{
      \"phone\": \"$PHONE\",
      \"otp\": \"$OTP\"
    }")
  
  echo "$LOGIN_RESPONSE" | jq '.'
  ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken // empty')
fi

echo ""
if [ -n "$ACCESS_TOKEN" ]; then
  echo "✅ Success! Access token received"
  echo "Token: ${ACCESS_TOKEN:0:50}..."
  echo ""
  echo "🎉 You can now use this token for authenticated requests"
else
  echo "❌ Authentication failed"
  exit 1
fi
