// text search program

var text = 'Krav Maga is Hebrew for ‘Close Combat’.  It’s the official self-defense system for the Israeli Military and many Law Enforcement agencies across the USA and the world.  But don’t let that intimidate you.  Krav Maga is used by real people just like you EVERY DAY.  Hollywood actors and actresses learn Krav Maga to look sharp on the big screen and stay in shape, and most likely so does your neighbor.';

var textArray = text.split(' '); // divides text into array of each word separated by spaces
var wordCount = 0;
var word = prompt('What do you want to search for?');

textArray.forEach(function(element){
	if(element.toLocaleLowerCase() === word.toLocaleLowerCase()){
		wordCount++;
	}
})
console.log(word + " was found " + wordCount + " times.");




