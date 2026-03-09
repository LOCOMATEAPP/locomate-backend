#!/bin/bash

echo "🧪 Testing Locomate API Endpoints"
echo "=================================="
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Health Check..."
curl -s https://locomate.app/health | jq '.'
echo ""

# Test 2: Check User Endpoint
echo "2️⃣ Testing Check User Endpoint..."
curl -s -X POST https://locomate.app/api/v1/mobile/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}' | jq '.'
echo ""

# Test 3: Signup Endpoint
echo "3️⃣ Testing Signup Endpoint..."
curl -s -X POST https://locomate.app/api/v1/mobile/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "name": "Test User",
    "avatar": "https://example.com/avatar.jpg",
    "gender": "male",
    "dob": "1990-01-01"
  }' | jq '.'
echo ""

echo "✅ Testing complete!"
