/* The sum of the squares of the first ten natural numbers is,

1^2 + 2^2 + ... + 10^2 = 385
The square of the sum of the first ten natural numbers is,

(1 + 2 + ... + 10)^2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

*/


function squareOfSum(max){
	var sum = 0;
	for (i=1;i<=max;i++){
		sum += i;
	}
	return sum * sum;
}

function sumOfSquares(max){
	var sum = 0;
	for (i=1;i<=max;i++){
		var square = i*i;
		sum += square;
	}
	return sum;
}

console.log(squareOfSum(100) - sumOfSquares(100));

