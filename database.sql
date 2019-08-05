
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(40) NOT NULL UNIQUE,
	"password" varchar(40) NOT NULL,
	"first_name" varchar(40) NOT NULL UNIQUE,
	"last_name" varchar(40) NOT NULL,
	"phone_number" varchar(20),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "guest_log" (
	"text" varchar(999),
	"user_id" int NOT NULL,
	"date_stamp" DATE NOT NULL,
	CONSTRAINT "guest_log_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "schedule" (
	"id" serial NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"reservation" varchar(255) NOT NULL,
	"open_closed" BOOLEAN,
	CONSTRAINT "schedule_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("id") REFERENCES "guest_log"("user_id");


ALTER TABLE "schedule" ADD CONSTRAINT "schedule_fk0" FOREIGN KEY ("reservation") REFERENCES "user"("first_name");
