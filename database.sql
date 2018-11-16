CREATE TABLE person (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "group_id" int references groups(id)
);
CREATE TABLE groups (
	"id" serial primary key, 
	"name" varchar (500)	
);