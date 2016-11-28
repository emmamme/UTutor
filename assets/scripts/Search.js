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
				if (response['type'] == 'student' && response['email'] != "") {
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

    function searchBySkill(){
        var skill = $('#search').val().toLowerCase();
        $.ajax({
            url:'/tutors?skill='+skill,
            type:'GET',
            dataType:'json',
            contentType:'application/json; charset=utf-8',
            success: function(response){
                //display the tutor list
                var tmp = '';
                var l = response.length;
                for (let i=0; i<l; i++){
                    //tmp += '<li><a href="#">'+response[i]['username']+'</a></li><br><p>'+response[i]['skills']+'</p>'
                    tmp += '<li><div class = "tutor" id = "user'+i+'" value ='+response[i]["email"]+'><span>'+response[i]['username']+'</span></div>';
                    tmp += '<ul class = "list-group tutorinfo">'
						+ '<li class = "list-group-item">Email: '+response[i]['email']+'</li>' 
						+ '<li class = "list-group-item">Skills: '+response[i]['skills']+'</li>'
						+ '<li class = "list-group-item">Zipcode: '+response[i]['zipcode']+'</li>' 
						+ '<li class = "list-group-item">About: '+response[i]['about']+'</li>'
						+ '<li class = "list-group-item">'
						+ '<button type="button" class="button" data-toggle="modal" data-target="#emailPopup" onclick="EmailBox(\'' + response[i]['email'] + '\')">Email Me!</button>'
						+ '</li>'
						+ '</ul></li>';
                }
                console.log(tmp);
                $('#result').append(tmp);
                $('.tutorinfo').css('display','none');
                $('.tutor').click(this, function(){
                    $user = $(this);
                    $content = $user.next();
                    $content.slideToggle(500);
                });
            }
        });
    }

    function searchByUsername(){
        var tutor = $('#searchByUsername').val().toLowerCase();
        $.ajax({
            url:'/tutors?tutor='+tutor,
            type:'GET',
            dataType:'json',
            contentType:'application/json; charset=utf-8',
            success: function(response){
                //display the tutor list
                var tmp = '';
                var l = response.length;
                for (let i=0; i<l; i++){
                    //tmp += '<li><a href="#">'+response[i]['username']+'</a></li><br><p>'+response[i]['skills']+'</p>'
                    tmp += '<li><div class = "tutor" id = "user'+i+'" value ='+response[i]["email"]+'><span>'+response[i]['username']+'</span></div>';
                    tmp += '<ul class = "list-group tutorinfo">'
						+ '<li class = "list-group-item">Email: '+response[i]['email']+'</li>' 
						+ '<li class = "list-group-item">Skills: '+response[i]['skills']+'</li>'
						+ '<li class = "list-group-item">Zipcode: '+response[i]['zipcode']+'</li>' 
						+ '<li class = "list-group-item">About: '+response[i]['about']+'</li>'
						+ '<li class = "list-group-item">'
						+ '<button type="button" class="button" data-toggle="modal" data-target="#emailPopup" onclick="EmailBox(\'' + response[i]['email'] + '\')">Email Me!</button>'
						+ '</li>'
						+ '</ul></li>';
                }
                console.log(tmp);
                $('#result').append(tmp);
                $('.tutorinfo').css('display','none');
                $('.tutor').click(this, function(){
                    $user = $(this);
                    $content = $user.next();
                    $content.slideToggle(500);
                });
            }
        });

    }

    $('#go').click(function(){
        $('#result').html("");
        searchBySkill();
    });
    $('#goByUsername').click(function(){
        $('#result').html("");
        searchByUsername();
    });
});

function sendEmail() {
	var toemail = $("#toemail").val().toLowerCase(); 
	var fromemail = $("#fromemail").val().toLowerCase();
	var subject = $("#subject").val();
	var body = $("#message").val();
	
	var data = {
		"toemail": toemail,
		"fromemail": fromemail,
		"subject": subject,
		"body": body
	};
	
	$.ajax({
		url: "/email",
		type: "POST",
		dataType: "text",
		contentType: "application/json; charset=utf_8",
		data: JSON.stringify(data),
		success: function(response) {
			if (response == "Success") {
				$(".close").click();
			}
			else {
				console.log(response);
				alert(response);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.responseText);
		}
	});
}

function EmailBox(toemail) {
	$.ajax({
		url: "/userinsession",
		type: "GET",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			if (response['type'] !== '' && response['email'] != "") {
				$("input[name=fromemail").val(response['username'] + " (" + response['email'] + ")");
			}
			else {
				window.location.href = "../index.html";
			}
		},
		error: function (xhr) {
			alert(xhr.responseText);
		}
	});
	
	$("input[name=toemail").val(toemail);
}

function searchtab(evt, method){
        // Declare all variables
    var i, tabcontsent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(method).style.display = "block";
    evt.currentTarget.className += " active";

    }


