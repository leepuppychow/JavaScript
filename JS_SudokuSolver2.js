/* SUDOKU SOLVER
-Lee Chow (7/31/17)
*/

var sudoku = [[0,0,0,0,0,0,0,0,5],			//(0,1) - [1,2,3,6,7*,8]  (0,2) - [1,2*,3,4,7,8]
			  [0,0,0,9,1,0,0,0,6],						//(0,3) - [6,8*] (0,5) - [3*,8]
			  [0,0,0,2,0,7,8,3,0],
			  [0,0,6,4,0,0,0,2,8],
			  [2,4,0,0,0,0,0,6,1],				//solution: [2,4,7,5,3,8,9,6,1]
			  [1,9,0,0,0,6,4,0,0],
			  [0,5,9,3,0,4,0,0,0],
			  [8,0,0,0,5,9,0,0,0],
			  [3,0,0,0,0,0,0,0,0]];			//(8,6) - [1,2,5*,6,7,9] (8,7) - [1,4,5,7,8*,9]

var newSudoku = [];

function generateColumn(array, column){		//function to pull out a column from the 2-D array
	var newColumnArray = [];
	for(i=0;i<9;i++){
		newColumnArray.push(array[i][column]);
	}
	return newColumnArray;
}

function whichSquare(row,column,array){ //function to check if coordinates are in a certain square and then return that square

var squareA = [array[0][0],array[0][1],array[0][2],array[1][0],array[1][1],array[1][2],array[2][0],array[2][1],array[2][2]];
var squareB = [array[0][3],array[0][4],array[0][5],array[1][3],array[1][4],array[1][5],array[2][3],array[2][4],array[2][5]];
var squareC = [array[0][6],array[0][7],array[0][8],array[1][6],array[1][7],array[1][8],array[2][6],array[2][7],array[2][8]];

var squareD = [array[3][0],array[3][1],array[3][2],array[4][0],array[4][1],array[4][2],array[5][0],array[5][1],array[5][2]];
var squareE = [array[3][3],array[3][4],array[3][5],array[4][3],array[4][4],array[4][5],array[5][3],array[5][4],array[5][5]];
var squareF = [array[3][6],array[3][7],array[3][8],array[4][6],array[4][7],array[4][8],array[5][6],array[5][7],array[5][8]];


var squareG = [array[6][0],array[6][1],array[6][2],array[7][0],array[7][1],array[7][2],array[8][0],array[8][1],array[8][2]];
var squareH = [array[6][3],array[6][4],array[6][5],array[7][3],array[7][4],array[7][5],array[8][3],array[8][4],array[8][5]];
var squareI = [array[6][6],array[6][7],array[6][8],array[7][6],array[7][7],array[7][8],array[8][6],array[8][7],array[8][8]];

	switch(true){
		case (row >= 0 && row <= 2) && (column >= 0 && column <= 2):
			return squareA;
		case (row >= 0 && row <= 2) && (column >= 3 && column <= 5):
			return squareB;
		case (row >= 0 && row <= 2) && (column >= 6 && column <= 8):
			return squareC;

		case (row >= 3 && row <= 5) && (column >= 0 && column <= 2):
			return squareD;
		case (row >= 3 && row <= 5) && (column >= 3 && column <= 5):
			return squareE;
		case (row >= 3 && row <= 5) && (column >= 6 && column <= 8):
			return squareF;

		case (row >= 6 && row <= 8) && (column >= 0 && column <= 2):
			return squareG;
		case (row >= 6 && row <= 8) && (column >= 3 && column <= 5):
			return squareH;
		case (row >= 6 && row <= 8) && (column >= 6 && column <= 8):
			return squareI;
		default:
			console.log("coordinates not valid");
	}
}

function generateNumber(row, column, trialNumber){
	var compiledArray = sudoku[row].concat(generateColumn(sudoku,column)).concat(whichSquare(row,column,sudoku));
	if(compiledArray.includes(trialNumber)===false){
		return trialNumber;
	}
	else{
		return 0;
	}
}


function generateSolution(trialNumber){		// This function will map a function to a 2-dimensional array
	newSudoku = sudoku.map(function(nested,indexRow){		//this index would be the Row
		return nested.map(function(element,indexColumn){		// this index would be the column indices from 0-8
			if (element !== 0){
				return element;		// this will keep the original value of the array as long as it's not blank
			}
			else{		// if it's a blank spot (0) then it will call the generateNumber function
				return generateNumber(indexRow,indexColumn,trialNumber);
			}

		});
	});
	return newSudoku;
}


