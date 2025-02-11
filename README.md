# Event Planning System

A simple event planning application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows admins to manage events and users to view and book events with search functionality.


## Demo

Click the link below to see the demonstration of the Event Planning System.

Link 👉 https://drive.google.com/file/d/1-IY0wHUNpT9FVWahgqEvxbOD0KpoQjCp/view?usp=sharing 👈


## Features

### Admin
- Create Event: Add new events with a name, description, date, time, location, capacity, and four related images.
- Edit Event: Update the details of an existing event.
- Delete Event: Remove events from the system.
- View Bookings: See all currently booked events with user details.
- View Registered Users: Display all users who have registered on the platform.

### User
- View Events: Browse all available events.
- Search Events: Filter events by name.
- Book Event: Select and book a desired event.
- User Registration & Login: Register as a user to access event booking.

### Authentication & Access Control
- Admin Access: Users who register as admins can log in to both the admin panel (with event management features) and the user site.
- User Access: Users who register as regular users can only log in to the user site (without admin features).


## Technologies Used

### Frontend
- React with Create React App
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB for the database
- Multer for handling multiple image uploads
- dotenv for environment variables


## Installation

Clone the repository and navigate to each project folder to install dependencies.
```bash
  git clone https://github.com/MrTharinduDasantha/Event-Planning-System.git
  cd Event-Planning-System
```
#### Folder Setup
The project is divided into three main folders: admin, frontend, and backend. You will need to install dependencies for each.
- Navigate to each folder (admin, frontend, backend) and run.
```bash
npm install
```
#### Environment Variables
Before running the app, configure the .env file in the server folder with the necessary environment variables.
- Create a .env file in the backend folder.
- Replace placeholders with your actual values:
```bash
PORT = 5000
JWT_SECRET =  event_planning_system
MONGO_URI = Enter your mongodb uri
```
#### Run the Project.
- Start the backend server
```bash
cd backend
npm start
```
- Start the admin
```bash
cd ../admin
npm start
```
- Start the frontend
```bash
cd ../frontend
npm start
```


## Usage
1. Admin
- Navigate to the Admin Dashboard (http://localhost:3000).
2. Client
- Open the Frontend Interface (http://localhost:3001.


## Screenshots

![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%203.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%204.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%205.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%206.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%207.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%208.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%209.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2010.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2011.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2012.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2013.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2014.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2015.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2016.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2017.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2018.png)
![image alt](https://github.com/MrTharinduDasantha/Event-Planning-System/blob/26ee9504e3e2521872208203ea87d82ce3568e13/Img%20-%2019.png)

<h4 align="center"> Don't forget to leave a star ⭐️ </h4>
