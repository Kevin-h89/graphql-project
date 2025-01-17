**Overview:**<br/>

Project based off of the Open Study College backend test: https://github.com/Open-Study-College/osc-backend-tech-test<br/>
Aim of the project is to implement GraphQL API Queries against a database (preference of SQL) and perform certain mutations and user authentication.<br/>

**To Run Project:**<br/>

(1) Need to have a local mysql server running, and have the **university** database provided with this project (files/mysql/university_db.sql)<br/>
(2) Can run the project using command: **npm start**<br/>
(3) The server can be accessed in the broswer using: http://localhost:4000/graphql<br/>

**Outstanding Items:**<br/>

(1) Add mutations (add, update, delete)<br/>
(2) JWT Authentication (install necessary packages such as jsonwebtoken, bcryptjs etc., set up environment variables, add authentication middleware, update MySQL user model to have email and password fields, create signup and login)<br/>
(3) Add a GUI to interact with the backend, and robust testing solution<br/>
(4) Update to use TypeScript, and organise the code into a maintainable and scalable structure, rather than one file, add additional security measures to protect DB password, and extract DB connection to its own module<br/>
