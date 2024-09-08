import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.url?.replace("/api/get/", "") || "";

  if (!url) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const response = await fetch(`https://casino.api.pikakasino.com/v1/pika/${url}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("GET API Error:", error.message);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
}
