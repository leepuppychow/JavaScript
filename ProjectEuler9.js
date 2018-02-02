/* A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a2 + b2 = c2
For example, 32 + 42 = 9 + 16 = 25 = 52.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.

*/

function findSolution(){
    for (a=1;a<1000;a++){
        for(b=2;b<1000;b++){
            var c = Math.sqrt(a*a + b*b);
            if(a+b+c === 1000){
              console.log("The solution is: " + a, b, c);
              console.log("The product, abc, is: " + a*b*c);
              return;
            }
        }
    }
}


findSolution();
