var forumContent = []


class forumPost {
	constructor(author,title,content,replies,response) {
		this.author = author // string
		this.title = title // string
		this.content = content // string
		this.replies = replies // {replyer: name, timeReplied: number (in ms)}
		this.response = response // {views: number, replies : number}
	}
	increaseTime(increment) {
		this.replies.timeReplied += increment
	}
	setTime(time) {
		this.replies.timeReplied = time
	}
}

// this is a demo, not that relevant at the moment
var newForumObject = document.createElement('div');
newForumObject.innerHTML = `<div class="card mb-2">
                            <div class="card-body p-2 p-sm-3">
                                <div class="media forum-item">
                                    <a href="#" data-toggle="collapse" data-target=".forum-content"><img
                                            src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                            class="mr-3 rounded-circle" width="50" alt="User" /></a>
                                    <div class="media-body">
                                        <h6><a href="#" data-toggle="collapse" data-target=".forum-content"
                                                class="text-body">forum post 5</a></h6>
                                        <p class="text-secondary">
                                            lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit
                                            amet
                                        </p>
                                        <p class="text-muted"><a href="javascript:void(0)">jackalds</a> replied <span
                                                class="text-secondary font-weight-bold">12 hours ago</span></p>
                                    </div>
                                    <div class="text-muted small text-center align-self-center">
                                        <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> 65</span>
                                        <span><i class="far fa-comment ml-2"></i> 10</span>
                                    </div>
                                </div>
                            </div>
                        </div>`



//var testForumPost = new forumPost("author","engaging title","content",{name:"your mom",timeReplied:1694910262474},{views : 5, replies : 1})
//forumContent[forumContent.length] = testForumPost
//console.log(forumContent[0])

var forumCount = 0;
// generates the forum post DOM object, but doesn't do the whole process
function generateForumPost(postIn,predefinedId) {
	var author = postIn.author;
	var title = postIn.title;
	var content = postIn.content;
	var replyer = postIn.replies.name;
	
	var authorOrReplyer = (author == replyer);
	if (authorOrReplyer) {authorOrReplyer = "posted"} else {authorOrReplyer = "replied"}
	
	var timeReplied = postIn.replies.timeReplied // timeReplied should be in seconds, slowly update this value as time passes
	
	var timeDifference = Date.now() - timeReplied //1694910262474
	timeDifference /= 1000 //convert ms to seconds
	timeDifference /= 60 //convert s to minutes (?)
	
	timeReplied = Math.round(timeDifference)
	if (timeReplied >= 60) {
		if (timeReplied < 120) {
			timeReplied = Math.round(timeDifference/60) + " hour ago."
		} else {
			timeReplied = Math.round(timeDifference/60) + " hours ago."
		}
	} else {
		timeReplied = Math.round(timeDifference) + " minutes ago."
	}
	
	//console.log(timeDifference)
	
	var views = postIn.response.views;
	var replies = postIn.response.replies;
	
	var obj = document.createElement('div');
	
	var id = forumCount; if (predefinedId != null) {id = predefinedId}
	var uniqueId = "forumId" + id;
	var timeId = uniqueId + "time"
	
	// note that ${ (...) } replaces the contents of ${} with the variable listed in (...)!
	// this is very cool, thanks youtube https://youtu.be/Hixx31BX5kY?si=44dXRBN4k5Kt63lt
	
	obj.innerHTML = `<div class="card mb-2" id = ${uniqueId}>
                            <div class="card-body p-2 p-sm-3">
                                <div class="media forum-item">
                                    <div class="media-body">
                                        <h6><p class="text-body">${title}</a></h6>
										<p class="text-black">
                                            ${author}
                                        </p>
                                        <p class="text-secondary">
                                            ${content}
                                        </p>
                                        <p class="text-muted"><a href="javascript:void(0)">${replyer}</a> ${authorOrReplyer} <span
                                                class="text-secondary font-weight-bold" id = ${timeId}>${timeReplied}</span></p>
                                    </div>
									
                                </div>
								<button class="btn btn-primary has-icon btn-block" type="button" onclick = "joinRoute(${id})" data-toggle="modal"
                            data-target="#threadModal2">
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 24 24"
											fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
											stroke-linejoin="round" class="feather feather-plus mr-2">
											<line x1="12" y1="5" x2="12" y2="19"></line>
											<line x1="5" y1="12" x2="19" y2="12"></line>
										</svg>
										JOIN
									</button>
                            </div>
                        </div>`
	
	// backup
	/* `<div class="card mb-2" id = ${uniqueId}>
                            <div class="card-body p-2 p-sm-3">
                                <div class="media forum-item">
                                    <div class="media-body">
                                        <h6><a href="#" data-toggle="collapse" data-target=".forum-content"
                                                class="text-body">${title}</a></h6>
										<p class="text-black">
                                            ${author}
                                        </p>
                                        <p class="text-secondary">
                                            ${content}
                                        </p>
                                        <p class="text-muted"><a href="javascript:void(0)">${replyer}</a> ${authorOrReplyer} <span
                                                class="text-secondary font-weight-bold" id = ${timeId}>${timeReplied}</span></p>
                                    </div>
                                    <div class="text-muted small text-center align-self-center">
                                        <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> ${views}</span>
                                        <span><i class="far fa-comment ml-2"></i> ${replies}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
	*/
	
	forumCount += 1;
	return obj;
}

