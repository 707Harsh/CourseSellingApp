
# Course selling server

I have made this server as a part of assignments given in Harkirat's Cohort 2.0

## Description

Here I am using jwt's ( jsonwebtoken ) for authentication.
I have introduced the signup and signin endpoints for both users and admins.  
To validate the inputs I am using an input validation library called zod.   
In every authenticated requests, you need to send the jwt in headers (Authorization : "Bearer <actual token>").  
You will have to use mongodb to store all the data persistently, and a tool to hit endpoints such as Postman.


## Setting up the project

To set up this project locally fork this repository and clone it in some folder. Then in that folder run the following commands : 

```bash
  npm init -y
  npm install express body-parser mongoose jsonwebtoken zod
```
Make sure to add your mongoDB connection url in db/index.js file and you are connected to your database deployment before running the project.  
After all this you may navigate to the folder in which you cloned this project and run the following command to start the server:

```bash
  node index.js
```
Then you may use a tool such as Postman to hit various endpoints which are mentioned below.

## Routes

### Admin Routes:

- POST /admin/signup  
  Description: Creates a new admin account.  
  Input Body: { username: 'admin', password: 'pass' }  
  Output: { message: 'Admin created successfully' }
- POST /admin/signin  
  Description: Logs in an admin account.  
  Input Body: { username: 'admin', password: 'pass' }  
  Output: { token: 'your-token' }
- POST /admin/courses  
  Description: Creates a new course.  
  Input: Headers: { 'Authorization': 'Bearer <your-token>' }  
  Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }  
  Output: { message: 'Course created successfully', courseId: "new course id" }
- GET /admin/courses  
  Description: Returns all the courses.  
  Input: Headers: { 'Authorization': 'Bearer <your-token>' }  
  Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com'}] }

### User routes

- POST /users/signup  
  Description: Creates a new user account.  
  Input Body: { username: 'user', password: 'pass' }  
  Output: { message: 'User created successfully' }
- POST /users/signin  
  Description: Logs in a user account.  
  Input Body: { username: 'user', password: 'pass' }  
  Output: { token: 'your-token' }
- GET /users/courses  
  Description: Lists all the courses.  
  Input: Headers: { 'Authorization': 'Bearer <your-token>' }  
  Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }, ... ] }
- POST /users/courses/:courseId  
  Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.  
  Input: Headers: { 'Authorization': 'Bearer <your-token>' }  
  Output: { message: 'Course purchased successfully' }
- GET /users/purchasedCourses  
  Description: Lists all the courses purchased by the user.  
  Input: Headers: { 'Authorization': 'Bearer <your-token>' }  
  Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com'}] }