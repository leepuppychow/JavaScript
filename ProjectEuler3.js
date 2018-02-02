/* Project Euler #3
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

var num = 600851475143;		//use SQUARE ROOT to decrease iterations
var factorsArray = [];

for(i=2;i<Math.sqrt(num);i++){
	if(num%i === 0){	// this will find the factors of num
		factorsArray.push(i);
	}
}
console.log(factorsArray);

var nonPrimeFactors = factorsArray.filter(function(factor){		
	for(j=2;j<factor/2;j++){		//this will return all non-prime factors of num; now take these elements away from all factors
		if(factor%j === 0){		//this will leave all the prime factors :)
			return factor;
		}
	}
})

var primeFactors = factorsArray.filter(function(factor){
	if (nonPrimeFactors.includes(factor) === false){
		return factor;
	}
})

console.log(factorsArray);
console.log(primeFactors);
console.log(primeFactors[primeFactors.length-1]);