var routes = localStorage.getItem("routeStorage")
var currentRoute;
if (routes != null) {
	currentRoute = routes[routes.length];
}
//console.log(localStorage.getItem("triggerForumInit"))
if (localStorage.getItem("triggerForumInit") == 1) {
	//console.log("HELP ME")
	$('#threadModal').modal('show');
	
	localStorage.setItem("triggerForumInit",0)
}

// generates the entire forum post and everything relevant to it, i.e. generates DOM object and inserts it into the array of forum posts
function generateFullForumPost(postIn) {
	forumContent[forumContent.length] = postIn
	// 	console.log(forumContent[0]);
	document.getElementById("forum").appendChild(generateForumPost(forumContent[forumContent.length-1]))
}

// example of generating the whole post in one go
generateFullForumPost(new forumPost("Author","Title","content",{name:"Author",timeReplied:1694910262474},{views : 5, replies : 1}))


//var wow = generateForumPost(testForumPost);
//console.log(document.getElementById("forum").innerHTML);
//document.getElementById("forum").appendChild(wow);


//var testForumPost2 = new forumPost("author","*very* engaging title","content",{name:"your mom",timeReplied:120},{views : 5, replies : 1})
//forumContent[forumContent+1] = testForumPost2
//var wow2 = generateForumPost(testForumPost2);

//console.log(document.getElementById("forumId0"))
//	document.getElementById("forum").replaceChild(wow2,wow); //replace 'wow' with 'wow2'



var frameCount = 0;
var lastRender = 0;
var tickTime = 0;

window.onload = init

function init() {
	//localStorage.setItem("triggerForumInit",0)
	
	loop();
}


function loop(timestamp) {
  frameCount++;
  //console.log(timestamp)
  var progress = timestamp - lastRender;

  if (frameCount % 30 === 0) {
	  
	//console.log((Date.now() - 1694910262474)/1000/60)
    refresh();
  }
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

//refresh time stamps
function refresh() {
	
	for (var i = 0; i < forumContent.length; i++) {
		var timeReplied = forumContent[i].replies.timeReplied
		
		var timeDifference = Date.now() - timeReplied //1694910262474
		timeDifference /= 1000 //convert ms to seconds
		timeDifference /= 60 //convert s to minutes
		
		timeReplied = Math.round(timeDifference)
	if (timeReplied >= 60) {
		if (timeReplied < 120) {
			timeReplied = Math.round(timeDifference/60) + " hour ago."
		} else {
			timeReplied = Math.round(timeDifference/60) + " hours ago."
		}
	} else {
		timeReplied = Math.round(timeDifference) + " minutes ago."
	}
		
		//console.log(timeReplied)
		
		document.getElementById("forumId"+i+"time").innerHTML = timeReplied;
	}
}


function addForumPost(){
	var title = document.getElementById("threadTitle").value
	var content = document.getElementById("threadContent").value
	var author = document.getElementById("threadAuthor").value
	
	//console.log(title)
	//console.log(content)
	
	document.getElementById("threadTitle").value = ""
	document.getElementById("threadContent").value = ""
	document.getElementById("threadAuthor").value = ""
	
	
	var routeStorage = localStorage.getItem("routeStorage")
	if (!routeStorage) {routeStorage = []}
	var start = localStorage.getItem("requestRouteStart")
	var end = localStorage.getItem("requestRouteStart")
	
	routeStorage[routeStorage.length] = [start,end]
	//console.log(activeRoute)
	
	localStorage.setItem("routeStorage",routeStorage)
	console.log(routeStorage)
	
	
	generateFullForumPost(new forumPost(author,title,content,{name:author,timeReplied:Date.now()},{views : 1, replies : 0}))
}

var expectedRoute = -1;
function joinRoute(input) {
	console.log("User wants to join route # " + input);
	expectedRoute = input;
	//document.getElementById("confirmRoute").setAttribute(onclick,`confirmJoinRoute(${input})`)
	//console.log(document.getElementById("confirmRoute").attributes[3])
}

function confirmJoinRoute() {
	var name = document.getElementById("joinUserName").value
	var input = expectedRoute
	console.log("User " + name + " *really* wants to join route # " + input);
}