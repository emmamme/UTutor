# Lucas
- Done:
  1. login and signup
  2. Server-side validation
  3. logout
- Todo: 
  1. Heroku

# Marco
1. Need to restore the following piece in AdminDashboard.js (Lucas will do)
```javascript
$(function() {
	
	getUserFromSession();
	
	// Get the user name from the server by making an
    // ajax GET request to the url "/name"
    // The callback function on success will call updateUI
    // with the new value for name
    function getUserFromSession() {
        $.ajax({
            url: "/userinsession",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if (response['type'] == 'admin' && response['email'] != "") {
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
        
    }
});
```
2. Data validation (e.g. password) when updating user info on server side (Need to use Luas's code)
3. Are initializing and repopulating database the same thing?
4. Dynamic css
