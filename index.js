const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB = "./autoreact-db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB, "utf8"));
const writeDB = (data) => fs.writeFileSync(DB, JSON.stringify(data, null, 2));

app.get("/", (req, res) => {
  res.json({
    name: "Akash AutoReact API",
    status: "online",
    author: "MOHAMMAD AKASH"
  });
});

app.get("/react", (req, res) => {
  res.json(readDB());
});

app.post("/react/teach", (req, res) => {
  const { trigger, react } = req.body;

  if (!trigger || !react) {
    return res.status(400).json({
      success: false,
      message: "trigger & react required"
    });
  }

  const db = readDB();
  db.texts.push({
    k: [trigger.toLowerCase()],
    r: react
  });

  writeDB(db);

  res.json({
    success: true,
    taught: `${trigger} → ${react}`
  });
});

app.listen(PORT, () => {
  console.log("🔥 Akash AutoReact API running on port " + PORT);
});
