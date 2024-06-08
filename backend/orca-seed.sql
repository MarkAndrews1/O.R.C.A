-- Seed data for providers
INSERT INTO providers (provider_name, provider_password, provider_admin_password, email, provider_img_url)
VALUES
    ('HealthCare Clinic', '$2b$12$Z/wfeoMlDYXlI8EbeoUSFelhlCfUDDqm4c4JY27VLmSf/TmbPMqgG', 6602, 'healthcare@gmail.com', 'https://img.freepik.com/free-vector/health-care-logo-icon_125964-471.jpg'),
    ('Medical Associates', '$2b$12$UyiRepc71PrUNGlE4CSbSOaVVNakh4yu23WWSIl.7mLsHgWzjk0KS', 5678, 'medical@gmail.com', 'https://i.pinimg.com/474x/a9/29/33/a929337a256b2cae37e2b95ecdb1a6f4.jpg');

-- Seed data for patients table
INSERT INTO patients (first_name, last_name, date_of_birth, phone_num)
VALUES ('John', 'Doe', '1980-05-15', 1234567890),
       ('Alice', 'Smith', '1992-09-20', 9876543210);

-- Seed data for offices table
INSERT INTO offices (address, provider_id, phone_num)
VALUES ('123 Main St, City1', 1, 5551234567),
       ('456 Elm St, City2', 1, 5559876543),
       ('789 Oak St, City3', 2, 5555678901);

-- Seed data for doctors table
INSERT INTO doctors (first_name, last_name, provider_id, profile_img_url)
VALUES ('Dr. James', 'Johnson', 1, 'https://www.hjhospitals.org/photos/doctors/_MG_1223t.jpg'),
       ('Dr. Emily', 'Williams', 1, 'https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg'),
       ('Dr. Michael', 'Brown', 2, 'https://media.istockphoto.com/id/1317036261/photo/portrait-of-smiling-male-doctor-in-white-uniform.jpg?s=612x612&w=0&k=20&c=jRDu9e7qeno_zw-asJsyeadMDxIFIIW5uHnJ5dc8HGg=');

-- Seed data for appointments table
INSERT INTO appointments (date, patient_id, doctor_id, office_id)
VALUES ('2024-06-01 09:00:00', 1, 1, 1),
       ('2024-06-05 10:30:00', 2, 2, 2),
       ('2024-06-10 11:15:00', 1, 1, 3);

-- Seed data for patient_provider table
INSERT INTO patient_provider (patient_id, provider_id)
VALUES (1, 1),
       (2, 1),
       (2, 2);

INSERT INTO messages (sender, provider_id, patient_id, content)
VALUES 
    ('provider', 1, 1, 'Hello, how are you?'),
    ('patient', 1, 1, 'Im doing well thank you!')
