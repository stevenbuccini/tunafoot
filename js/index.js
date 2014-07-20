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
    (_isInArray(newNumber, arr)) ? "hacky" : arr.push(newNumber);
  }
  return arr;
}

function _isInArray(value, array) {
  return array.indexOf(value) > -1;
}



function getQuestions() {
  var questionIds = _getRandomNumbersList(),
  questions = [],
  object,
  index;

  queryQuestion.notEqualTo("numId", 99);

  queryQuestion.find({
    success: function (results) {
      for (var i = 0; i < QUESTIONS_PER_USER; i++) { 
        index = questionIds[i]
        object = results[index];
        appendToQuestionsList(object.get('content'));
      }
    },
      error: function (error) {
        alert("this should never happen you are fucked.")
      }
    });

  function appendToQuestionsList(newQuestion) {
    questions.push(newQuestion);
  }

  return function() { return questions};
}


$('.sentence-input').keypress(function() {
  var answers = ["dog","blue"];
    var el = this;
    if (this.timeoutId)
        window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(function () {
      var input = $(el).val().split(" ");
      if (isValidNewSentence(answers, input)) {
        alert("Got the words!");
      }
    }, 200);
});

function isValidNewSentence(answers, input) {
  var total=0;
  for (var i = 0; i<input.length; i++) {
    for (var k = 0; k < answers.length; k++) {
      (input[i] == answers[k]) ? total++ : "hacky";
    }
    if (total >= answers.length) {
      return true
    }
  }
  return false
}




