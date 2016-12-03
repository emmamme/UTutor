$(function() {
	// ======== Switch between login, student register, and tutor registor forms =================
	$('#student_register_form_link').click(function(e) {
		$("#student_register_form").delay(100).fadeIn(100);
 		$("#login_form").fadeOut(100);
		$('#login_form_link').removeClass('active');
		$("#tutor_register_form").fadeOut(100);
		$('#tutor_register_form_link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#tutor_register_form_link').click(function(e) {
		$("#tutor_register_form").delay(100).fadeIn(100);
 		$("#login_form").fadeOut(100);
		$('#login_form_link').removeClass('active');
		$("#student_register_form").fadeOut(100);
		$('#student_register_form_link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$("#button_init_db").click(function(){
		var confirmation = prompt("Please enter the following characters to confirm: =&$%# ", "");
		if (confirmation == "=&$%#") {
			var url = "/init";
			$.get(url, function (data) {
				alert(data);
			})  
		}   
    })
	
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

// ======== Student register =================
function studentRegister() {
	var type = "student";
	var username = $("#student_username").val().toLowerCase(); 
	var email = $("#student_email").val().toLowerCase(); 
	var password = $("#student_password").val();
	var confirm_password = $("#student_confirm_password").val();
	var skills = $("#student_skills").val().toLowerCase(); 
	var zipcode = $("#student_zipcode").val().toLowerCase(); 
	var about = $("#student_about").val();
	
	if (password != confirm_password) {
		alert("Please enter the same password.");
		return null; 
	}
	
	var data = {
		"type": type,
		"username": username,
		"email": email,
		"password": password,
		"skills": skills,
		"zipcode": zipcode,
		"about": about
	};
	
	$.ajax({
		url: "/userByAdmin",
		type: "POST",
		dataType: "text",
		contentType: "application/json; charset=utf_8",
		data: JSON.stringify(data),
		success: function(response) {
			alert(response);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.responseText);
		}
	});
}

// ======== Tutor register =================
function tutorRegister() {
	var type = "tutor";
	var username = $("#tutor_username").val().toLowerCase(); 
	var email = $("#tutor_email").val().toLowerCase(); 
	var password = $("#tutor_password").val();
	var confirm_password = $("#tutor_confirm_password").val();
	var skills = $("#tutor_skills").val().toLowerCase(); 
	var zipcode = $("#tutor_zipcode").val().toLowerCase(); 
	var about = $("#tutor_about").val();
	
	if (password != confirm_password) {
		alert("Please enter the same password.");
		return null; 
	}
	
	var data = {
		"type": type,
		"username": username,
		"email": email,
		"password": password,
		"skills": skills,
		"zipcode": zipcode,
		"about": about
	};
	
	$.ajax({
		url: "/userByAdmin",
		type: "POST",
		dataType: "text",
		contentType: "application/json; charset=utf_8",
		data: JSON.stringify(data),
		success: function(response) {
			alert(response);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.responseText);
		}
	});
}
