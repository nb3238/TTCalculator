--DROP DATABASE tt_calc;
CREATE DATABASE tt_calc;
\c tt_calc
CREATE TABLE gags (
	id SERIAL PRIMARY KEY,
	gagName VARCHAR(30),
	gagType VARCHAR(20),
	minDmg INT,
	maxDmg INT,
	accuracy INT,
	targetNum INT,
	statusEffect JSON
);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Feather', 'Toon-Up', 8, 10, 70, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Megaphone', 'Toon-Up', 15, 18, 70, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Lipstick', 'Toon-Up', 27, 30, 70, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Bamboo Cane', 'Toon-Up', 40, 45, 70, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Pixie Dust', 'Toon-Up', 50, 60, 70, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Juggling Cubes', 'Toon-Up', 75, 105, 70, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('High Dive', 'Toon-Up', 210, 210, 95, -1, '{}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Banana Peel', 'Trap', 10, 12, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Rake', 'Trap', 18, 20, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Marbles', 'Trap', 30, 35, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Quicksand', 'Trap', 45, 50, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Trapdoor', 'Trap', 75, 85, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('TNT', 'Trap', 90, 180, -1, 1, '{"trapped": {"rounds": -1}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Railroad', 'Trap', 200, 200, -1, -1, '{"trapped": {"rounds": -1}}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('$1 Bill', 'Lure', 0, 0, 60, 1, '{"lured": {"rounds": 3}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Small Magnet', 'Lure', 0, 0, 55, -1, '{"lured": {"rounds": 3}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('$5 Bill', 'Lure', 0, 0, 70, 1, '{"lured": {"rounds": 4}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Big Magnet', 'Lure', 0, 0, 65, -1, '{"lured": {"rounds": 4}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('$10 Bill', 'Lure', 0, 0, 80, 1, '{"lured": {"rounds": 5}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Hypno Goggles', 'Lure', 0, 0, 75, -1, '{"lured": {"rounds": 5}}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Presentation', 'Lure', 0, 0, 90, -1, '{"lured": {"rounds": 9}}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Bike Horn', 'Sound', 3, 4, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Whistle', 'Sound', 5, 7, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Bugle', 'Sound', 9, 11, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Aoogah', 'Sound', 14, 16, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Elephant Trunk', 'Sound', 19, 21, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Foghorn', 'Sound', 25, 50, 95, -1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Opera Singer', 'Sound', 90, 90, 95, -1, '{}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Cupcake', 'Throw', 4, 6, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Fruit Pie Slice', 'Throw', 8, 10, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Cream Pie Slice', 'Throw', 14, 17, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Whole Fruit Pie', 'Throw', 24, 27, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Whole Cream Pie', 'Throw', 36, 40, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Birthday Cake', 'Throw', 48, 100, 75, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Wedding Cake', 'Throw', 120, 120, 75, -1, '{}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Squirting Flower', 'Squirt', 3, 4, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Glass of Water', 'Squirt', 6, 8, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Squirt Gun', 'Squirt', 10, 12, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Seltzer Bottle', 'Squirt', 18, 21, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Fire Hose', 'Squirt', 27, 30, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Storm Cloud', 'Squirt', 48, 80, 95, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Geyser', 'Squirt', 105, 105, 95, -1, '{}');

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Flower Pot', 'Drop', 10, 10, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Sandbag', 'Drop', 18, 18, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Anvil', 'Drop', 30, 30, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Big Weight', 'Drop', 45, 45, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Safe', 'Drop', 60, 70, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Grand Piano', 'Drop', 85, 170, 50, 1, '{}');
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum, statusEffect) VALUES ('Toontanic', 'Drop', 180, 180, 50, -1, '{}');

CREATE TABLE info (
	id SERIAL PRIMARY KEY,
	content JSON
);

INSERT INTO info (content) VALUES ('{"content": ["This calculator is used for calculations in the game Toontown Rewritten. Toontown Rewritten, made by Joey Ziolkowski, is a fan-revival of Disney’s closed MMORPG Toontown Online, where anthropomorphic animals called Toons engage in the colorful world in Toontown by participating in various activities.",
	"However, an invasion of evil robots called Cogs are taking over Toontown by industrializing the city with colorless buildings. But the toons can fight back against these Cogs by using cartoony weapons called Gags to destroy them."]}');
INSERT INTO info (content) VALUES ('{"content": ["There are seven types of Gags called Gag Tracks that provide different abilities against these Cogs:",
	"Toon-Up: Heals Toons, but deals no damage against Cogs.",
	"Trap: Deals powerful damage, but requires a Lure Gag to execute.",
	"Lure: Not only that it prevents Cogs from attacking, but also draws them into Trap Gags and deals more damage against Throw and Squirt Gags.",
	"Sound: Deals damage to all Cogs, but the damage dealt is weak.",
	"Throw: Deals higher damage against Cogs, but has a lower accuracy.",
	"Squirt: Provides higher accuracy against Cogs, but deals lower damage.",
	"Drop: Deals powerful damage, but has a very low accuracy."]}');
INSERT INTO info (content) VALUES ('{"content": ["This calculator is designed because the developers did not provide a clear indication on how much HP a Cog has left.",
	"Even though a TTR calculator already exists known as big.brain.io, this calculator will provide status effects, change a gag''s damage value, and deal damage toward multiple Cogs."]}');
INSERT INTO info (content) VALUES ('{"content": ["To get started, click on any of the Gags on the panel to start calculating.",
	"Hovering over a Gag will provide information about what the Gag does on the right screen.",
	"Clicking on that Gag will make that Gag appear on the top screen for the calculation. You can modify the Gag''s damage by typing the damage value on the bottom of its panel. If a Gag is organic (green leaf icon), click on the ''Org'' button to provide an organic boost on that Gag. To remove that Gag for the calculation, click on the ''X'' button.",
	"Clicking on the ''Next Turn'' button will apply the calculated damage for the next turn. Clicking on the ''Clear'' button will remove all damage and status appliances from the calculation."]}');