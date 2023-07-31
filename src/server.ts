import routes from "./routes";

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/api", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
