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
                    tmp += '<div class = tutorinfo><p>Email: '+response[i]['email']+'</p><p>Skills: '+response[i]['skills']+'</p><p>Zipcode: '+response[i]['zipcode']+'</p><p>About: '+response[i]['about']+'</p></div></li>';
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
                    tmp += '<div class = tutorinfo><p>Email: '+response[i]['email']+'</p><p>Skills: '+response[i]['skills']+'</p><p>Zipcode: '+response[i]['zipcode']+'</p><p>About: '+response[i]['about']+'</p></div></li>';
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


