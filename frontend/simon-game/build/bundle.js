/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);


/** 
 * Set Array of Sequence seqArr , and round = 1
 * check for user's input 
 *    if(CheckInput()) {
 *      round++
 *      repeat line 3 
 *    }
 *    else Notify and replay() last sequence 
 * 
 */
window.onload = start;
let machineSequence = [];
let humanSequence = [];
let btnClicked;
let count;
/* Start the game */
function start() {
  document.querySelector("#strict").addEventListener("click", playStrict);
  document.querySelector("#start").addEventListener("click", main);
}

/* Driver function for the game */

function main() {
  console.log("Game started , main ()...");
  if (machineSequence.length > 0 /* empty sequence if it has contents */)
    machineSequence = [];
  if (humanSequence.length > 0) humanSequence = [];
  count = 0;
  document.querySelector(".count").innerHTML = "0"; //reset the count
  next(machineSequence);

  btnClicked = document.querySelector(".game");
  //   console.log("btnClicked" + btnClicked.id);
  btnClicked.addEventListener("click", function(event) {
    // console.log(
    //   "className: " + event.target.className + " Id " + event.target.id
    // );
    if (event.target.className === "child") {
      humanSequence.push(event.target.id);
      humanPlay(event.target.id); /* flush and play music */

      //   console.log("event.target.id " + event.target.id);
      //   console.log("After loggin id");
      //   console.log("human Sequence" + humanSequence);
      //only compare if there are equal number of elements in human and machine sequence
      if (humanSequence.length == machineSequence.length) {
        if (compare()) {
          humanSequence = [];
          next(machineSequence);
        } else {
          console.log("error, aborting...");
          return;
        }
      }
      //   else {
      //     // console.log("machine sequence if all fails: " + machineSequence);
      //     machinePlay(machineSequence);
      //     btnClicked = document.querySelector(".game");
      //     btnClicked.addEventListener("click", function(event) {
      //       if (event.target.className === "child") {
      //         humanSequence.push(event.target.id);
      //         humanPlay(event.target.id); /* flush and play music */

      //         // console.log("second btn clicked.target.id " + event.target.id);
      //         // console.log("After loggin id");
      //       }
      //     });
      // return;
      //   }
    }
  });
}

//compare sequence and check if player won
function compare() {
  //   console.log("human sequence: " + humanSequence);
  //   console.log("machineSequence:" + machineSequence);
  if (compareSequence(machineSequence)) {
    count++;
    document.querySelector(".count").innerHTML = count;

    if (checkIfWon(count)) {
      alert("You won!");
    }

    // alert("you're winning");
  } else if (!compareSequence(machineSequence)) {
    document.querySelector("#youLost").innerHTML =
      "You pressed the wrong button. Try again!";

    return false;
  }
  //   console.log("Finally, you won!");

  return true;
}

/**
 * pick random color, push it to seqArr , then play (seqArr)
 */
function next(sequence) {
  let colors = ["red", "green", "blue", "yellow"],
    randomColor = colors[Math.floor(Math.random() * 4)];

  sequence.push(randomColor);
  console.log("inside next: sequence: " + sequence.toString());
  machinePlay(sequence);
}

/* flash an element and play music */
function flashElement(element, buttonName) {
  console.log("button: ", buttonName);
  //   element.style.backgroundColor = "white";
  //   element.style.backgroundColor = element.id;
  // element.classList.add(buttonName);
  // setTimeout(function() {  // internal setTimeout is making this take too long and async
  //     element.classList.remove(buttonName);}, 500);   // adjust to 500 to
}

/* play the human sequence */
function humanPlay(color) {
  let colorId = "#" + color;
  let music;
  let element = document.querySelector(colorId);
  if (color == "green") {
    flashElement(element, "buttonGreen");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    //music.play();
  } else if (color == "yellow") {
    flashElement(element, "buttonYellow");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    //music.play();
  } else if (color == "blue") {
    flashElement(element, "buttonBlue");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    // music.play();
  } else if (color == "red") {
    flashElement(element, "buttonRed");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    //music.play();
  }

  music.play();
}

function playStrictDriver() {
  document.querySelector("#strict").addEventListener("click", playStrict);
}

