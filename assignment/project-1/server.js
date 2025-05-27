const express = require("express");
const app = express();
const port = 3000;
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})


app.get("/api/quotes", async (req, res) => {

    const quotes = await prisma.quote.findMany();
    res.json(quotes);

});

app.post("/api/quotes", async (req, res) => {
  try {
    const { quote, author } = req.body;
    if (!quote || !author) {
      return res.status(400).json({ error: "Quote and author are required" });
    }
    const newQuote = await prisma.quote.create({
      data: {
        quote,
        author
      }
    });
    res.status(201).json(newQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create quote" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});