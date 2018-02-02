/*
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

*/

var max = 2000;
var allNumArray =[];
var primesArray = [];

function checkPrime(num){
  for (i=2;i<num/2;i++){
    if(num%i===0){
      return false;
    }
  }
  return true;
}

for (j=2;j<=max;j++){
  if (checkPrime(j)) {
      primesArray.push(j);
  }
}


console.log(primesArray);
