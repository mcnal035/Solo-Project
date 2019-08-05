
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "guest_log" (
	"id" serial PRIMARY KEY,
	"text" varchar(999),
	"user_id" int REFERENCES "user",
	"date_stamp" DATE
	);
	



CREATE TABLE "schedule" (
	"id" serial PRIMARY KEY,
	"start_date" DATE,
	"end_date" DATE,
	"user_id" INT REFERENCES "user",
	"open_closed" BOOLEAN
	);

ALTER TABLE "user"
ADD COLUMN "first_name" varchar(40) UNIQUE,
ADD COLUMN	"last_name" varchar(40),
ADD COLUMN	"phone_number" varchar(20)
	;