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

ajax('GET', 'http://www.randomtext.me/api/gibberish/ul-1/20-25', generateText);
var myData;


function generateText(err, data){
	console.log(data.text_out);
	myData = data;
	console.log(myData.text_out);
	var newText = document.createElement('p');
	newText.innerHTML = data.text_out;
	console.log(newText.innerHTML);
	document.getElementsByClassName('result').appendChild(newText);
}

document.getElementsByClassName('create').addEventListener('click', function(event){
		//console.log(event.target.text_out);
		event.target.innerHTML = myData.text_out;
});
