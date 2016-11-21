$(function() {
	// ======== Switch between login, student register, and tutor registor forms =================
    $('#login_form_link').click(function(e) {
		$("#login_form").delay(100).fadeIn(100);
 		$("#student_register_form").fadeOut(100);
		$('#student_register_form_link').removeClass('active');
		$("#tutor_register_form").fadeOut(100);
		$('#tutor_register_form_link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
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

});

// ======== User login =================
function login() {
	var email = $("#login_email").val();
	var password = $("#login_password").val();
	
	var data = {
		"email": email,
		"password": password
	};
	
	$.ajax({
		url: "/user",
		type: "GET",
		dataType: "text",
		contentType: "application/json; charset=utf-8",
		data: data,
		success: function(response) {
			if (response == "tutor") {
				window.location.href = "views/TutorProfile.html";
			}
			else if (response == "admin") {
				window.location.href = "views/AdminDashboard.html";
			}
			else if (response == "student") {
				window.location.href = "views/Search.html";
			}
			else {
				alert(response);
			}
		},
		error: function (xhr) {
			alert(xhr.responseText);
		}
	});
}

// ======== Student register =================
function studentRegister() {
	var type = "student";
	var username = $("#student_username").val();
	var email = $("#student_email").val();
	var password = $("#student_password").val();
	var confirm_password = $("#student_confirm_password").val();
	var skills = $("#student_skills").val();
	var zipcode = $("#student_zipcode").val();
	var about = $("#student_about").val();
	
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
		url: "/user",
		type: "POST",
		dataType: "text",
		contentType: "application/json; charset=utf_8",
		data: JSON.stringify(data),
		success: function(response) {
			if (response == "Success") {
				window.location.href = "views/Search.html";
			}
			else {
				alert(response);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.responseText);
		}
	});
}

// ======== Tutor register =================
function tutorRegister() {
	var type = "tutor";
	var username = $("#tutor_username").val();
	var email = $("#tutor_email").val();
	var password = $("#tutor_password").val();
	var confirm_password = $("#tutor_confirm_password").val();
	var skills = $("#tutor_skills").val();
	var zipcode = $("#tutor_zipcode").val();
	var about = $("#tutor_about").val();
	
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
		url: "/user",
		type: "POST",
		dataType: "text",
		contentType: "application/json; charset=utf_8",
		data: JSON.stringify(data),
		success: function(response) {
			if (response == "Success") {
				window.location.href = "views/TutorProfile.html";
			}
			else {
				alert(response);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.responseText);
		}
	});
}
