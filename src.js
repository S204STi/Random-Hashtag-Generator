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
	ajax('GET', 'http://www.randomtext.me/api/gibberish/ul-1/20-25', generateText);
});
//---------------

var bool = true;//I only want the user to be able to run this once
var myData;
function generateText(err, data){
	if(bool){
		//console.log(data.text_out);
		myData = data;
		//console.log(myData.text_out);
		var newEl = document.createElement('p');
		var text = data.text_out;
		console.log('text', text);
		//because of what the API returns, I need to pull ul and li elements from text
		var newText = text.toLowerCase().match(/[\w]+/g);
		console.log('newText', newText);
		var newStr = '';
		var newArr = newText.slice(3,-3);
		console.log('product of function to remove ul, li, r from text', newArr);
		//need to concatenate this array into a string
		for (var i = 0; i < newArr.length; i++){
			newStr = newStr.concat(newArr[i]);
		}
		newEl.innerHTML = "#"+newStr;
		console.log(newEl.innerHTML);
		document.getElementById('result').appendChild(newEl);
		bool = false;
	}
}
