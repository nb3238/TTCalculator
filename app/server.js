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

class Gag {
  constructor(data) {
    this.data = data;
    this.status = [];
    this.orgBoost = 1.1;
  }

  applyStatus(name, value) {
    this.status[name] = value;
  }

  getDmg(status) {
    let dmg = this.data.maxdmg;
    if (this.status.hasOwnProperty("organic")) {
      dmg *= Math.ceil(dmg * this.orgBoost);
    }
    if (this.status.hasOwnProperty("attackUp")) {
      dmg *= Math.ceil(dmg * this.status.attackUp);
    }
    if (status.hasOwnProperty("defenseUp")) {
      dmg -= Math.ceil(dmg * status.defenseUp);
    }
    return dmg;
  }
}

class ToonUp extends Gag {
  constructor(data) {
    super(data);
  }

  getDmg(status) {
    return 0;
  }
}

class Trap extends Gag {
  constructor(data) {
    super(data);
  }
}

class Lure extends Gag {
  constructor(data) {
    super(data);
  }

  getDmg(status) {
    return 0;
  }
}

class Sound extends Gag {
  constructor(data) {
    super(data);
  }
}

class Throw extends Gag {
  constructor(data) {
    super(data);
  }
}

class Squirt extends Gag {
  constructor(data) {
    super(data);
    this.orgBoost = 1.15;
  }
}

class Drop extends Gag {
  constructor(data) {
    super(data);
    this.orgBoost = 1.15;
  }
}

function getGagTrack(gag) {
  if (gag.gagtype === "Toon-Up") {
    return new ToonUp(gag)
  } else if (gag.gagtype === "Trap") {
    return new Trap(gag)
  } else if (gag.gagtype === "Lure") {
    return new Lure(gag)
  } else if (gag.gagtype === "Sound") {
    return new Sound(gag)
  } else if (gag.gagtype === "Throw") {
    return new Throw(gag)
  } else if (gag.gagtype === "Squirt") {
    return new Squirt(gag)
  } else if (gag.gagtype === "Drop") {
    return new Drop(gag)
  } else {
    throw new Error("Not a valid gag track.");
  }
}

function calculateTrack(similarGags, status) {
  let gagTypeDamage = 0;
  let totalDamage = 0;

  for (let similarGag of similarGags) {
    let gag = getGagTrack(similarGag);
    gagTypeDamage += gag.getDmg(status);
  }

  if (similarGags[0].gagtype === "Toon-Up") {
    ;
  } else if (similarGags[0].gagtype === "Trap") {
    if (similarGags.length > 1) {
      delete status.trapped
    } else if (status.hasOwnProperty("trapped")) {
      ;
    } else if (status.hasOwnProperty("lured")) {
      ;
    } else {
      status.trapped = {"value": similarGags[0].maxdmg, "rounds": -1};
    }
  } else if (similarGags[0].gagtype === "Lure") {
    if (!status.hasOwnProperty("trapped")) {
      similarGags.sort((a, b) => b.statuseffect.lured.rounds - a.statuseffect.lured.rounds);
      status.lured = {"rounds": similarGags[0].statuseffect.lured.rounds};
    } else {
      totalDamage += status.trapped.value;
      delete status.trapped;
    }
  } else if (similarGags[0].gagtype === "Sound") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    totalDamage += gagTypeDamage;
    delete status.lured;
  } else if (similarGags[0].gagtype === "Drop") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    if (!status.hasOwnProperty("lured")) {
      totalDamage += gagTypeDamage;
    }
  } else {
    let comboBonus = 0;
    if (similarGags.length > 1) {
      comboBonus = Math.ceil(gagTypeDamage * 0.2);
    }
    if (status.hasOwnProperty("lured")) {
      totalDamage += Math.ceil(gagTypeDamage * 1.5) + comboBonus;
    } else {
      totalDamage += gagTypeDamage + comboBonus;
    }
    delete status.lured;
  }
  return {"totalDamage": totalDamage, "status": status};
}

app.post("/calculate", (req, res) => {
  let body = req.body;
  
  if (!body.hasOwnProperty("gags") || !body.hasOwnProperty("status")) {
    return res.status(400).json({});
  }

  let gags = body.gags;
  if (!Array.isArray(gags)) {
    return res.status(400).json({});
  }
  let status = body.status;

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

    calculation = calculateTrack(similarGags, status);
    totalDamage += calculation.totalDamage;
    status = calculation.status;

		if (gagIndex === gags.length && (similarGags[0].gagtype !== gag.gagtype)) {
			calculation = calculateTrack([gag], status);
      totalDamage += calculation.totalDamage;
      status = calculation.status;
		} else {
			similarGags = [];
			similarGags.push(gag);
		}
	}
  for (let pair of Object.entries(status)) {
    let stat = status[pair[0]];
    if (stat.rounds == 1) {
      delete status[pair[0]];
    } else {
      stat.rounds--;
    }
  }
	console.log(status);
  res.json({"totalDamage": totalDamage, "status": status});
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
