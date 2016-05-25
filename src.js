'use strict';

function ajax(method, url, handler, data) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState === 4) {
      if (this.status === 200) {
        handler(null, JSON.parse(this.responseText));
      } else {
        handler(this.statuscode, null);
      }
    }
  };
  xhr.open(method, url);
  if (method === 'POST') {
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Content-length", data.length);
    xhr.setRequestHeader("Connection", "close");
    xhr.send(data);
  } else {
    xhr.send();
  }
}

//ajax call -----
document.getElementById('create').addEventListener('click', function(){
	ajax('GET', 'http://www.randomtext.me/api/gibberish/ul-1/25-30', generateText);
});
//---------------
document.getElementById('bacon').addEventListener('click', function(){
  ajax('GET', 'https://baconipsum.com/api/?type=all-meat&sentences=2', generateBacon);
});
//for future use--
// https://baconipsum.com/api/?type=meat-and-filler
//----------------

var bool = true;//I only want the user to be able to run this once
var myData;
var randEl = '';//to store string to be copied later
function generateText(err, data){
	if(bool){
		myData = data;
		var newEl = document.createElement('p');
		var text = data.text_out;
		//because of what the API returns, I need to pull ul and li elements from text
		var newText = text.toLowerCase().match(/[\w]+/g);
		var newStr = '';
		var newArr = newText.slice(3,-3);
		//need to concatenate this array into a string, preceeding each word with a "#"
			for (var i = 0; i < newArr.length; i++){
				newStr = newStr.concat("#"+newArr[i]);
			}
		newEl.innerHTML = newStr;
		document.getElementById('result').appendChild(newEl);
		randEl = newEl.innerHTML;
		console.log('randEl', randEl);
		bool = false;
	}
}

document.getElementById('randCopy').addEventListener('click', copyToClipboard);

function copyToClipboard() {
  window.prompt("Copy to clipboard: Ctrl+C/Cmd+C, Enter", randEl);
}


var bacon = true;
var baconData;
var baconEl = '';
function generateBacon(err, data){
  if(bacon){
    baconData = data[0];
    var newBacon = document.createElement('p');
    var baconText = baconData;
    console.log('baconText', baconText);
    baconText = baconText.toLowerCase().match(/[\w]+/g);
    var baconStr ='';
    for (var i = 0; i < baconText.length; i++){
      baconStr = baconStr.concat("#" + baconText[i]);
    }
    newBacon.innerHTML = baconStr;
    console.log('newBacon',newBacon);
    document.getElementById('baconResult').appendChild(newBacon);
    baconEl = newBacon.innerHTML;
  }
}

document.getElementById('baconCopy').addEventListener('click', copyBaconToClipboard);

function copyBaconToClipboard() {
  window.prompt("Copy to clipboard: Ctrl+C/Cmd+C, Enter", baconEl);
}

//--------



//convert user-provided string to a useable string for the purposes of this website
document.getElementById('convert').addEventListener('click', convertText);
var userEl ='';
var otherBool = true;
function convertText(){
	if(otherBool){
			var newEl = document.createElement('p');
			var text = document.getElementById('input').value;
			var newText = text.toLowerCase().match(/[\w]+/g);
			var newStr = '';
			for (var i = 0; i < newText.length; i++){
				newStr = newStr.concat("#" + newText[i]);
			}
			newEl.innerHTML = newStr;
			userEl = newEl.innerHTML;
			console.log('userEl', userEl);
			document.getElementById('userResult').appendChild(newEl);
			otherBool=false;
		}
	}

document.getElementById('convCopy').addEventListener('click', copyUserToClipboard);

function copyUserToClipboard(){
	window.prompt("Copy to clipboard: Ctrl+C/Cmd+C, Enter", userEl);
}


//---code for showing hidden div elements ------
document.getElementById('nav-link-a').addEventListener('click', showAbout);
var anotherBool = true;

function showAbout(){
  if(anotherBool){
    document.getElementById('hidden').className = "inner cover col-xs-12 col-sm-12 col-md-12 col-lg-12";
    anotherBool = false;
  } else {
    hideAbout();
    anotherBool = true;
  }
}

function hideAbout(){
    document.getElementById('hidden').className = "inner cover hidden-xs hidden-sm hidden-md hidden-lg";
}





//
