import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  inputArr = []; //Array to store canvas
  isValid = true; //isValid variable used for form validation
  errorMessage = ""; //Initialize variable for error message
  canvasColor = Array(); //2D Array for the whole canvas

  constructor() { }

  ngOnInit() {
  }

  //Function to populate canvas
  checkInput(inputData) {
    let separatedInputData = [];
    separatedInputData = inputData.split(" ");  //Separate the input text into an array

    if (this.inputArr.length == 0 && separatedInputData[0].toUpperCase() != 'C') { //Check if canvas is already created and a valid canvas input
      this.isValid = false;
      this.errorMessage = "Please enter C x y, where x and y are <= 500 and > 0."
    }
    else if (this.inputArr.length > 0 && separatedInputData[0].toUpperCase() == 'C') { // Check if canvas is already created
      this.isValid = false;
      this.errorMessage = "Canvas already created!"
    }
    else { //If it is valid, then continue with switch statements
      let canvas: any = document.getElementById("canvasDiv");
      let ctx = canvas.getContext("2d");

      let img = new Image();
      img.src = './assets/images/x.png'; //x png image

      switch (separatedInputData[0].toUpperCase()) {
        case "C": //If input is C and is valid, create canvas
          if (separatedInputData.length == 3 && (this.isNumeric(separatedInputData[1]) && this.isNumeric(separatedInputData[2])) && (this.isValidNumber(separatedInputData[1], 500) && this.isValidNumber(separatedInputData[2], 500))) {
            this.inputArr = inputData.split(" ");
            this.isValid = true;
            this.create2DArray(separatedInputData[1], separatedInputData[2]); //Create empty 2D array
            ctx.rect(0, 0, separatedInputData[1], separatedInputData[2]);
            ctx.stroke();
          }
          else {
            this.isValid = false;
            this.errorMessage = "Please enter C x y, where x and y are <= 500 and > 0."
          }
          break;
        case "L": //If input is L and is valid, create line
          if (this.isInCanvas(this.inputArr, separatedInputData) && separatedInputData.length == 5 && (this.isNumeric(separatedInputData[1]) && this.isNumeric(separatedInputData[2]) && this.isNumeric(separatedInputData[3]) && this.isNumeric(separatedInputData[4])) && (this.isValidNumber(separatedInputData[1], 500) && this.isValidNumber(separatedInputData[2], 500) && this.isValidNumber(separatedInputData[3], 500) && this.isValidNumber(separatedInputData[4], 500))) {
            if (this.isHorizontalVertical(separatedInputData)) { //Check if line is horizontal or vertical
              this.isValid = true;
              let width = this.calculateLength(separatedInputData[1], separatedInputData[3]);
              let height = this.calculateLength(separatedInputData[2], separatedInputData[4]);
              this.block2DArray(separatedInputData[1], separatedInputData[2], separatedInputData[3], separatedInputData[4]); //Populate line with value '1' in 2D Array
              img.onload = function () { //Draw line with x png
                let ptrn = ctx.createPattern(img, 'repeat');
                ctx.fillStyle = ptrn;
                ctx.fillRect(separatedInputData[1], separatedInputData[2], width, height);
              }
            }
            else {
              this.isValid = false;
              this.errorMessage = "Only vertical and horizontal lines are allowed. Also make sure x2>=x1 and y2>=y1."
            }
          }
          else {
            this.isValid = false;
            this.errorMessage = "Please enter L x1 y1 x2 y2, where x <= " + this.inputArr[1] + " and y <= " + this.inputArr[2];
          }
          break;
        case "R": //If input is R and is valid, create rectangle
          if (this.isInCanvas(this.inputArr, separatedInputData) && separatedInputData.length == 5 && (this.isNumeric(separatedInputData[1]) && this.isNumeric(separatedInputData[2]) && this.isNumeric(separatedInputData[3]) && this.isNumeric(separatedInputData[4]))) {
            if (this.isValidRectangleCoord(separatedInputData)) { //Check if rectangle coordinates are valid
              this.isValid = true;
              let width = this.calculateLength(separatedInputData[1], separatedInputData[3]);
              let height = this.calculateLength(separatedInputData[2], separatedInputData[4]);
              this.block2DArray(separatedInputData[1], separatedInputData[2], separatedInputData[3], separatedInputData[4]);
              img.onload = function () {
                let ptrn = ctx.createPattern(img, 'repeat');
                ctx.fillStyle = ptrn;
                ctx.fillRect(separatedInputData[1], separatedInputData[2], width, 1);
                ctx.fillRect(separatedInputData[1], separatedInputData[4], width, 1);
                ctx.fillRect(separatedInputData[1], separatedInputData[2], 1, height);
                ctx.fillRect(separatedInputData[3], separatedInputData[2], 1, height);
              }
            }
            else {
              this.isValid = false;
              this.errorMessage = "Make sure x2 y2 > x1 y1."
            }
          }
          else {
            this.isValid = false;
            this.errorMessage = "Please enter R x1 y1 x2 y2, where x <= " + this.inputArr[1] + " and y <= " + this.inputArr[2];
          }
          break;
        case "B": //If input is B and is valid, color canvas
          if (this.isInCanvas(this.inputArr, separatedInputData) && separatedInputData.length == 4 && (this.isNumeric(separatedInputData[1]) && this.isNumeric(separatedInputData[2]) && this.isAlphabet(separatedInputData[3]))) {
            if (this.isValidColor(separatedInputData[3])) { //Check if is valid colour R G or B
              this.isValid = true;
              let colorimg = new Image();
              colorimg.src = './assets/images/' + this.isValidColor(separatedInputData[3]) + '.png';
              this.fillColor(ctx, separatedInputData[1], separatedInputData[2], colorimg);
            }
            else {
              this.isValid = false;
              this.errorMessage = "Please make sure c is a color (e.g. r='red', g='green', b='blue')."
            }
          }
          else {
            this.isValid = false;
            this.errorMessage = "Please enter B x y c, where x <= " + this.inputArr[1] + " and y <= " + this.inputArr[2] + " and c is a color (e.g. r='red', g='green', b='blue')."
          }
          break;
        case "Q": //If input is Q and is valid, quit and restart canvas
          if (separatedInputData.length == 1) {
            this.isValid = true;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            this.inputArr = [];
          }
          break;
        default:
          this.isValid = false;
          this.errorMessage = "Please enter a valid input."
      }
    }
  }

  isNumeric(num): boolean { //Check if input is numeric
    return !isNaN(num);
  }

  isAlphabet(text): boolean { //Check if input is alphabet only
    const pattern = /^[^aeiou]+$/i;
    if (pattern.test(text)) {
      return true;
    }
    else {
      return false;
    }
  }

  isValidNumber(num, max): boolean { //Check if number is a valid number >0 and <= max canvas size
    return parseInt(num) <= max && parseInt(num) > 0;
  }

  isHorizontalVertical(arr): boolean { //Check if x1 x2 y1 y2 coordinates is a horizontal or vertical line
    return ((parseInt(arr[1]) == parseInt(arr[3])) || (parseInt(arr[2]) == parseInt(arr[4]))) && ((parseInt(arr[3]) >= parseInt(arr[1])) && (parseInt(arr[4]) >= parseInt(arr[2])));
  }

  isValidRectangleCoord(arr): boolean { //Check if x1 x2 y1 y2 is a valid rectangle coordinate
    return (parseInt(arr[3]) > parseInt(arr[1])) && (parseInt(arr[4]) > parseInt(arr[2]));
  }

  calculateLength(value1, value2): Number { //Calculate length of value1 and value2
    if (value2 - value1 == 0) {
      return 1
    }
    else {
      return value2 - value1;
    }
  }

  isValidColor(color) { //Check if its a valid color R G or B and return color string
    if (color.toLowerCase() == 'r') {
      return "red";
    }
    else if (color.toLowerCase() == 'g') {
      return "green";
    }
    else if (color.toLowerCase() == 'b') {
      return "blue";
    }
    else {
      return false;
    }
  }

  isInCanvas(arrCanvas, arrInput): boolean { //Check if coordinates is in canvas
    if (arrInput.length == 5) {
      return parseInt(arrInput[1]) <= parseInt(arrCanvas[1]) && parseInt(arrInput[2]) <= parseInt(arrCanvas[2]) && parseInt(arrInput[3]) <= parseInt(arrCanvas[1]) && parseInt(arrInput[4]) <= parseInt(arrCanvas[2]);
    }
    else {
      return parseInt(arrInput[1]) <= parseInt(arrCanvas[1]) && parseInt(arrInput[2]) <= parseInt(arrCanvas[2]);
    }
  }

  create2DArray(rows, columns) { //Create empty 2D array
    this.canvasColor = new Array(columns);
    for (var i = 0; i < columns; i++) {
      this.canvasColor[i] = new Array(Number(rows));
    }
  }

  block2DArray(x1, y1, x2, y2) { //Block the 2D array with input '1' at positions where there are rectangle or lines created
    let isVertical = false;
    let isHorizontal = false;
    let isRectangle = false;

    x1 = Number(x1);
    let tempx1 = x1;
    x2 = Number(x2);
    y1 = Number(y1);
    y2 = Number(y2);

    if (x1 == x2) { //Check if its vertical line
      isVertical = true;
    }
    else if (y1 == y2) { //Check if its horizontal line
      isHorizontal = true;
    }
    else { //Else its rectangle
      isRectangle = true;
    }

    if (isHorizontal) {
      for (var i = 0; x1 <= x2; x1++) {
        this.canvasColor[y1][x1] = 1;
      }
    }
    else if (isVertical) {
      for (var i = 0; y1 <= y2; y1++) {
        this.canvasColor[y1][x1] = 1;
      }
    }
    else if (isRectangle) {
      for (var i = 0; y1 <= y2; y1++) {
        for (var x1 = tempx1; x1 <= x2; x1++) {
          this.canvasColor[y1][x1] = 1;
        }
      }
    }
  }

  fillColor(ctx, x, y, color) { //Function to fill the canvas with color except positions where there are rectanbles and lines
    let canvasArr = this.canvasColor;
    if (this.canvasColor[y][x] !== 1) {
      color.onload = function () {
        let ptrn = ctx.createPattern(color, 'repeat');
        ctx.fillStyle = ptrn;
        for (var y = 0; y < canvasArr.length; y++) {
          for (var x = 0; x < canvasArr[0].length; x++) {
            if (canvasArr[y][x] !== 1) {
              ctx.fillRect(x, y, 1, 1);
            }
          }
        }
      }
    }
  }
}