const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

app.post("/api/claude", async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_KEY não configurada" });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CLARA rodando na porta ${PORT}`);
});