function checkSolution(array, row, column, num){	//this function will check how many times a trial number (num) appears in either a row, column, square
	var countRow = 0;							//if it only appears once, it will fill in that square with that number
	var countColumn = 0;
	var countSquare = 0;

	array[row].forEach(function(element){
		if (element === num){		//count how many times the trialNumber appears in a row
			countRow++;
		};
	});
	generateColumn(array, column).forEach(function(element2){
		if (element2 === num){		//count how many times the trialNumber appears in a column
			countColumn++;
		};
	});

	whichSquare(row, column, array).forEach(function(element3){
		if (element3 === num){		//count how many times the trialNumber appears in a square
			countSquare++;
		};
	});

	if (countRow === 1 || countColumn === 1 || countSquare === 1){	//if num only appears in a row, column, or square once it must be the solution
		return num;
	}
	else{
		return 0;		// if num appears more than once then it is not a solution; keep that square as a blank (0)
	}
}

function fillSudoku(array, trialNumber){	//this function applies checkSolution on the whole sudoku.
	sudoku = array.map(function(nested,indexRow){
		return nested.map(function(element,indexColumn){
			if(element === trialNumber){		// only run checkSolution on squares with the trialNumber
				return checkSolution(array, indexRow, indexColumn, trialNumber);
			}
			else{
				return element;		//if the square does not contain trialNumber then leave it as is.
			}
		});
	});
}



function solveSudoku(num){
	var iterations = num+1;

	var i = 0;		//loop through trialNumbers 1-9 and create one sudoku solution (there will likely be blanks)
	while (i<10){
		fillSudoku(generateSolution(i),i);
		i++;
	}

	var array1D = [];	//convert current sudoku 2D array into a 1D array, because it's easier to check for blanks this way
	for(j=0;j<9;j++){	//previously, when I tried to loop through the 2D array, it would stop once a single row is completed
		for(k=0;k<9;k++){		//using the 1D array avoids this!
			array1D.push(sudoku[j][k]);
		}
	}

	if(iterations > 20){		// this code will stop the algorithm if it is too hard of a puzzle
		console.log(sudoku);
		return "too hard dude";	//Here is where I need to add something to solve harder puzzles (assign a number?)
	}
	else if (array1D.includes(0)){
		return solveSudoku(iterations);		//good example of a recursive function. Make sure to "return" the function!
	}
	else{
		console.log("Iterations: " + iterations);
		return sudoku;
	}
}

solveSudoku(0);

/*



var sudoku = [[7,0,6,0,0,0,0,1,0],			// difficult; not able to solve
			  [0,4,0,0,7,9,0,2,0],
			  [0,0,0,4,0,0,0,0,0],
			  [1,0,0,0,5,0,9,0,0],
			  [0,0,2,0,0,0,5,0,0],
			  [0,0,5,0,8,0,0,0,3],
			  [0,0,0,0,0,4,0,0,0],
			  [0,9,0,1,6,0,0,7,0],
			  [0,5,0,0,0,0,1,0,8]];


var sudoku = [[1,0,0,7,0,9,0,0,0],			//easy; solved! 8 iterations
			  [4,3,0,0,1,0,0,7,0],
			  [0,0,7,3,0,0,0,0,0],
			  [0,4,8,0,0,0,0,0,6],
			  [9,0,0,4,0,6,0,0,2],
			  [2,0,0,0,0,0,8,3,0],
			  [0,0,0,0,0,3,2,0,0],
			  [0,2,0,0,4,0,0,6,9],
			  [0,0,0,1,0,8,0,0,7]];

var sudoku = [[0,0,1,2,0,0,0,6,9],			// medium; solved! 11 iterations.
			  [0,3,0,0,4,0,0,0,0],
			  [2,0,0,0,0,0,0,3,8],
			  [0,0,7,0,9,0,0,0,5],
			  [0,0,0,3,0,8,0,0,0],
			  [6,0,0,0,5,0,3,0,0],
			  [1,2,0,0,0,0,0,0,3],
			  [0,0,0,0,8,0,0,2,0],
			  [4,9,0,0,0,2,1,0,0]];


*/
