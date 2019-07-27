let standard_input = process.stdin;
let inputArr = [];
const NINE = "9";
const ZERO = "0";
standard_input.setEncoding('utf-8');
standard_input.on('data', function (data) {
  if (inputArr.length && (inputArr.length > inputArr[0])) {
    inputArr.shift();
    findPairs(inputArr);
    process.exit();
  } else {
    // Print user input in console.
    inputArr.push(Number(data));
    if (inputArr.length && (inputArr.length > inputArr[0])) {
      // Program exit.
      inputArr.shift();
      findPairs(inputArr);
      process.exit();
    }
  }
});

function findPairs(input) {
  for (let z = 0; z < input.length; z++) {
    let resultArr = [];
    for (let i = input[z]; i >= 10; i--) {
      if (i.toString().length > 1) {
        let jLimit = i.toString().length - 1;
        let str = "";
        for (var k = 1; k <= jLimit; k++) {
          str += NINE;
        }
        jLimit = Number(str);
        for (var j = 0; j <= jLimit; j++) {
          if (i + j === input[z]) {
            if (i.toString().length === j.toString().length + 1) {
              let counter = 0, order = [],
                  iString = i.toString(),
                  jString = j.toString();
              for (let itr = 0; itr < j.toString().length; itr++) {
                if (iString.indexOf(jString.charAt(itr)) !== -1) {
                  order.push(iString.indexOf(jString.charAt(itr))); //112095 10152
                  iString = removeCharAtIndex(jString.charAt(itr), iString.indexOf(jString.charAt(itr)), iString);
                  counter++;
                }
              }
              if (counter === j.toString().length && isAscending(order)) {
                resultArr.push(`${i.toString()} + ${j.toString()} = ${input[z]}`);
              }
            } else if (j.toString().length === 1) {
              let noOfZeros = i.toString().length - 2,
                  zeros = "", counter = 0, order = [], print = true;
              for (let itr = 0; itr < noOfZeros; itr++) {
                zeros += ZERO;
              }
              let iString = i.toString();
              let jString = zeros + j.toString();
              for (let itr = 0; itr <= zeros.length; itr++) {
                if (iString.lastIndexOf(jString.charAt(itr)) !== -1) {
                  order.push(iString.lastIndexOf(jString.charAt(itr)));
                  iString = replaceLastChar(jString.charAt(itr), iString.lastIndexOf(jString.charAt(itr)), iString);
                  counter++;
                }
              }
              if (counter === i.toString().length - 1) {
                for (let itr = 0; itr < order.length - 1; itr++) {
                  if (order[order.length - 1] < order[itr]) {
                    print = false;
                  }
                }
                if (print) {
                  resultArr.push(`${i.toString()} + ${zeros + j.toString()} = ${input[z]}`);
                }
              }
            }
          }
        }
      }
    }
    console.log(`TEST #${z + 1}\n${resultArr.length} pair${(resultArr.length > 1) ? 's ' : ' '}found`);
    if (resultArr.length) {
      for (let y = resultArr.length - 1; y > -1; y--) {
        console.log(resultArr[y]);
      }
    }
    console.log('\n');
  }
}

function removeCharAtIndex(char, index, str) {
  return str.replace(char, "*");
}

let isAscending = a => a.slice(1)
    .map((e, i) => e > a[i])
    .every(x => x);

function replaceLastChar(char, lastIndex, str) {
  return str.split('').splice(lastIndex, 1, '*').join('');
}