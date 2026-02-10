# BFHL Qualifier API

This repository contains a REST API implementation developed for the BFHL Qualifier evaluation.

The application exposes two public endpoints and follows strict API response structure, validation rules, error handling, and production-readiness requirements as defined in the problem statement.

---

## Technology Stack

- Node.js
- Express.js
- Axios
- dotenv
- Google Gemini API

---

## API Endpoints

### GET /health

Health check endpoint.

**Response**

```json
{
  "is_success": true,
  "official_email": "your_chitkara_email@chitkara.edu.in"
}
POST /bfhl
Processes exactly one functional key per request.

Only one key must be present in the request body.

Supported Functional Keys
Key	Input Type	Output
fibonacci	Integer	Fibonacci series
prime	Integer Array	Prime numbers
lcm	Integer Array	LCM value
hcf	Integer Array	HCF value
AI	String	Single-word AI response
Example Requests
Fibonacci
{
  "fibonacci": 7
}
Prime
{
  "prime": [2, 4, 7, 9, 11]
}
LCM
{
  "lcm": [12, 18, 24]
}
HCF
{
  "hcf": [24, 36, 60]
}
AI
{
  "AI": "What is the capital of Maharashtra?"
}
Success Response Format
{
  "is_success": true,
  "official_email": "your_chitkara_email@chitkara.edu.in",
  "data": ...
}
Error Response Format
{
  "is_success": false,
  "official_email": "your_chitkara_email@chitkara.edu.in",
  "error": "Error message"
}
Environment Variables
Create a .env file in the project root:

PORT=3000
EMAIL=your_chitkara_email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key
The .env file is excluded from version control using .gitignore.

Local Execution
npm install
npm start
Server runs on:

http://localhost:3000
Deployment
The application is compatible with standard Node.js hosting platforms.

Render

Railway

Vercel

Deployment Configuration

Build command: npm install

Start command: npm start

Environment variables must be configured on the hosting platform

Validation and Robustness
Enforces strict request structure

Accepts exactly one functional key

Handles invalid input gracefully

Uses correct HTTP status codes

Prevents runtime crashes

Secures sensitive data using environment variables

Repository Structure
BajaFinserv/
 ├── index.js
 ├── package.json
 ├── .env
 ├── .gitignore
 └── README.md
Author
Tarun Saini
Chitkara University


