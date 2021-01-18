CREATE DATABASE node_test_db;
CREATE TABLE BeerReviews (
	ReviewID int NOT NULL AUTO_INCREMENT,
	BeerName varchar(255) NOT NULL,
	BeerType varchar(255),
	AlcoholPercentage float,
	Score float NOT NULL,
	PRIMARY KEY (ReviewID)
);