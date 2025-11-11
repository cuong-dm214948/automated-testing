const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

async function generateInputs() {
  const prompt = `
Generate 5 login test inputs in strict JSON format:
[
  { "phone": "string", "password": "string" },
  ...
]
Use realistic Vietnamese-style phone numbers.
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const text = response.choices[0].message.content.trim();

    // Try to parse JSON
    try {
      const match = text.match(/\[\s*{[\s\S]*}\s*]/);
      const data = JSON.parse(match[0]);  
      return data;
    } catch (err) {
      console.warn("Could not parse LLM response as JSON, returning fallback");
      console.log("LLM Raw Response:", text);

      // Fallback data
      return [
        { phone: "0397825923", password: "1" },
        { phone: "0987654321", password: "abc123" },
        { phone: "0912345678", password: "test1234" },
        { phone: "0377778888", password: "password" },
        { phone: "0869990000", password: "hello123" },
      ];
    }
  } catch (err) {
    console.error("OpenAI API Error:", err.message);
 
    return [
      { phone: "0397825923", password: "1" },
      { phone: "0987654321", password: "abc123" },
      { phone: "0912345678", password: "test1234" },
      { phone: "0377778888", password: "password" },
      { phone: "0869990000", password: "hello123" },
    ];
  }
}

module.exports = { generateInputs };
