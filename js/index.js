Parse.initialize("ZvuYGWmttHsaBJ0UDvxK76s7cstAwNRzh4SYDDLV", "KmJ694MObD0g26KVUyF2L8esD1MwTR76hMWJhfUA");

var Sentence = Parse.Object.extend("Sentence");
var Question = Parse.Object.extend("Question");
var queryQuestion = new Parse.Query(Question);
var querySentence = new Parse.Query(Sentence);

//////////////////////////////////////////
// VARIABLES AND FUNCTION DECLARATIONS ///
//////////////////////////////////////////

var TOTAL_QUESTIONS = 7;
var QUESTIONS_PER_USER = 5;

function _getRandomNumbersList() {
  var arr = []
  while (arr.length <= QUESTIONS_PER_USER) {
    var newNumber = Math.floor(Math.random() * TOTAL_QUESTIONS);
    (newNumber in arr) ? "E" : arr.push(newNumber);
  }
  return arr;
}

function getQuestions() {
  var questionIds = _getRandomNumbersList();
  var questions = [];
  // queryQuestion.equalTo("numId", ;
  queryQuestion.find({
    success: function (results) {
      },
      error: function (error) {
        alert("this should never happen you are fucked.")
      }
    });

  for (var j = 0; j < QUESTIONS_PER_USER; j++) {
   
  }
}

function init() {
  var questions = getQuestions();
  console.log(questions);
  
}


//////////////////////////////////////////
//           Initialization            ///
//////////////////////////////////////////

init();
