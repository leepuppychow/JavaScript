/*
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/


var solution = 0;

for (b=999;b>100;b--){
	for(a=999;a>100;a--){
		palindrome(a,b);
	}
}

function palindrome(a,b){
	var product = a*b;
	var reversed = product.toString().split('').reverse().join('');
	if (reversed === product.toString()){

		if (product > solution){
			solution = product;
		}
		else{
			solution = solution;
		}
		return solution;
		//console.log("The solution is: " + a + "*" + b + " = " + solution);
	}
}

