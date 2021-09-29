

function parseText(text){
text = decodeURIComponent(text);
console.log(text);
var a = text.replace(/###.*?\\n/g,'<h1>'+'$&'+'</h1>');
document.getElementById('writeup-text').innerHTML = a;
}