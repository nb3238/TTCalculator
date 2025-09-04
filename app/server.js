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
    let dmg = this.data.currDmg;
    if (this.data.statuseffect.hasOwnProperty("organic")) {
      dmg = Math.ceil((dmg * this.orgBoost).toFixed(1));
    }
    if (this.data.statuseffect.hasOwnProperty("attackUp")) {
      dmg += Math.ceil((dmg * this.data.statuseffect.attackUp).toFixed(1));
    }
    if (status.hasOwnProperty("defenseUp")) {
      dmg -= Math.ceil((dmg * status.defenseUp).toFixed(1));
    }
    return dmg;
  }

  getAccuracy(cog, stun) {
    let acc = this.data.accuracy;
    if (this.data.statuseffect.hasOwnProperty("accuracyUp")) {
      acc += this.data.statuseffect.accuracyUp;
    }
    let trackExp = ((this.data.id - 1) % 7) * 10;
    if (this.data.currDmg === this.data.maxdmg) {
      acc += 60
    } else {
      acc += trackExp;
    }
    acc += cog.tgtdef;
    acc += stun;

    if (acc > 95) {
      return 95;
    } else if (acc < 5) {
      return 5;
    } else {
      return acc;
    }
  }

  getStun() {
    return 0;
  }
}

class ToonUp extends Gag {
  constructor(data) {
    super(data);
  }

  getDmg(status) {
    return 0;
  }

  getAccuracy(cog, stun) {
    pool.query(`SELECT * FROM cogs WHERE levelID = '${cog.level}'`).then(result => {
      let rows = result.rows;
      if (rows.length != 1) {
        return 0;
      }
      let acc = this.data.accuracy;
      if (this.data.statuseffect.hasOwnProperty("accuracyUp")) {
        acc += this.data.statuseffect.accuracyUp;
      }
      let trackExp = ((this.data.id - 1) % 7) * 10;
      if (this.data.currDmg === this.data.maxdmg) {
        acc += 30
      } else {
        acc += trackExp / 2;
      }
      acc += stun;

      if (acc > 95) {
        return 95;
      } else if (acc < 5) {
        return 5;
      } else {
        return acc;
      }
    }).catch((error) => {
      return 0;
    });
  }
}

class Trap extends Gag {
  constructor(data) {
    super(data);
  }

  getAccuracy(cog, stun) {
    return 100;
  }
}

class Lure extends Gag {
  constructor(data) {
    super(data);
  }
}

class Sound extends Gag {
  constructor(data) {
    super(data);
  }

  getStun() {
    return 25;
  }
}

class Throw extends Gag {
  constructor(data) {
    super(data);
  }

  getStun() {
    return 25;
  }
}

class Squirt extends Gag {
  constructor(data) {
    super(data);
    this.orgBoost = 1.15;
  }

  getStun() {
    return 25;
  }
}

class Drop extends Gag {
  constructor(data) {
    super(data);
    this.orgBoost = 1.15;
  }

  getStun() {
    return 25;
  }
}

