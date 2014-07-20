
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
  //var answers = ["dog","blue"];
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

$(document).ready(function() {

    var questions = [
        "Who are you?",
        "Where do you come from and why?",
        "What's your favorite thing?",
        "What's the most dangerous thing you own?",
        "What is the folly of man?"];

    var answers = [];

    //set variable for #of questions and responses
    var i=0;

    //sets question in placeholder prompt
    $("#text").attr("placeholder", questions[i]);

    var value="";

    /*var questions = getQuestions(),
    answers = [],
    i=0,*/




    //next question function- next question,resets input on click + enter
    function nextQuestion(){
        if (value.length>0){
        	if (i<4){
    	    	i++;
    	        $("#text").attr("placeholder", questions[i]);
    	        console.log(value, i);
    	        answers.push(value);//pushes response to answers array
    	        console.log(answers);
    	        $("#text").attr("value","");
        	} else if (i===4) {
                //fifth one
                i++,
                console.log(value, i);
                answers.push(value);
                console.log(answers);
                $("#text").attr("value","");
                $("input").addClass("sentence-input");
    			$("#text").attr("placeholder", "Write the next sentence using your answers.");
    			$("#text").attr("maxlength", "180");
                document.getElementById('wordbank').innerHTML = answers.join(" ");
                $("#lastsentence").fadeIn();
                $("#wordbank").fadeIn();
    		} 
        }
    };

    //updating value with every keypress
    $("#text")
 		.keyup(function() {
    	value = $(this).val();
  		});
  		
 	//on button click, do next question
    $('#button').click(function(){   
    	nextQuestion();

    });

    //on enter keypress, do the same shit as button click
	$(document).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			//do this code when enter is pressed, first line prevents page refresh
			event.preventDefault();
			nextQuestion();	
		}
	});

});
