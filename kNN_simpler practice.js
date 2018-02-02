/* kNN machine learning; practice with JS

--> NEXT STEPS: Make it so you can keep adding data points to the data set
GENERALIZE THE PROGRAM, so you can have multiple features 

*/
var unknown = {rooms: Number(prompt("how many rooms?")), area: Number(prompt("What's the sq ft?"))};

var data = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},   

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];

function calcDistance(object){

	for(i=0;i<data.length;i++){
		var roomsDifference = (data[i].rooms - object.rooms);
		var areaDifference = (data[i].area - object.area);
		var distance = Math.sqrt(roomsDifference*roomsDifference + areaDifference*areaDifference);
		data[i].distance = distance;      //this adds new property to each data point (distance from unknown point)
	}
    return data;
}

function sortByDistance(){
    data.sort(function (a,b){
        return a.distance - b.distance;        
    })
}

function findNeighbors(k){      //find k closest neighbors   
    var neighbors = data.slice(0,k);    //first find the k closest data points
    return neighbors;
}

function makeGuess(array){
    var flatCount = 0;
    var apartmentCount = 0;
    var houseCount = 0;
    
    for(i=0;i<array.length;i++){
        switch (array[i].type) {
            case "flat":
                flatCount++;
                break;
            case "apartment":
                apartmentCount++;
                break;
            case "house":
                houseCount++;
                break;
        }
    }

    var guess = 0;
    if(flatCount>=houseCount && houseCount>=apartmentCount){
        guess = flatCount;
        unknown.type = "flat";
    }
    else if(houseCount>=apartmentCount){
        guess = houseCount;
        unknown.type = "house";
    }
    else{
        guess = apartmentCount;
        unknown.type = "apartment";
    }

    console.log(unknown);
    data.push(unknown);         //add unknown to the data set
}


sortByDistance(calcDistance(unknown));
makeGuess(findNeighbors(5));








