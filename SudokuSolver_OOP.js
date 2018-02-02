// http://www.7sudoku.com/view-puzzle?date=20170728

var sudoku = [[0,0,0,0,0,0,0,0,5],			//(0,1) - [1,2,3,6,7*,8]  (0,2) - [1,2*,3,4,7,8]
			  [0,0,0,9,1,0,0,0,6],						//(0,3) - [6,8*] (0,5) - [3*,8]
			  [0,0,0,2,0,7,8,3,0],
			  [0,0,6,4,0,0,0,2,8],
			  [2,4,0,0,0,0,0,6,1],				//solution: [2,4,7,5,3,8,9,6,1]
			  [1,9,0,0,0,6,4,0,0],
			  [0,5,9,3,0,4,0,0,0],
			  [8,0,0,0,5,9,0,0,0],
			  [3,0,0,0,0,0,0,0,0]];			//(8,6) - [1,2,5*,6,7,9] (8,7) - [1,4,5,7,8*,9]

var newSudoku = [[0,0,0,0,0,0,0,0,0],
			  				[0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0],
							  [0,0,0,0,0,0,0,0,0]];

function Space(value,row,column){
	this.value = value;
	this.row = row;
	this.column = column;
	this.rowArray = sudoku[row];
	this.columnArray = whichColumn(this.column);
	this.squareArray = whichSquare(this.row, this.column, sudoku);
	this.possibilities = possibleSolutions(this.rowArray, this.columnArray, this.squareArray, this.value);
}

function whichColumn(column){
	var array = [];
	for(i=0;i<9;i++){
		array.push(sudoku[i][column]);
	}
	return array;
}

function whichSquare(row,column,array){
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

function possibleSolutions(rowArray, columnArray, squareArray, value){
	var array = [];
	if(value !== 0){		//if the square is non-zero, no need to look for possible solutions
		array.push(value);
		return array;
	}
	else{
		for (i=1;i<=9;i++){	//if the square is zero (a blank), then look for possible solutions
			if(rowArray.concat(columnArray).concat(squareArray).includes(i) === false){
				array.push(i);
			}
		}
		return array;
	}
}

function makeArrayOfPossibilities(array){			//this function will create newSudoku, which is a 2-D array of objects
	return possibilitiesArray = array.map(function(nested,row){
		return nested.map(function(element,column){
			return new Space(sudoku[row][column], row, column).possibilities;
			//return new Space(sudoku[row][column], row, column);
		});
	});
}

// try a function that finds all Spaces that could be a number, like 2,
// then set Space.value = to that number
// this function would help you find solution (if num only occurs once in row, column, or square)
// then it's the solution.

function setPossibility(array, num){
	return testSudoku = array.map(function(nested,index){
		return nested.map(function(element,index){
			if (element.includes(num)){
				return num;
			}
			else {
				return element;
			}
		})
	})
}

console.log(makeArrayOfPossibilities(sudoku));
console.log(setPossibility(makeArrayOfPossibilities(sudoku), 1));

// /* ALGORITHM 2: Have array of all possibilities. Then try find squares with only 2 possibilities.
// Set sudoku value to those possibilies and re-check.
// Need to see how many squares you have to trial for this process.
//
// Is it better to find spaces with higher number of possibilites and set those?
// Seems like if you set a square that has high number of possiblities (6), it will take away max uncertainty?
//
// ALGORITHM 3: Find a row and set all its values (iterating through possibilies)
//
//
// ALGORITHM 1: (this still would get stuck on difficult problems)
// As you pivot through row, column, square:
// 1. look for solutions that only appear once in possibilies array, set as solution
// 2. Remove this new solution from all the other possibility arrays in that row/column/square
//
// */
