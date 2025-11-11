const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
});

async function generateInputs() {
  try {
    const prompt = `
Generate 5 random test signup users test inputs in strict JSON format.
Rules:
- "phone" must be a valid Vietnamese phone number (starts with 03,05,07,08,09 and 10 digits total)
- "password" must be at least 6 characters and include uppercase, lowercase, number, and special character.
Each object must have:
[
  {
    "phone": "0xxxxxxxxx",
    "firstName": "string",
    "lastName": "string",
    "email": "string@gmail.com",
    "password": "string",
    "confirmpassword": "string"
  },...
]`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const text = res.choices[0].message.content.trim();

    try {
      const match = text.match(/\[\s*{[\s\S]*}\s*]/);
      const data = JSON.parse(match[0]);  
      return data;
    } catch {
      console.warn("Could not parse LLM JSON. Using fallback generator.");
      console.log("LLM Raw Response:", text);
      return generateFallbackInputs();
    }
  } catch (err) {
    console.error("LLM API error:", err.message);
    return generateFallbackInputs();
  }
};

const generateFallbackInputs = () => {
  const inputs = [];
  for (let i = 0; i < 5; i++) {
    const rand = Math.floor(Math.random() * 100000);
    const password = "Createverify3)";
    inputs.push({
      phone: `0397${rand.toString().padStart(6, "0")}`,
      firstName: "Auto",
      lastName: `Test${i}`,
      email: `autotest${rand}@example.com`,
      password: password,
      confirmpassword: password,
    });
  }
  return inputs;
};

module.exports = { generateInputs };
