/* Practice with objects: 

*/

function Patient(object){
	for (var key in object){
		this[key] = object[key];	//have to use bracket notation here
	}
}

Patient.prototype.findBirthYear = function(){
	this.birthYear = 2017 - this.age;
}

Patient.prototype.calculateBMI = function(){
	var height = this.height * 0.0254; //convert inches to m
	var weight = this.weight * 0.453592; // convert lbs into kg
	this.BMI = weight / (height*height);
}

var patientDataList = [
{name: "billy", age: 67, gender: "M", height: 66, weight: 135, insurance: "Medicare"},
{name: "sandy", age: 73, gender: "F", height: 60, weight: 101, insurance: "Medicare"}
];


var billy = new Patient(patientDataList[0]);
var sandy = new Patient(patientDataList[1]);


billy.findBirthYear();
sandy.calculateBMI();

console.log(billy.name + " was born in: " + billy.birthYear);
console.log(sandy.name + " has a BMI of: " + sandy.BMI);


