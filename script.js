/*********************************************************/
/* Function converts received string to numbers and puts */
/* them in array.                                        */
/*********************************************************/

function getUsersNumbers() {
	let input = document.getElementById('input').value;
	let regEx = /-?\d/g;
	let stringToArray = input.match(regEx);
	let numbersArray = [];
	
	stringToArray.forEach((string) => numbersArray.push(Number(string)));		
	canJump(numbersArray);
}

/*************************************************************/
/* Function step by step finds if there is possible to reach */
/* end and checks whether there is better option. With every */
/* finded option step counter is updated and path saved.     */
/*************************************************************/

function canJump(arr) {
	let lastGoodIndex = arr.length - 1;
	let counter = 0;
	let interimResult = arr.length - 1;
	let mostEfficientPath = []
	
	for (let i = arr.length - 2; i >= 0; i--) {
		if (i + arr[i] >= lastGoodIndex) {
			for (let j = i - 1; j >= -1; j--) {
				if (j === 0 && j + arr[j] >= lastGoodIndex) {
					lastGoodIndex = j;
					i = j;
					counter++;
					mostEfficientPath.unshift(arr[lastGoodIndex]);
				} else if (j === 0 && j + arr[j] < lastGoodIndex && interimResult < lastGoodIndex) {
					lastGoodIndex = interimResult;
					i = interimResult;
					counter++;
					mostEfficientPath.unshift(arr[lastGoodIndex]);
				} else if (j + arr[j] >= lastGoodIndex) {
					interimResult = j;					
				} else if (j === -1 && i !== lastGoodIndex) {
					lastGoodIndex = i;
					counter++;
					mostEfficientPath.unshift(arr[lastGoodIndex]);
				}	
			}
		}
	}
	
	if (lastGoodIndex === 0) {
		displayResult('w', counter, mostEfficientPath);
	} else {
		displayResult('l');
	}
}

/**********************************************************/
/* Function displays whether user won or lost. In case of */
/* win most efficient path and step count are displayed.  */
/**********************************************************/

	let setBackgroundColor = document.getElementById('output-wrapper');
	let isGoalReachable = document.getElementById('output');
	let mostEfficientPath = document.getElementById('path');

function displayResult (isWinner, steps, path) {
	
	if (isWinner === 'w') {
		setBackgroundColor.classList.add('won');
		isGoalReachable.innerHTML = 'WON';
		mostEfficientPath.innerHTML = `Most efficient path takes ${ steps } steps with numbers ${ path }.`;		
	} else {
		setBackgroundColor.classList.add('lost');
		isGoalReachable.innerHTML = 'LOST';
	}
}

/*********************************************************/
/* Function resets output when user click on input field */
/*********************************************************/

function resetOutput() {
	setBackgroundColor.classList.remove('won');
	setBackgroundColor.classList.remove('lost');
	isGoalReachable.innerHTML = '';
	mostEfficientPath.innerHTML = '';
}
