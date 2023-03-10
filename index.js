const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const connectdb = require("./Database/connection");
const postsRoutes = require("./Routes/postsRoutes");
const dalleRoutes = require("./Routes/dalleRoutes");

const PORT = process.env.PORT || 8080

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postsRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    connectdb(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log("App is running on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
