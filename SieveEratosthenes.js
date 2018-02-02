var max = prompt("What is the maximum?");
var allNums = [];
var solution = [];

function fillArrays(max){
  for (i=2; i<=max; i++){
    allNums.push(i)
  }
}
fillArrays(max);

function checkPrime(num){
  for (x=2; x<num; x++){
    if(num%x === 0){
      return false;
    }
  }
  return true;
}

allNums.forEach(function(num,index){
  if (checkPrime(num)){
    allNums.splice(index,1,num);
  }
})

console.log(allNums);


//
// var testArray = allNums.map(function(num, index){  // OLD SYNTAX
//   if (num % 5 === 0){
//     return allNums[index] = "Boo";
//   }
// return num;
// })
//
//
// var testArray = allNums.filter(num => {
//   if (num % 5 === 0){
//     return num;
//   }
// })
