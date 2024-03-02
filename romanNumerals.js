const roman = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
}
let number = 453


let numberStr = number.toString()
let len = numberStr.length
let numbers = numberStr.split('')
let outputString = numbers
let zero = 0
for (let i = len - 1; i >= 0; i--) {
    let trailingZero = '0'.repeat(zero)
    outputString[i] = numbers[i] + trailingZero
    zero++
}
console.log(outputString)
for (data of outputString) {
    data = parseInt(data)
    for (i = 1; i <= roman.length; i += 2){

    }
}

// run this file in the terminal

// create a function that splits an integer and add a trailing zero to complete its unit level


for (i = 1; i <= 50; i++) {
    numroman = roman[1].repeat(i)
    console.log(numroman)
}