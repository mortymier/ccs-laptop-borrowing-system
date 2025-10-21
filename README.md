**SETUP GUIDE**
---
**1.	Prerequisites**

    > Node.js
    
    > MySQL Workbench
    
    > VS Code
    
    > IntelliJ IDEA (recommended for Spring Boot development)
    
---
**2.	Clone Repository - Download as ZIP**

    > Extract the folder inside the ZIP file (ccs-laptop-borrowing-system-main)
    
    > Changes you make in this folder will be tracked by git

   <img width="976" height="540" alt="Screenshot 2025-10-21 211308" src="https://github.com/user-attachments/assets/2c9fb716-3e47-4c9d-9a85-039a9c236679" />
   
---
**3. Install NPM packages for the client React app**

    > Open terminal and make sure the current directory is the project folder
    
    > Change directory to client React folder: > cd client

    > Install npm packages: > npm install

    > Run client React app: > npm start

    > Your React app will now run and can be accessed on the browser using the link: http://localhost:8080/

  <img width="1366" height="768" alt="Screenshot (1112)" src="https://github.com/user-attachments/assets/3173dc7c-5e7b-4fef-9257-ef2368e8ea29" />
  
--- 
**4. Find application.properties in server Spring Boot folder**

      > Change password to your MySQL connection's password
      
  <img width="1366" height="768" alt="Screenshot (1113)" src="https://github.com/user-attachments/assets/192220d5-d86c-4b82-af99-6d1cd36bbf0f" />

---
**5. Create database in Workbench**

     > Run the query: > CREATE DATABASE db_lbsv2;

  <img width="607" height="409" alt="Screenshot 2025-10-21 114614" src="https://github.com/user-attachments/assets/c145c3a9-e0d8-4c28-8641-48a2e306b100" />

---
**6. Run server Spring Boot app**

    > Keep your MySQL Workbench connection open 
    
    > Open your code editor and find ServerApplication.java in the server folder

    > Find the run button in your editor

    > After a successful run, tables will be automatically created in your database based on the entity files found in com/lbs/server/entity

  <img width="1235" height="537" alt="Screenshot 2025-10-21 213933" src="https://github.com/user-attachments/assets/61769974-888c-4430-ac39-f968005c4f71" />

    > If both the React and Spring Boot app are successfully running, you can now start testing



