import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import webscraping from "./webscraping.js";
import compareAndUpdateData from "./updatedb.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
});

webscraping("2024")
  .then((musicData) => {
      compareAndUpdateData(musicData);
    //   console.log("Data saved successfully to database!");
  })
  .catch((error) => console.log("Error saving to database: ", error));

// console.log("testing...");

// const startServer = async () => {
//   try {
//     connectDB(process.env.MONGODB_URL);

//     app.listen(8080, () =>
//       console.log("server started on port http://localhost:8080")
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();
