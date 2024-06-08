CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "provider_name" TEXT NOT NULL,
    "provider_password" TEXT NOT NULL,
    "provider_admin_password" INT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "provider_img_url" TEXT,
    CONSTRAINT "pk_provider" PRIMARY KEY ("id"),
    CONSTRAINT "uc_provider_provider_name" UNIQUE ("provider_name"),
    CONSTRAINT "uc_provider_email" UNIQUE ("email")
);


CREATE TABLE "patients" (
    "id" SERIAL   NOT NULL,
    "first_name" TEXT   NOT NULL,
    "last_name" TEXT   NOT NULL,
    "date_of_birth" DATE   NOT NULL,
    "phone_num" BIGINT   NOT NULL,
    CONSTRAINT "pk_Patient" PRIMARY KEY ("id")
);

CREATE TABLE "offices" (
    "id" SERIAL   NOT NULL,
    "address" TEXT   NOT NULL,
    "provider_id" INT   NOT NULL,
    "phone_num" BIGINT   NOT NULL,
    CONSTRAINT "pk_Office" PRIMARY KEY ("id"),
    CONSTRAINT "fk_offices_provider_id" FOREIGN KEY ("provider_id") REFERENCES "providers" ("id") ON DELETE CASCADE
);

CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "provider_id" INT NOT NULL,
    "profile_img_url" TEXT,
    CONSTRAINT "pk_doctors" PRIMARY KEY ("id"),
    CONSTRAINT "fk_doctors_provider_id" FOREIGN KEY ("provider_id") REFERENCES "providers" ("id") ON DELETE CASCADE
);

CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP NOT NULL, 
    "patient_id" INT NOT NULL,
    "doctor_id" INT NOT NULL,
    "office_id" INT NOT NULL,
    CONSTRAINT "pk_appointments" PRIMARY KEY ("id"),
    CONSTRAINT "fk_appointments_patient_id" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_appointments_doctor_id" FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_appointments_office_id" FOREIGN KEY ("office_id") REFERENCES "offices" ("id") ON DELETE CASCADE
);


CREATE TABLE "patient_provider" (
    "id" SERIAL NOT NULL,
    "patient_id" INT NOT NULL,
    "provider_id" INT NOT NULL,
    CONSTRAINT "pk_patient_provider" PRIMARY KEY ("id"),
    CONSTRAINT "fk_patient_provider_patient_id" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_patient_provider_provider_id" FOREIGN KEY ("provider_id") REFERENCES "providers" ("id") ON DELETE CASCADE
);

CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "sender" VARCHAR(50) NOT NULL CHECK (sender IN ('provider', 'patient')),
    "provider_id" INT NOT NULL,
    "patient_id" INT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pk_messages" PRIMARY KEY ("id"),
    CONSTRAINT "fk_messages_provider_id" FOREIGN KEY ("provider_id") REFERENCES "providers" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_messages_patient_id" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE
);
