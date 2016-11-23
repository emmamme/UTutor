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

    function search(){
        var tutor = $('#search').val().toLowerCase();
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
                    tmp += '<li><a href="/userprofile?email="' + repsonse[i]['email'] + '>'+response[i]['username']+'</a></li><br><p>'+response[i]['skills']+response[i]['about']+'</p>'
                }
                $('#result').append(tmp);
            }
        });
    }

    $('#go').click(function(){
        search();
    });
});


