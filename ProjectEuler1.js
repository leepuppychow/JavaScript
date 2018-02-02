/* Project Euler: Problem 1

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000. */


var i = 0; 
var multiplesArray = [];

while(i<1000){
	if(i%3 === 0 || i%5 === 0){
		multiplesArray.push(i);
	}
	i++;
}

var sum = multiplesArray.reduce(function(sum,value){	
	return sum + value;
})

// console.log(multiplesArray);
console.log("The sum is: " + sum);


