import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = req.query.email;
  try {
    const apiKey = "2d8a2c2b8ff143e9b48d504eac6753a3";
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=true%60`,
      { method: "GET", headers: { "hibp-api-key": apiKey } }
    );
    if (response.status === 200) {
      const breaches = await response.json();
      res.json(breaches);
    } else if (response.status === 404) {
      res.json([]);
    } else {
      res.status(response.status).json({ error: "Error checking breach" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
