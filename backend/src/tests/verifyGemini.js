// tests/verifyGemini.js
const path = require('path');
const fs = require('fs');

console.log('🔍 Checking environment setup...\n');

const envPath = path.join(__dirname, '../..', '.env');
console.log('📁 Looking for .env at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');

    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('\n📄 .env file content:');
    console.log(envContent);

    if (envContent.includes('GEMINI_API_KEY')) {
        console.log('\n✅ GEMINI_API_KEY found in .env file');
    } else {
        console.log('\n❌ GEMINI_API_KEY NOT found in .env file');
    }
} else {
    console.log('❌ .env file NOT found at expected location');
    console.log('💡 Make sure .env is in your backend root directory');
}

console.log('\n🚀 Loading environment variables...');
require('dotenv').config({ path: envPath });

console.log('\n📋 Loaded environment variables:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ SET' : '❌ NOT SET');
console.log('PERSPECTIVE_API_KEY:', process.env.PERSPECTIVE_API_KEY ? '✅ SET' : '❌ NOT SET');

if (process.env.GEMINI_API_KEY) {
    console.log('\n🔑 GEMINI_API_KEY value:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
    console.log('📏 Key length:', process.env.GEMINI_API_KEY.length);

    console.log('\n🧪 Testing API key...');
    testGeminiAPI();
} else {
    console.log('\n💡 Solution:');
    console.log('1. Make sure .env file is in your backend root directory');
    console.log('2. File should contain: GEMINI_API_KEY=your_key_here');
    console.log('3. No quotes, no spaces around the = sign');
}

async function testGeminiAPI() {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent("Say 'Hello SkillSync' in one short sentence");
        const response = await result.response;

        console.log('✅ API Test SUCCESSFUL!');
        console.log('🤖 Response:', response.text());

    } catch (error) {
        console.log('❌ API Test FAILED:', error.message);

        if (error.message.includes('API_KEY_INVALID')) {
            console.log('\n🚨 Your API key is invalid!');
            console.log('💡 Get a new one from: https://aistudio.google.com/app/apikey');
        }
    }
}