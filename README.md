# Group1 Project - uTutor

## Main Page: __[http://csc309-ututor.herokuapp.com/](http://csc309-ututor.herokuapp.com/)__

Admin Account:

    Email: admin@ututor.com
    Password: admin

## To Run Locally:
1. Create a folder called "__data__" in the main folder
2. Run
  ```
  npm install
  ```
3. Start a mongodb process e.g. 
  ```
  mongod --dbpath "C:/CSC309/group1/data"
  ```
4. Run
  ```
  nodemon server.js
  ```
5. Go to: __[http://localhost:3000/](http://localhost:3000/)__

## Introduction:
1. Three types of users: ___Admin___ and ___Tutor___ and ___Student___
2. Regular users can only registor as: ___Tutor___ or ___Student___
3. Login with email (unique identification) and password
  1. If user is an __admin__, she will be directed to __admin dashboard page__
  2. If user is a __tutor__, she will be directetd to her __profile page__
  3. If user is a __student__, she will be directed to __search page__
4. __Admin functions__
  1. Change any information (i.e. password, username, etc.) of any existing users
  2. Add users
  3. Delete Users
  4. Initialize database - drop all existing data except admin accounts
5. __Tutor and Student functions__
  1. Edit their own profiles except email
  2. Can search for tutors by username or by skills
  3. Search results will be displayed on google map and in a list
