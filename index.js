const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EMAIL = process.env.EMAIL;
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: EMAIL,
    error: "Route not found",
  });
});

function generateFibonacci(n) {
  if (typeof n !== "number" || n < 0) return null;

  const res = [0, 1];
  for (let i = 2; i < n; i++) {
    res.push(res[i - 1] + res[i - 2]);
  }
  return res.slice(0, n);
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

function calculateHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr.reduce((a, b) => gcd(a, b));
}

async function askAI(question) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [{ text: `Answer in ONE WORD only: ${question}` }],
        },
      ],
    },
    {
      params: {
        key: process.env.GEMINI_API_KEY,
      },
    },
  );

  return response.data.candidates[0].content.parts[0].text.trim();
}

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL,
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Request must contain exactly one key",
      });
    }

    const key = keys[0];
    let data;

    switch (key) {
      case "fibonacci":
        data = generateFibonacci(req.body.fibonacci);
        break;

      case "prime":
        data = req.body.prime?.filter(isPrime);
        break;

      case "lcm":
        data = calculateLCM(req.body.lcm);
        break;

      case "hcf":
        data = calculateHCF(req.body.hcf);
        break;

      case "AI":
        data = await askAI(req.body.AI);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: EMAIL,
          error: "Invalid key",
        });
    }

    if (data === null || data === undefined) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Invalid input data",
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data,
    });
  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);

    res.status(500).json({
      is_success: false,
      official_email: EMAIL,
      error: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
