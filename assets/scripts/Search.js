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
				if (response['type'] != "" && response['email'] != "") {
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
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
        }
		markers = [];
        var skill = $('#search').val().toLowerCase();
        $.ajax({
            url:'/tutors?skill='+skill,
            type:'GET',
            dataType:'json',
            contentType:'application/json; charset=utf-8',
            success: function(response){
                //display the tutor list

                if (response.length == 0){

                	tmp = 'No tutor found!'
                }
                else{
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

						+ '<li class = "list-group-item"><button type="button" class="button glyphicon glyphicon-thumbs-up" onclick="updateLike(this,\''+response[i]["email"]+'\')">  '+response[i]['like']+'</button>'
						+ '<button type="button" class="button glyphicon glyphicon-thumbs-down" onclick="updateDislike(this,\''+response[i]["email"]+'\')">  '+response[i]['dislike']+'</button></li>'

						+ '<li class = "list-group-item">'
						+ '<button type="button" class="button" data-toggle="modal" data-target="#emailPopup" onclick="EmailBox(\'' + response[i]['email'] + '\')">Email Me!</button>'
						+ '</li>'
						+ '</ul></li>';
					addMarker(response[i]['username'], response[i]['email'],response[i]['skills'], response[i]['zipcode'], response[i]['about']);
                	}
            	}

                console.log(tmp);
                $('#result').append(tmp);
                $('.tutorinfo').css('display','none');
                $('.tutor').click(this, function(){
                    $user = $(this);
                    $content = $user.next();
                    $content.slideToggle(500);
                });
                $()
            }
        });
    }


    function searchByUsername(){
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
        }
		markers = [];
        var tutor = $('#searchByUsername').val().toLowerCase();
        $.ajax({
            url:'/tutors?tutor='+tutor,
            type:'GET',
            dataType:'json',
            contentType:'application/json; charset=utf-8',
            success: function(response){
                //display the tutor list
                if (response.length == 0){

                	tmp = 'Username does not exist!'
                }
                else{
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

						+ '<li class = "list-group-item"><<button type="button" class="button glyphicon glyphicon-thumbs-up" onclick="updateLike(this,\''+response[i]["email"]+'\')">  '+response[i]['like']+'</button>'
						+ '<button type="button" class="button glyphicon glyphicon-thumbs-down" onclick="updateDislike(this,\''+response[i]["email"]+'\')">  '+response[i]['dislike']+'</button></li>'

						+ '<li class = "list-group-item">'
						+ '<button type="button" class="button" data-toggle="modal" data-target="#emailPopup" onclick="EmailBox(\'' + response[i]['email'] + '\')">Email Me!</button>'
						+ '</li>'
						+ '</ul></li>';
					addMarker(response[i]['username'], response[i]['email'],response[i]['skills'], response[i]['zipcode'], response[i]['about']);
                	}
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

function updateLike(el, email){
	var content = $(el);
	console.log(content);
	console.log(email);
	$.ajax({
		url:'/updateLike?email='+email,
		type:'GET',
		dataType:'json',
		contentType:'application/json; charset=utf-8',
		success: function(response){
			var like = response['like'];
			var results = '  '+like;
			content.text(results);
		}
	});
	//console.log(like);
	//$(this).attr('value') = 'Likes '+ like;
	console.log('request is sent');
}

function updateDislike(el, email){
	var content = $(el);
	console.log(content);
	console.log(email);
	$.ajax({
		url:'/updateDislike?email='+email,
		type:'GET',
		dataType:'json',
		contentType:'application/json; charset=utf-8',
		success: function(response){
			var dislike = response['dislike'];
			var results = '  '+dislike;
			content.text(results);
		}
	});
	//console.log(like);
	//$(this).attr('value') = 'Likes '+ like;
	console.log('request is sent');
}

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

var map = null; 
var markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: {lat : 43.653226, lng : -79.3831843}
	});
}

function addMarker(username, email, skills, zipcode, about) {

	var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
			'<div><span>'+username+'</span></div>'
					+ '<ul class = "list-group tutorinfo">'
					+ '<li class = "list-group-item">Email: '+email+'</li>' 
					+ '<li class = "list-group-item">Skills: '+skills+'</li>'
					+ '<li class = "list-group-item">Zipcode: '+zipcode+'</li>' 
					+ '<li class = "list-group-item">About: '+about+'</li>'
					+ '<li class = "list-group-item">'
					+ '<button type="button" class="button" data-toggle="modal" data-target="#emailPopup" onclick="EmailBox(\'' + email + '\')">Email Me!</button>'
					+ '</li>'
					+ '</ul>' +
            '</div>'+
            '</div>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'address': zipcode}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				title: username
			});
			
			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});
			
			markers.push(marker);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}



