import express from "express";
import mysql from "mysql";
// import cors from "cors";

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello from backend");
});

app.get("/book", (req, res) => {
  const q = "SELECT * FROM book";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/book", (req, res) => {
  const q = "INSERT INTO book(`title`, `desc`, `cover`) VALUES (?,?,?)"; // Corrected column name from `titlel` to `title`
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, values, (err, data) => { // Removed square brackets around `values`
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
