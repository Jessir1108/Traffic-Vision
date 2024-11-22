const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");

  // Realizar un DESCRIBE de la tabla registro
  const describeQuery = "DESCRIBE registro";
  db.query(describeQuery, (err, results) => {
    if (err) {
      console.error("Error describing table:", err);
      return;
    }
    console.log("Table structure:", results);
  });
});

// Servir archivos estáticos desde la carpeta .build
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "build", "index.html");
  console.log("Serving index.html from:", indexPath);
  res.sendFile(indexPath);
});

app.get("/download-latest-video", (req, res) => {
  const query =
    "SELECT `video` FROM registro ORDER BY `timestamp` DESC LIMIT 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching video from database:", err);
      res.status(500).send("Error fetching video from database");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("No video found");
      return;
    }

    const videoBlob = results[0].video;
    console.log("Video Blob:", videoBlob);

    const videoPath = path.join(__dirname, "latest_video.gif");

    fs.writeFile(videoPath, videoBlob, "binary", (err) => {
      if (err) {
        console.error("Error writing video file:", err);
        res.status(500).send("Error writing video file");
        return;
      }

      res.download(videoPath, "latest_video.gif", (err) => {
        if (err) {
          console.error("Error sending video file:", err);
        }

        // Optionally, delete the file after sending it
        fs.unlink(videoPath, (err) => {
          if (err) {
            console.error("Error deleting video file:", err);
          }
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
