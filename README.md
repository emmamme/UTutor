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

## Features:
__1. Input Validation__
  1. __Server-side validation__ using express-validator
  2. Used a few built-in functions such as isEmail, isLength
  3. Customized the following two:
 ```JavaScript
  customValidators: {

	isZipcode: function(value) {
		return value.search( /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/ ) !== -1;
    },
	isSkills: function(value) {
		if (value.search( /^[0-9a-zA-Z ]{1,20}(,[0-9a-zA-Z ]{1,20})*$/ ) !== -1) {
			var array = value.split(',');
			var noEmptyValue = true;
			array.forEach(function(part, index, theArray) {
				theArray[index] = theArray[index].trim();
				console.log("Length: "+ theArray[index].length);
				if (theArray[index].length < 1) {
					noEmptyValue = false;
					return;
				}
			});
			return noEmptyValue;
		}
		else {
			return false;
		}
    }
```
  4. MongoDB Model validation with customized error message. Example:
```JavaScript
        skills: {
            type: String, required: [true, 'Skills required']
        },
        zipcode: {
            type: String, required: [true, 'Zipcode required']
        }
```

__2. Page Authentication__

In case of a user going to an unauthorized url (i.e. [http://csc309-ututor.herokuapp.com/views/AdminDashboard.html](http://csc309-ututor.herokuapp.com/views/AdminDashboard.html)) before logging in, we have the following fuction to check if the user has the privilege to view the page.
  
It sends a GET request to the server to check if the session is empty and the user type is "admin"
```JavaScript
function getUserFromSession() {
        $.ajax({
            url: "/userinsession",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if (response['type'] == "admin" && response['email'] != "") {
                    $(".ututor_user").text(response['username'] + " (" + response['email'] + ")");
                    
                }
                else {
                    window.location.href = "../index.html";
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
});
```

__3. Google Map API__

Since we have postal code for each user, it allows us to display them on a map.
  1. We first use Google's Geocoding API to convert the postal codes of the users from search result to longitude and latitude which is the only allowed input for Google Map API
  2. Then we mark them on the map with information box.
  
__4. Email function with nodemailer__

For each tutor in search result,  there is a button "Email Me" which allows a user to send email to the tutor through our application email. 

__5. Like and Dislike a Tutor__

In the search result, a tutor can be liked or disliked. Number of likes and dislikes are recorded in database.


__5. Responsive design for Some pages__

With the help of Bootstrap, we made some pages including adminDashboard.html and index.html responsive.
