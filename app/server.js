const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public"));
app.use(express.json());

app.get("/gags", (req, res) => {
  let query = req.query;
  if (query.hasOwnProperty("gag")) {
    let gag = query.gag;
    return pool.query(`SELECT * FROM gags WHERE gagName = '${gag}'`).then(result => {
      let rows = result.rows;
      if (rows.length === 0) {
        return res.status(200).json({});
      }
      return res.status(200).json({gag: rows});
    }).catch((error) => {
      return res.json({});
    });
  }
  pool.query("SELECT * FROM gags").then(result => {
      return res.status(200).json({gag: result.rows});
    }).catch((error) => {
      return res.json({});
    });
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
