const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.static("../client"));

app.get("/data", async (req, res) => {
  try {
    const apiResponse = await axios.get("https://fakestoreapi.com/products");
    const jsonData = apiResponse.data;
    //console.log(jsonData);
    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
