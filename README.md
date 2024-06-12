# O.R.C.A
Optimal Relay for Clinical Assistance

## Usage
The purpose of this website is to provide a platform for communication between medical providers and patients. It offers a way to schedule and view appointments.

## Features
- A real time chat room for the patient and provider.
- A way to create and remove patients.
- A way to create and remove appoinments.
- A way to create and remove doctors.
- A way to create and remove offices.

## Walkthrough
When you first land on the site, there are two buttons: one for provider login and the other for patient login. The provider login requires an email and a password. The patient login requires a date of birth and a phone number.

After a provider logs in, they will be redirected to the provider homepage. On the provider homepage, there are buttons to make and remove appointments, view all patients and their appointments, view all doctors and their appointments, and view all offices.

At the top of the screen, there is a navbar. Depending on whether it's a provider or a patient that is logged in, it will be different. When a provider is logged in, there is a link to an admin login page.

The admin login form takes a four-digit code. After logging in, it will take the provider to the admin homepage. There are buttons to add and remove patients, doctors, and offices.

When a patient logs in, it will take them to the patient homepage. There, all the providers for the patient will be listed with a link to chat with them.

## Sample Data
Because, in a real setting, there would be separate software to manage the database for this website, there is currently sample data to test and try out the website.

There are two providers and two patients in the database.

### Providers
1. 
    - **Name**: HealthCare Clinic
    - **Email**: healthcare@gmail.com (Not a real email)
    - **Password**: healthcare
    - **Admin Password**: 6602

2. 
    - **Name**: Medical Associates
    - **Email**: medical@gmail.com (Not a real email)
    - **Password**: medical
    - **Admin Password**: 5678

### Patients
1. 
    - **Name**: John Doe
    - **Date of birth**: 1980-05-15
    - **Phone Number**: (123)-456-7890
2. 
    - **Name**: Alice Smith
    - **Date of birth**: 1992-09-20
    - **Phone Number**: (987)-654-3210

## Testing 
Testing was done with jest.

``jest``