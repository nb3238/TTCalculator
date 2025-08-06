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

function calculateTrack(similarGags, trappedGag, lured) {
  let gagTypeDamage = 0;
  let totalDamage = 0;

  for (let similarGag of similarGags) {
    gagTypeDamage += similarGag.maxdmg;
  }

  if (similarGags[0].gagtype === "Toon-Up") {
    ;
  } else if (similarGags[0].gagtype === "Trap") {
    if (similarGags.length > 1) {
      trappedGag = {};
    } else if (trappedGag.hasOwnProperty("gag")) {
      ;
    } else if (lured) {
      ;
    } else {
      trappedGag = {"gag": similarGags[0]};
    }
  } else if (similarGags[0].gagtype === "Lure") {
    if (!trappedGag.hasOwnProperty("gag")) {
      lured = true;
    } else {
      totalDamage += trappedGag.gag.maxdmg;
      trappedGag = {};
    }
  } else if (similarGags[0].gagtype === "Sound") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    totalDamage += gagTypeDamage;
    lured = false;
  } else if (similarGags[0].gagtype === "Drop") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    if (!lured) {
      totalDamage += gagTypeDamage;
    }
  } else {
    let comboBonus = 0;
    if (similarGags.length > 1) {
      comboBonus = Math.ceil(gagTypeDamage * 0.2);
    }
    if (lured) {
      totalDamage += Math.ceil(gagTypeDamage * 1.5) + comboBonus;
    } else {
      totalDamage += gagTypeDamage + comboBonus;
    }
    lured = false;
  }
  return {"totalDamage": totalDamage, "trappedGag": trappedGag, "lured": lured};
}

app.post("/calculate", (req, res) => {
  let body = req.body;
  if (!body.hasOwnProperty("gags") ||
      !body.hasOwnProperty("trappedGag") ||
      !body.hasOwnProperty("lured")) {
    return res.status(400).json({});
  }

  let gags = body.gags;
  if (!Array.isArray(gags)) {
    return res.status(400).json({});
  }
  let trappedGag = body.trappedGag;
  let lured = body.lured

  gags.sort((a, b) => a.id - b.id);
	let similarGags = [];
	let totalDamage = 0;
	let gagIndex = 0;
  let calculation;

	for (let gag of gags) {
		gagIndex++;
		if (similarGags.length === 0 || (similarGags[0].gagtype === gag.gagtype)) {
			similarGags.push(gag);
			if (gagIndex !== gags.length) {
				continue;
			}
		}

		calculation = calculateTrack(similarGags, trappedGag, lured);
    totalDamage += calculation.totalDamage;
    trappedGag = calculation.trappedGag;
    lured = calculation.lured;

		if (gagIndex === gags.length && (similarGags[0].gagtype !== gag.gagtype)) {
			calculation = calculateTrack([gag], trappedGag, lured);
      totalDamage += calculation.totalDamage;
      trappedGag = calculation.trappedGag;
      lured = calculation.lured;
		} else {
			similarGags = [];
			similarGags.push(gag);
		}
	}
			
	res.json({"totalDamage": totalDamage, "trappedGag": trappedGag, "lured": lured});
});

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
