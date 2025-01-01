import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ message: "Phone number and message are required." });
  }

  const FAST2SMS_API_KEY = "45RF96wKNSTQmrPtoAvW3jyLVpefJBGEghlXcYxHIbM2a07nZOfU9nT2mQ4MKb8p1ya5vkX3YAtloHsZ";

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        sender_id: "WEBSITE",
        message: message,
        language: "english",
        flash: 0,
        numbers: phone,
      },
      {
        headers: {
          authorization: FAST2SMS_API_KEY,
        }
      }
    );

    if (response.data.return) {
      res.status(200).json({ message: "SMS sent successfully!" });
    } else {
      res.status(500).json({ message: "Failed to send SMS." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while sending SMS." });
  }
      }
        
