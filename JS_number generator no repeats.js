// Random number generator with no repeats

var noRepeatsArray = [];

function noRepeats(){
	for (i=0;i<9;i++){
		var rand = Math.floor(Math.random()*9)+1;
		if(noRepeatsArray.includes(rand)==false){
			noRepeatsArray.push(rand);
		}
		else{
			i--;		// this is the key line here!
		}
	}
	return noRepeatsArray;
}

noRepeats();



