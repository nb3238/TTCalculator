DROP DATABASE tt_calc;
CREATE DATABASE tt_calc;
\c tt_calc
CREATE TABLE gags (
	id SERIAL PRIMARY KEY,
	gagName VARCHAR(30),
	gagType VARCHAR(20),
	minDmg INT,
	maxDmg INT,
	accuracy INT,
	targetNum INT
);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Feather', 'Toon-Up', 8, 10, 70, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Megaphone', 'Toon-Up', 15, 18, 70, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Lipstick', 'Toon-Up', 27, 30, 70, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Bamboo Cane', 'Toon-Up', 40, 45, 70, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Pixie Dust', 'Toon-Up', 50, 60, 70, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Juggling Cubes', 'Toon-Up', 75, 105, 70, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('High Dive', 'Toon-Up', 210, 210, 95, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Banana Peel', 'Trap', 10, 12, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Rake', 'Trap', 18, 20, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Marbles', 'Trap', 30, 35, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Quicksand', 'Trap', 45, 50, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Trapdoor', 'Trap', 75, 85, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('TNT', 'Trap', 90, 180, 0, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Railroad', 'Trap', 200, 200, 0, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('$1 Bill', 'Lure', 0, 0, 60, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Small Magnet', 'Lure', 0, 0, 55, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('$5 Bill', 'Lure', 0, 0, 70, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Big Magnet', 'Lure', 0, 0, 65, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('$10 Bill', 'Lure', 0, 0, 80, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Hypno Goggles', 'Lure', 0, 0, 75, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Presentation', 'Lure', 0, 0, 90, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Bike Horn', 'Sound', 3, 4, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Whistle', 'Sound', 5, 7, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Bugle', 'Sound', 9, 11, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Aoogah', 'Sound', 14, 16, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Elephant Trunk', 'Sound', 19, 21, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Foghorn', 'Sound', 25, 50, 95, -1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Opera Singer', 'Sound', 90, 90, 95, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Cupcake', 'Throw', 4, 6, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Fruit Pie Slice', 'Throw', 8, 10, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Cream Pie Slice', 'Throw', 14, 17, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Whole Fruit Pie', 'Throw', 24, 27, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Whole Cream Pie', 'Throw', 36, 40, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Birthday Cake', 'Throw', 48, 100, 75, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Wedding Cake', 'Throw', 120, 120, 75, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Squirting Flower', 'Squirt', 3, 4, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Glass of Water', 'Squirt', 6, 8, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Squirt Gun', 'Squirt', 10, 12, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Seltzer Bottle', 'Squirt', 18, 21, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Fire Hose', 'Squirt', 27, 30, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Storm Cloud', 'Squirt', 48, 80, 95, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Geyser', 'Squirt', 105, 105, 95, -1);

INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Flower Pot', 'Drop', 10, 10, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Sandbag', 'Drop', 18, 18, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Anvil', 'Drop', 30, 30, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Big Weight', 'Drop', 45, 45, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Safe', 'Drop', 60, 70, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Grand Piano', 'Drop', 85, 170, 50, 1);
INSERT INTO gags (gagName, gagType, minDmg, maxDmg, accuracy, targetNum) VALUES ('Toontanic', 'Drop', 180, 180, 50, -1);