function playStrict() {
  restart();
  var strictBtn = document.querySelector(".game");
  document.querySelector(".count").innerHTML = "0";
  count = 0;

  strictBtn.addEventListener("click", function(event) {
    // console.log(
    //   "className: " + event.target.className + " Id " + event.target.id
    // );
    if (event.target.className === "child") {
      humanSequence.push(event.target.id);
      humanPlay(event.target.id); /* flush and play music */

      //only compare if there are equal number of elements in human and machine sequence
      if (humanSequence.length == machineSequence.length) {
        if (compare()) {
          humanSequence = [];
          next(machineSequence);
        }
      } else {
        // console.log(
        //   "You pressed the wrong button. Game will restart. " + machineSequence
        // );
        next(machineSequence);
      }
    }
  });
}
/**
 * loop through the machine Sequence 
 * for each color playSound(color) and flash()
 * 
 */
function machinePlay(sequence) {
  let audio = {
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  for (let i = 0; i < sequence.length; i++) {
    let element;
    let colorID = "#" + sequence[i];
    element = document.querySelector(colorID);
    if (sequence[i] == "green") {
      flashElement(element, "buttonGreen");
      let music = new Audio(audio[i]);
      music.play();
    } else if (sequence[i] == "blue") {
      flashElement(element, "buttonBlue");
      let music = new Audio(audio[i]);
      music.play();
    } else if (sequence[i] == "yellow") {
      flashElement(element, "buttonYellow");
      let music = new Audio(audio[i]);
      music.play();
    } else {
      flashElement(element, "buttonRed");
      let music = new Audio(audio[i]);
      music.play();
    }
  }
}

/* Compare human sequence and machine sequence for maching button presses */
function compareSequence() {
  for (let i = 0; i < machineSequence.length; i++) {
    if (machineSequence[i] != humanSequence[i]) {
      return false;
    } else {
      humanPlay(humanSequence[i]);
    }
  }
  return true;
}

function restart() {
  humanSequence = machineSequence = [];
  count = 0;
}

/* Initialize arrays so they are all empty in preparation for next sequence */
function initArrays(humanSeq, machineSeq) {
  machineSeq = humanSeq = [];
}

function checkIfWon(count) {
  return count === 20;
}

function playPiece(audio) {
  return new Promise((resolve, reject) => {
    const piece = new Audio(audio);
    piece.play();
    piece.addEventListener("ended", () => resolve());
  });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "  * {\r\n      box-sizing: border-box;\r\n    }\r\n\r\n    body {\r\n      /* font-family:\"lato\" */\r\n    }\r\n\r\n    .container {\r\n      padding: 50px;\r\n    }\r\n\r\n    .game {\r\n      position: relative;\r\n      margin: 0 auto;\r\n      height: 500px;\r\n      width: 500px;\r\n      border-radius: 50%;\r\n      border: 10px #a0a0a0 solid;\r\n      display: flex;\r\n      flex-wrap: wrap;\r\n      overflow: hidden;\r\n      box-shadow: 3px 5px 11px 5px #7a7a7a;\r\n    }\r\n\r\n.center {\r\n    margin-left: 150px;\r\n}\r\n\r\n    .child {\r\n      width: 50%;\r\n      height: 50%;\r\n      border: none;\r\n      cursor: pointer;\r\n    }\r\n\r\n    #green {\r\n      background: #4caf50;\r\n    }\r\n\r\n    #blue {\r\n      background: #303d91;\r\n    }\r\n\r\n    #red {\r\n      background: #ef5350;\r\n    }\r\n\r\n    #youLost {\r\n       color: red;\r\n       text-align: center;\r\n       font-size: 1.5em;\r\n       padding-bottom: 20px;\r\n   }\r\n    #yellow {\r\n      background: #fdd835;\r\n    }\r\n\r\n    .menu {\r\n      position: absolute;\r\n      top: 25%;\r\n      left: 25%;\r\n      height: 250px;\r\n      width: 250px;\r\n      border-radius: 50%;\r\n      border: 5px grey solid;\r\n      background: white;\r\n      padding-top: 2em;\r\n    }\r\n\r\n    .menu h1 {\r\n      text-align: center;\r\n      margin-bottom: 20px;\r\n    }\r\n\r\n    .menu .settings {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      margin: 20px;\r\n    }\r\n\r\n    .menu .settings .count {\r\n      padding: 2px;\r\n      border: 1px solid #ef5350;\r\n      background: #38251f;\r\n      position: relative;\r\n    }\r\n\r\n    .menu .settings .count i {\r\n      color: #ef5350;\r\n      padding: 5px 15px;\r\n    }\r\n\r\n    .menu .settings .count span {\r\n      position: absolute;\r\n      bottom: -25px;\r\n    }\r\n\r\n    .menu .ON-btn {\r\n      text-align: center;\r\n      padding-top: 20px;\r\n    }\r\n\r\n    .menu .ON-btn i {\r\n      position: relative;\r\n      display: inline-flex;\r\n      width: 35px;\r\n      height: 20px;\r\n      background: #383838;\r\n      border: 2px solid #383838;\r\n      border-radius: 2px;\r\n    }\r\n\r\n    .menu .ON-btn i::before {\r\n      position: absolute;\r\n      content: \"\";\r\n      width: 15px;\r\n      height: 16px;\r\n      background: #528cc5;\r\n      right: 0;\r\n      border-radius: 1px;\r\n      box-shadow: inset 1px 1px 3px 0 #a1cbf6;\r\n    }\r\n\r\n.darker {\r\n    color: #255d25;\r\n}\r\n\r\n  @keyframes glowingBlue {\r\n  0% { background-color: #0000ff; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #071a27; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #0000ff; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n  \r\n\r\n@-moz-keyframes glowingBlue {\r\n  0% { background-color: #0000ff; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #071a27; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #0000ff; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-o-keyframes glowingBlue {\r\n  0% { background-color: #004A7F; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #0094FF; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #004A7F; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-webkit-keyframes glowingBlue {\r\n  0% { background-color: #004A7F; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #0094FF; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #004A7F; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n.buttonBlue {\r\n  -webkit-animation: glowingBlue 1500ms 2;\r\n  -moz-animation: glowingBlue 1500ms 2;\r\n  -o-animation: glowingBlue 1500ms 2;\r\n  animation: glowingBlue 1500ms 2;\r\n}\r\n\r\n@keyframes glowingRed {\r\n  0% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #eb1d19; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-moz-keyframes glowingRed {\r\n   0% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #eb1d19; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-o-keyframes glowingRed {\r\n   0% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #eb1d19; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-webkit-keyframes glowingRed {\r\n   0% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #eb1d19; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #ef5350; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n.buttonRed {\r\n  -webkit-animation: glowingRed 1500ms 2;\r\n  -moz-animation: glowingRed 1500ms 2;\r\n  -o-animation: glowingRed 1500ms 2;\r\n  animation: glowingRed 1500ms 2;\r\n}\r\n\r\n@keyframes glowingYellow {\r\n  0% { background-color: #fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #d3ad08;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color:#fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-moz-keyframes glowingYellow {\r\n 0% { background-color: #fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #d3ad08;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color:#fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-o-keyframes glowingYellow {\r\n  0% { background-color: #fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #d3ad08;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color:#fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-webkit-keyframes glowingYellow {\r\n 0% { background-color: #fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #d3ad08;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color:#fdd835;; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n.buttonYellow {\r\n  -webkit-animation: glowingYellow 1500ms 1;\r\n  -moz-animation: glowingYellow 1500ms 1;\r\n  -o-animation: glowingYellow 1500ms 1;\r\n  animation: glowingYellow 1500ms 1;\r\n}\r\n\r\n\r\n@keyframes glowingGreen {\r\n   0% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #255d25;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-moz-keyframes glowingGreen {\r\n  0% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #255d25;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-o-keyframes glowingGreen {\r\n   0% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #255d25;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n\r\n@-webkit-keyframes glowingGreen {\r\n   0% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n  50% { background-color: #255d25;; box-shadow: 0 0 10px #0094FF; }\r\n  100% { background-color: #008000; box-shadow: 0 0 3px #004A7F; }\r\n}\r\n.buttonGreen {\r\n  -webkit-animation: glowingGreen 1500ms 2;\r\n  -moz-animation: glowingGreen 1500ms 2;\r\n  -o-animation: glowingGreen 1500ms 2;\r\n  animation: glowingGreen 1500ms 2;\r\n}\r\n\r\n.image {\r\n    padding-bottom: 25px;\r\n}\r\n\r\n.count {\r\n    color: #ffffff;\r\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);