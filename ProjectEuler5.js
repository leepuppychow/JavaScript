/* Project Euler #5

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

*/

function checkDivisibilty(solution){
	var i = 2;
	while (i<=20){
		if (solution%i !== 0){	
			return false;
		}
		i++;
	}
	return true;
}

var solution = 19;

while(checkDivisibilty(solution) === false){	
	solution += 19;			//iterate by 19 because that is the largest prime less than 20 that the solution must be divisible by
}

console.log("The solution is: " + solution);






//also included this example of a recursive function for the factorial of a number

function factorial(start){		
	if (start === 1){
		return 1;
	}
	else{
		return start * (factorial(start - 1))
	}
}


