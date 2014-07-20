Parse.initialize("ZvuYGWmttHsaBJ0UDvxK76s7cstAwNRzh4SYDDLV", "KmJ694MObD0g26KVUyF2L8esD1MwTR76hMWJhfUA");

var Sentence = Parse.Object.extend("Sentence");
var Question = Parse.Object.extend("Question");
var queryQuestion = new Parse.Query(Question);
var querySentence = new Parse.Query(Sentence);
var SentenceCollection = Parse.Collection.extend({
  model: Sentence,
  query: (new Parse.Query(Sentence)).ascending("createdAt")
});


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
  queryQuestion.notEqualTo("numId", "99");
  queryQuestion.find({
    success: function (results) {
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        alert(object.get('content'));
      }
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

/*
 *  Returns a list of Strings representing sentences, with the oldest sentence in index 0.
 *  Leverages the Parse Collection object.
 */
function fetchSentences() {
  var collection = new SentenceCollection();
  collection.fetch({
    success: function(collection) {
      sentences = []
      for (i = 0, len = collection.models.length; i < len; i++) {
        sentences.push(collection.models[i].attributes.text);
      }
      return sentences
    },
    error: function(collection, error) {
      alert("There was an error retrieving the surprise. Please refresh the page and try again.")
    }
  });
}


//////////////////////////////////////////
//           Initialization            ///
//////////////////////////////////////////

init();
