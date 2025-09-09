var browser = (window.browser)? window.browser : window.chrome;
var $ = function( id ) { return document.getElementById( id ); };

var credentials = new Object();
function authenticate(){
	url = $('url').value;
	usr = $('username').value;
	pwd = $('password').value;
	const authpath = '/auth/login';
	const authurl = url+authpath;
	const payloadProto = {
		username:null,
		password:null
	};
	authpayload = Object.create(payloadProto);
	authpayload.username = usr;
	authpayload.password = pwd;
	
	fetch(authurl, {
	  method: "POST",
	  body: JSON.stringify(authpayload),
	  headers: {
		"Content-type": "application/json; charset=UTF-8"
	  }
	})
	.then((response) => {
		console.log("response.status =", response.status); // response.status = 200
		if(response.status === 403){
			deauthenticate();
		}
		console.log(response);
		return response.json();
	})
	.then((data) => {
		saveCredentialsToLocalstorage(url, data.username, data.subsonicToken, data.subsonicSalt);
		
		var inputs = document.getElementsByTagName("input");
		for (let input of inputs){
			input.disabled = "disabled";
		};
			
		$('loginButton').style.display = "none";
		$('logoutButton').style.display = "inline-block";
		console.log("Authenticated via API from entered credentials");
	})
	.catch(console.error);
}
function deauthenticate(){
	let clearStorage = browser.storage.local.clear();
	var inputs = document.getElementsByTagName("input");
	for (let input of inputs){
		input.disabled = "";
	};
	console.log("Not authenticated");
	$('logoutButton').style.display = "none";
	$('loginButton').style.display = "inline-block";
};

function saveCredentialsToLocalstorage(url, username, token, salt){
	let credentials = {
		url: url,
		username: username,
		token: token,
		salt: salt,
	};
	browser.storage.local.set(credentials);
}

document.addEventListener('DOMContentLoaded', function() {

	const loginButton = $('loginButton');
	const logoutButton = $('logoutButton');
	if (loginButton) {
		loginButton.addEventListener('click', authenticate);
	}
	if (logoutButton) {
		logoutButton.addEventListener('click', deauthenticate);
	}
	
	browser.storage.local.get(['url', 'username', 'token', 'salt'], function(results){		
		credentials = results;
		
		if(credentials.url && credentials.username && credentials.token && credentials.salt){
			$('url').value = credentials.url;
			$('username').value = credentials.username;
			
			var inputs = document.getElementsByTagName("input");
			for (let input of inputs){
				input.disabled = "disabled";
			};
			
			$('loginButton').style.display = "none";
			console.log("Authenticated from localstorage");
		}else{
			var inputs = document.getElementsByTagName("input");
			for (let input of inputs){
				input.disabled = "";
			};
			console.log("Not authenticated");
			$('logoutButton').style.display = "none";
		}
	});
});