/*
    Global constants
*/
const defaultNumShift = 2;
const defaultLeftShift = true;
const minNumShift = 0;
const maxNumShift = 26;
const minASCIIDecimal = 33;
const maxASCIIDecimal = 126;

function GetShiftNum() {
  // Convert user-entered shift number to integer, using default if invalid
  let tmp = document.querySelector("#CypherShiftNumInput").value;
  let shiftNum = parseInt(tmp) || defaultNumShift;

  // TODO: Restrict shift num to valid range
  if(shiftNum > maxNumShift || shiftNum < minNumShift){
    shiftNum = defaultNumShift;
  }

  // Return shift positions
  return shiftNum;
}

function GetShiftLeft(evt) {
  let leftChecked = false;
  let clicked = document.querySelector("#ShiftLeftCheckbox").checked
  if(clicked == true ){
   leftChecked = true;
  }
  // TODO: Determine if shift left is checked
  // Return if shift left is checked
  return leftChecked;
}

function UpdateEncryptedText() {
  // Get reference to cleartext input box
  const clearRef = document.querySelector("#ClearTextInput");

  // Get reference to cyphertext input box
  const encryptedRef = document.querySelector("#CypherTextInput");

  // Update encrypted text input box with encrypted value
  encryptedRef.value = CaesarEncrypt(
    clearRef.value,
    GetShiftNum(),
    GetShiftLeft()
  );
}

function ChangeClearTextInput(evt) {
  // Cleartext input change event handler
  UpdateEncryptedText();
}

function ChangeShiftLeftCheckbox(evt) {
  // Shift left checkbox chang event handler
  UpdateEncryptedText();
  DisplaySubstitutionAlphabet();
}

function ChangeCypherShiftNumInput(evt) {
  // Get shift number from input box from event, or use default number
  let shiftNum = parseInt(evt.target.value) || defaultNumShift;

  // TODO: Restrict shift num to valid range
  if(shiftNum > maxNumShift || shiftNum < minNumShift){
    shiftNum = defaultNumShift;
  }

  // Update encrypted text, and regenerate substituion alphabet
  UpdateEncryptedText();
  DisplaySubstitutionAlphabet();
}

function CaesarEncrypt(clearText, shiftNum, shiftLeft) {
  // Given clear text, return encrypted text
  let encryptedText = "";
 
  // TODO: Implement Caesar shift encryption
  let clearTextArray = clearText.split("")
  if(shiftLeft == false) {
  clearTextArray.map((letter) => {
        let letterToAscii = letter.charCodeAt(0) + shiftNum

          if((97 <= letter.charCodeAt(0) <= 122 && letterToAscii > 122) || (letterToAscii > 90 && 65 <= letter.charCodeAt(0) && 90>= letter.charCodeAt(0)) ){
            letterToAscii = letterToAscii - 26
            letterToAscii = String.fromCharCode(letterToAscii)
            return encryptedText = encryptedText.concat(letterToAscii)

          }else if((97 <= letter.charCodeAt(0) && letter.charCodeAt(0) <= 122 )||(65 <= letter.charCodeAt(0) && letter.charCodeAt(0)<= 90)){
            letterToAscii = String.fromCharCode(letterToAscii)
            return encryptedText = encryptedText.concat(letterToAscii)
          
          }else {
            return encryptedText = encryptedText.concat(letter)
          }
    })

  }else{
    clearTextArray.map((letter) => {
      let letterToAscii = letter.charCodeAt(0) - shiftNum
        if((97 > letterToAscii && 97 <= letter.charCodeAt(0) &&  122 >= letter.charCodeAt(0) ) || (65 > letterToAscii && 65 <= letter.charCodeAt(0) && 90>= letter.charCodeAt(0))) {
          letterToAscii = letterToAscii + 26
          letterToAscii = String.fromCharCode(letterToAscii)
          return encryptedText = encryptedText.concat(letterToAscii)
          
        }else if((97 <= letter.charCodeAt(0) && letter.charCodeAt(0) <= 122) ||(65 <= letter.charCodeAt(0) && letter.charCodeAt(0)<= 90 )){
          letterToAscii = String.fromCharCode(letterToAscii)
          return encryptedText = encryptedText.concat(letterToAscii)
      
        }else{
          return encryptedText = encryptedText.concat(letter)
        }
    })
  }
  // Return encrypted text
  return encryptedText;
 }

function DisplaySubstitutionAlphabet() {
  // Get shift num and shift left states
  const shiftNum = GetShiftNum();
  const shiftLeft = GetShiftLeft();

  // Get reference to substitution alphabet div
  let subDiv = document.querySelector("#SubstitutionAlphabet");
  if (subDiv) {
    subDiv.innerHTML = "";

    const arrASCII = [...Array(128).keys()];
    const limArrASCII = arrASCII.filter((item) => (minASCIIDecimal <= item && item <= maxASCIIDecimal));
    
        const shiftlimArrASCII = limArrASCII.map((item) =>{
          if(shiftLeft == false) {
            if((item >= 65 && item <= 90) || (item >= 97 && item <= 122)){
              shiftItem = item + shiftNum
              if((97 <= item <= 122 && shiftItem > 122) || (shiftItem > 90 && 65 <= item && 90>= item)){
                return shiftItem - 26
              }else{
                return shiftItem
              }
            }else{
              return item
            }
          }else{
            if((item >= 65 && item <= 90) || (item >= 97 && item <= 122)){
              shiftItem = item - shiftNum
              if((97 > shiftItem && 97 <= item &&  122 >= item) || (65 > shiftItem && 65 <= item && 90>= item)){
                return shiftItem + 26
              }else{
                return shiftItem
              }
            }else{
              return item
            }
          }
        })  
        let output = "";
        limArrASCII.forEach((item, index) => {
          output = document.createElement("div")
          output.setAttribute("key", String.fromCharCode(item))
          output.innerHTML = `${(String.fromCharCode(item))} = ${(String.fromCharCode(shiftlimArrASCII[index]))}`
          return subDiv.appendChild(output)
        }) 

  }
}

window.onload = () => {
  // Wait for DOM to load before attempting to access any HTML elements
  // TODO: Add default shift position number value using querySelector and defaultNumShift
 document
   .querySelector("#CypherShiftNumInput").defaultValue=defaultNumShift
    //.addEventListener("load", ChangeCypherShiftNumInput)

  // TODO: Add default shift left value using querySelector and defaultLeftShift
  document.querySelector("#ShiftLeftCheckbox").checked = defaultLeftShift

  // Add event handlers
  document
    .querySelector("#ClearTextInput")
    .addEventListener("input", ChangeClearTextInput);
  document
    .querySelector("#CypherShiftNumInput")
    .addEventListener("input", ChangeCypherShiftNumInput);
  document
    .querySelector("#ShiftLeftCheckbox")
    .addEventListener("change", ChangeShiftLeftCheckbox);

  // Display subsitution alphabet based on default settings
  DisplaySubstitutionAlphabet();
};