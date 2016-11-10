#PART 1 - Description of application
The purpose of uTutor is to help people find tutors in their field of interest, such as a University course tutor, a painting tutor or a bartending tutor. Users can find a tutor based on their interests and/or location. Users can also connect with other users based on their interests and/or location. In addition, uTutor features a rating system which allows users to rate a tutor and add comments. 

The backend of the application will be implemented using Express.js and data will be stored in Mongodb. 
#PART 2 - List of user interactions and data storage
##Interactions
1. Three Types of users: admin, user, tutor.
2. Registration - when users use uTutor for the first time, they are required to register. Their information will be stored into database once validated.
  1. For regular users, information required:
    - Username
    - Gender
    - Email
    - Password
  2. For tutors, information required:
    - Username
    - Gender
    - Email
    - Password
    - Fields of interest
    - Postal Code
    - About
3. Login - admins, registered tutors and users can login with their username and password.
  1. Admins will be directed to Admin page in which they can
    - Change password
    - Add, update, and delete users and their information
    - Initialize/repopulate the database
  2. Regular users will be directed to Search TUtor page in which they can
    1. Search tutor by location (Enter a postal code)
      - Tutors nearby will be displayed on a Google Map and also in a list
    2. Search tutor by interest
      - Matched tutors will be displayed in a list
    3. Search tutor by username
  3. Tutors will be directed to their profile page in which they can
    1. Change password and other information
    2. Check unread messages
    3. Check their rating and comments
4. Chat - Users and tutors can chat with each other online through uTutor.
  - Chat can be initiated from search results 
    - Each result is a link which links to a chat page only for the tutor and the user clicked on it
    - Messages will be stored in database
5. Rating - users can rate each tutor and add comments to them
  - User can go to each totor's profile page to rate them and add comments to them

##Data Stored in Database
1. User profile
  1. username
  2. email
  3. password
  4. fields of interests
  5. User type
  6. etc.
2. Ratings and comments
3. Chat history

#PART 3 - HTML sketch
See csc309.pdf
