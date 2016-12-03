
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
					window.location.href = "../views/AdminDashboard.html";
				}
				else if (response['type'] == '' || response['email'] == ""){
					window.location.href = "../index.html";
				}
				else {
					getUserInfo();
				}
            },
			error: function (xhr) {
				alert(xhr.responseText);
			}
        });
    }
    
    function getUserInfo() {
		$.ajax({
			url: "/userprofile",
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				$(".ututor_user").text(data[0]['username'] + " (" + data[0]['email'] + ")");
				$('#email').text(data[0].email)
				$('td[name=username]').text(data[0].username)
				$('td[name=password').text(data[0].password)
				$('td[name=zipcode').text(data[0].zipcode)
				$('td[name=skills').text(data[0].skills)
				$('td[name=about').text(data[0].about)
				
				$("#edit").click(function(){
					Edit();

				})

			   $("#save").click(function(){
					Save();
				})
			},
			error: function (xhr) {
				alert(xhr.responseText);
			}
		});
	}
	
	function Edit() {
    
		$(".editable").each(function(){
			let cell = $(this);
			let email = $('#email').text()
			let id = cell.attr('name');
			if (!cell.hasClass("edittd")){
				let val = cell.html();
				cell
					.toggleClass('edittd')
					.html("")
					.append(`<input type='text' class='update' id=${id} name=${email} value='`+val+"'></input>");
			}
		})
	}

	function Save(){
		
		var username = $("#username").val().toLowerCase(); 
		var email = $("#email").html().toLowerCase(); 
		var password = $("#password").val();
		var skills = $("#skills").val().toLowerCase(); 
		var zipcode = $("#zipcode").val().toLowerCase(); 
		var about = $("#about").val();
		
		var data_send = {
			"username": username,
			"email": email,
			"password": password,
			"skills": skills,
			"zipcode": zipcode,
			"about": about
		};
		
		$.post("/updateprofile", data_send, function(data){
			if(data == "Success") {
				window.location.href = "Profile.html";
			}
			else {
				alert(data);
			}
		})
	}

});

