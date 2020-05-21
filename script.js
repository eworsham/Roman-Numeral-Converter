//Function with logic to convert roman numerals to modern numbers
function convertToModern(userInput) {

  //Converts text to uppercase for simplicity
  userInput = userInput.toUpperCase();

  //Error checking
  try {
    //Check if input is blank
    if (userInput === "") {
      throw "Invalid Input: Input is blank";
    }

    //Check for valid input
    var isValid = checkValidInputRoman(userInput);
    if (!isValid) {
      throw "Invalid Input: Enter number again as roman numerals (I, V, X, L, C, D, M)";
    }
  } catch (err) {
    document.getElementById("convertedToModern").innerHTML = err;
    return -1;
  }

  //Parse input and add sum
  var sum = 0;
  var errorCurrentChar;
  var errorNextChar;
  var hasError = false;
  for (var i = 0; i < userInput.length; i++) {

    //Get current roman numeral and look ahead to next roman numeral
    currentChar = userInput.substr(i, 1);
    if (i + 1 != userInput.length) {
      nextChar = userInput.substr(i + 1, 1);
    } else {
      nextChar = 0;
    }

    //Convert roman numerals to modern equivalent
    currentModern = getModernNum(currentChar);
    nextModern = getModernNum(nextChar);

    //Logic to determine correct modern equivalent to roman numerals
    if (nextModern > currentModern) {

      //Check for invalid preceding numeral
      try {
        if (Math.log10(nextModern) - Math.log10(currentModern) > 1) {
          throw "Invalid Input: " + currentChar + " cannot precede " + nextChar;
        }
      } catch (err) {
        document.getElementById("convertedToModern").innerHTML = err;
        return -1;
      }

      sum += nextModern - currentModern;
      i++;
    } else {
      sum += currentModern;
    }
  }
  document.getElementById("convertedToModern").innerHTML = userInput + " = " + sum;
  return 0;
}

//Function with logic to convert modern numbers to roman Numerals
function convertToRoman(userInput) {

  //Error checking
  try {
    //Check for blank input
    if (userInput === "") {
      throw "Invalid Input: Input is blank";
    }

    //Check if input is negative or zero
    if (userInput < 1) {
      throw "Invalid Input: Input must be a number greater than 0";
    }

    //Check that input does not contain invalid charaters
    var isValid = checkValidInputModern(userInput);
    if (!isValid) {
      throw "Invalid Input: Input must be a postive whole number"
    }
  } catch (err) {
    document.getElementById("convertedToRoman").innerHTML = err;
    return -1;
  }

  var tempInput = userInput;
  var out = "";
  var cont = true;

  //Conintue while loop until there is no remainer from the dividing
  while (cont) {
    if (tempInput / 1000 >= 1) {
      out += 'M';
      tempInput -= 1000;

    } else if (tempInput / 500 >= 1) {
      if (out.indexOf("VV") != -1) {

      } else {
        out += 'D';
      }
      tempInput -= 500;

    } else if (tempInput / 100 >= 1) {
      if (out.indexOf("DCCC") != -1) {
        out = out.replace("DCCC", "CM");
      } else if (out.indexOf("CCC") != -1) {
        out = out.replace("CCC", "CD");
      } else {
        out += 'C';
      }
      tempInput -= 100;

    } else if (tempInput / 50 >= 1) {
      out += 'L';
      tempInput -= 50;

    } else if (tempInput / 10 >= 1) {
      if (out.indexOf("LXXX") != -1) {
        out = out.replace("LXXX", "XC");
      } else if (out.indexOf("XXX") != -1) {
        out = out.replace("XXX", "XL");
      } else {
        out += 'X';
      }
      tempInput -= 10;

    } else if (tempInput / 5 >= 1) {
      out += 'V';
      tempInput -= 5;

    } else if (tempInput / 1 >= 1) {
      if (out.indexOf("VIII") != -1) {
        out = out.replace("VIII", "IX");
      } else if (out.indexOf("III") != -1) {
        out = out.replace("III", "IV");
      } else {
        out += 'I';
      }
      tempInput -= 1;

    } else {
      //No remainder, set cont to false to end while loop
      cont = false;
    }
  }
  document.getElementById("convertedToRoman").innerHTML = userInput + " = " + out;
  return 0;
}

//Function that checks for valid roman numeral input. Returns true if valid and false if invalid
function checkValidInputRoman(userInput) {

  var isValid = true;
  for (var i = 0; i < userInput.length; i++) {
    switch (userInput.substr(i, 1)) {
      case 'I':
        break;
      case 'V':
        break;
      case 'X':
        break;
      case 'L':
        break;
      case 'C':
        break;
      case 'D':
        break;
      case 'M':
        break;
      default:
        isValid = false;
    }
  }
  return isValid;
}

//Function that checks for valid modern number input. Returns true if valid and false if invalid
function checkValidInputModern(userInput) {

  var isValid = true;
  for (var i = 0; i < userInput.length; i++) {
    switch (userInput.substr(i, 1)) {
      case '0':
        break;
      case '1':
        break;
      case '2':
        break;
      case '3':
        break;
      case '4':
        break;
      case '5':
        break;
      case '6':
        break;
      case '7':
        break;
      case '8':
        break;
      case '9':
        break;
      default:
        isValid = false;
    }
  }
  return isValid;
}

//Function that matches basic roman numerals to it's equivalent modern number
function getModernNum(romanNum) {

  var modernNum;
  switch (romanNum) {
    case 'I':
      modernNum = 1;
      break;
    case 'V':
      modernNum = 5;
      break;
    case 'X':
      modernNum = 10;
      break;
    case 'L':
      modernNum = 50;
      break;
    case 'C':
      modernNum = 100;
      break;
    case 'D':
      modernNum = 500;
      break;
    case 'M':
      modernNum = 1000;
      break;
  }
  return modernNum;
}