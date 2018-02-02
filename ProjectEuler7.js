/* Project Euler 7:

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?

"sieve of Eratosthenes"

*/

var primes = [2];
var num = 3;
var endIndex = 10001;

while (primes.length<endIndex){
	if(checkPrime(num)){
		primes.push(num);
	}
	num = num + 2;
}

function checkPrime(num){
	for (j=2;j<num/2;j++){		//square root doesn't work for 4,9,25
		if(num%j === 0){
			return false;
		}
	}
	return true; 
}

console.log(primes);
console.log(primes[endIndex - 1]);