function increaseGagAcc(initAcc, accIncrease) {
  let acc = initAcc + accIncrease;
  if (acc > 95) {
    return 95;
  } else if (acc < 5) {
    return 5;
  } else {
    return acc;
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

//function calculateTrack(similarGags, status) {
  function calculateTrack(similarGags, cogs, stun) {
  let gagTypeDamage = 0;
  let totalDamage = 0;
  let totalAcc = 1;
  let gagTypeAccuracy = 0;

  //for (let cog of cogs) {
  let cog = cogs;
  for (let similarGag of similarGags) {
    let gag = getGagTrack(similarGag);
    //gagTypeDamage += gag.getDmg(status);
    gagTypeDamage += gag.getDmg(cog.status);
    let acc = gag.getAccuracy(cog, stun);
    if (acc > gagTypeAccuracy) {
      gagTypeAccuracy = acc;
    }
  }
  for (let similarGag of similarGags) {
    let gag = getGagTrack(similarGag);
    stun += gag.getStun();
  }

  if (similarGags[0].gagtype === "Toon-Up") {
    ;
  } else if (similarGags[0].gagtype === "Trap") {
    if (similarGags.length > 1) {
      //delete status.trapped
      delete cog.status.trapped
      gagTypeAccuracy = 0;
    //} else if (status.hasOwnProperty("trapped")) {
    } else if (cog.status.hasOwnProperty("trapped")) {
      ;
    //} else if (status.hasOwnProperty("lured")) {
    } else if (cog.status.hasOwnProperty("lured")) {
      ;
    } else {
      //status.trapped = {"value": gagTypeDamage, "rounds": -1};
      cog.status.trapped = {"value": gagTypeDamage, "rounds": -1};
    }
  } else if (similarGags[0].gagtype === "Lure") {
    similarGags.sort((a, b) => b.statuseffect.lured.rounds - a.statuseffect.lured.rounds);
    for (let i = 1; i < similarGags.length; i++) {
      let gag = similarGags[i];
      console.log(gag)
      if ((gag.id - 1) % 7 < 2) {
        gagTypeAccuracy = increaseGagAcc(gagTypeAccuracy, 10);
      } else if ((gag.id - 1) % 7 < 4) {
        gagTypeAccuracy = increaseGagAcc(gagTypeAccuracy, 15);
      } else {
        gagTypeAccuracy = increaseGagAcc(gagTypeAccuracy, 20);
      }
    }
    if (!cog.status.hasOwnProperty("trapped")) {
      cog.status.lured = {"rounds": similarGags[0].statuseffect.lured.rounds};
    } else {
      totalDamage += cog.status.trapped.value;
      delete cog.status.trapped;
      stun += 50;
    }
  } else if (similarGags[0].gagtype === "Sound") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    totalDamage += gagTypeDamage;
    if (cog.status.hasOwnProperty("lured")) {
      gagTypeAccuracy = 100;
    }
    delete cog.status.lured;
  } else if (similarGags[0].gagtype === "Drop") {
    if (similarGags.length > 1) {
      gagTypeDamage = Math.ceil(gagTypeDamage * 1.2);
    }
    if (!cog.status.hasOwnProperty("lured")) {
      totalDamage += gagTypeDamage;
    } else {
      gagTypeAccuracy = 0;
    }
  } else {
    let comboBonus = 0;
    if (similarGags.length > 1) {
      comboBonus = Math.ceil(gagTypeDamage * 0.2);
    }
    if (cog.status.hasOwnProperty("lured")) {
      gagTypeAccuracy = 100;
      totalDamage += Math.ceil(gagTypeDamage * 1.5) + comboBonus;
    } else {
      totalDamage += gagTypeDamage + comboBonus;
    }
    delete cog.status.lured;
  }
  totalAcc *= gagTypeAccuracy / 100;
  //}
  //return {"totalDamage": totalDamage, "status": status};
  return {"totalDamage": totalDamage, "totalAcc": totalAcc, "cogs": cogs, "stun": stun};
}

app.post("/calculate", (req, res) => {
  let body = req.body;
  
  if (!body.hasOwnProperty("gags") || !body.hasOwnProperty("cogs")) {
    return res.status(400).json({});
  }

  let gags = body.gags;
  if (!Array.isArray(gags)) {
    return res.status(400).json({});
  }
  //let status = body.status;
  let cogs = body.cogs;

  gags.sort((a, b) => a.id - b.id);
	let similarGags = [];
	let totalDamage = 0;
  let totalAcc = 1;
	let gagIndex = 0;
  let calculation;
  let stun = 0;

	for (let gag of gags) {
		gagIndex++;
		if (similarGags.length === 0 || (similarGags[0].gagtype === gag.gagtype)) {
			similarGags.push(gag);
			if (gagIndex !== gags.length) {
				continue;
			}
		}

    //calculation = calculateTrack(similarGags, status);
    calculation = calculateTrack(similarGags, cogs, stun);
    totalDamage += calculation.totalDamage;
    totalAcc *= calculation.totalAcc;
    //status = calculation.status;
    cogs = calculation.cogs;
    stun = calculation.stun;

		if (gagIndex === gags.length && (similarGags[0].gagtype !== gag.gagtype)) {
			//calculation = calculateTrack([gag], status);
      calculation = calculateTrack([gag], cogs, stun);
      totalDamage += calculation.totalDamage;
      totalAcc *= calculation.totalAcc;
      //status = calculation.status;
      cogs = calculation.cogs;
		} else {
			similarGags = [];
			similarGags.push(gag);
		}
	}
  //res.json({"totalDamage": totalDamage, "status": status});
  res.json({"totalDamage": totalDamage, "totalAcc": totalAcc, "cogs": cogs});
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
      rows[0].currDmg = rows[0].maxdmg;
      return res.status(200).json({gag: rows});
    }).catch((error) => {
      return res.json({});
    });
  }
  pool.query("SELECT * FROM gags").then(result => {
    let rows = result.rows;
    for (let row of rows) {
      row.currDmg = row.maxdmg;
    }
    return res.status(200).json({gag: result.rows});
  }).catch((error) => {
    return res.json({});
  });
});

app.post("/cogs", (req, res) => {
  let body = req.body;
  if (body.hasOwnProperty("cog")) {
    let cog = body.cog;
    return pool.query(`SELECT * FROM cogs WHERE levelID = '${cog.level}'`).then(result => {
      let rows = result.rows;
      if (rows.length !== 1) {
        return res.status(200).json({});
      }
      for (let pair of Object.entries(rows[0])) {
        if (pair[0] !== "levelid") {
          cog[pair[0]] = pair[1];
        }
      }
      return res.status(200).json({"cogData": cog});
    }).catch((error) => {
      return res.json({});
    });
  } else {
    return res.json({});
  }
});

app.get("/info", (req, res) => {
  let query = req.query;
  if (query.hasOwnProperty("page")) {
    let pageNum = query.page;
    return pool.query(`SELECT * FROM info WHERE id = '${pageNum}'`).then(result => {
      return res.status(200).json({"content": result.rows[0].content.content});
    }).catch((error) => {
      return res.json({});
    });
  }
  return res.json({})
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
