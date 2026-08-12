require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/ai-symptoms", async (req, res) => {
  const { symptomText } = req.body;

  if (!symptomText) {
    return res.status(400).json({ error: "symptomText is required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant discussing general nutrition information, not a doctor. Based on these symptoms: ${symptomText}, list 2-3 possible vitamin or mineral deficiencies that are commonly associated with them. For each one, give the deficiency name and one short sentence on why it fits. Keep the entire response under 100 words, formatted as a bullet list. End with a brief reminder to consult a healthcare provider for an actual diagnosis.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1500,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res
        .status(response.status)
        .json({ error: data.error?.message || "Gemini API request failed" });
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      console.error("Unexpected Gemini response shape:", data);
      return res
        .status(500)
        .json({ error: "No response text returned from Gemini" });
    }

    res.json({ result: resultText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
