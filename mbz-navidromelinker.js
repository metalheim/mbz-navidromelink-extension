var browser = (window.browser)? window.browser : window.chrome;
var $ = function( id ) { return document.getElementById( id ); };
var credentials = new Object();

function subsonicSearch3(queryterm){
	const searchendpoint = '/rest/search3';
	const searchurl = new URL(credentials["url"]+searchendpoint);
	searchurl.searchParams.append('c', "mbz-navidromelink");
	searchurl.searchParams.append('v', "1.8.0");
	searchurl.searchParams.append('f', "json");
	searchurl.searchParams.append('u', credentials["username"]);
	searchurl.searchParams.append('t', credentials["token"]);
	searchurl.searchParams.append('s', credentials["salt"]);
	searchurl.searchParams.append('query', queryterm);
	
	fetch(searchurl, {
	  method: "POST"
	})
	.then((response) => {
		console.log("Searching for mbid, response with status: "+response.status); // response.status = 200
		if(response.status === 403){
			let clearStorage = browser.storage.local.clear();
			//browser.action.openPopup();
			throw new Error("Authentication Failed");
		}
		return response.json();
	})
	.then((data) => {
		var searchResults = data["subsonic-response"]["searchResult3"];
		//console.log(searchResults);
		
		if(Object.keys(searchResults).length === 0){
			console.log("No matching MBID in navidrome");
		}else{
			if(searchResults.artist && searchResults.artist.length>0){
				var navidromelink = credentials.url+"/app/#/artist/"+searchResults.artist[0].id+"/show";
			}
			if(searchResults.album && searchResults.album.length>0){
				var navidromelink = credentials.url+"/app/#/album/"+searchResults.album[0].id+"/show";
			}
			console.log("Found matching MBID in navidrome: "+navidromelink);
			window.addEventListener('DOMContentLoaded', function() {
				addNavidromeLink(navidromelink);
			});
		}
	})
	.catch(console.error);
}

	browser.storage.local.get(['url', 'username', 'token', 'salt'], function(results){	
		credentials = results;
		if(credentials.url && credentials.username && credentials.token && credentials.salt){
			console.log("Authenticated from localstorage");
			
			const uuidregex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g;
			var mbid = window.location.pathname.match(uuidregex);
			
			if(mbid){
				console.log("mbid found: "+mbid[0]);
				subsonicSearch3(mbid[0]);
			}else{
				console.log("authenticated but no mbid found in url");
			}
		}else{
			console.log("Not authenticated");
			//browser.action.openPopup();
		}
	});

function addNavidromeLink(navidromelink){
	const sidebar = $('sidebar');
	const newListItem = document.createElement('li');
	const anker = document.createElement('a');
	newListItem.classList.add("navidrome-favicon");
	anker.href=navidromelink;
	anker.textContent = "Navidrome";
	anker.target = '_blank';
	newListItem.appendChild(anker);
	
	var linklist = document.getElementsByClassName("external_links")[0];
	if(!linklist){
		externallinksheader = document.createElement('h2');
		externallinksheader.textContent = "External Links";
		externallinksheader.classList.add("external-links");
		linklist = document.createElement('ul');
		linklist.classList.add("external_links");
		sidebar.appendChild(externallinksheader);
		sidebar.appendChild(linklist);
	}
	linklist.appendChild(newListItem);
}