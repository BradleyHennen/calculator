CREATE TABLE "calculator" (
    "id" SERIAL PRIMARY KEY,
	"equation" VARCHAR(150) NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);