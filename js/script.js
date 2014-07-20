
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
var answers = {};
var goodToSave = false;
var yourSentence = "";

//dummy story content
var story = ["Lorem ipsum dolor sit amet, usu in sint blandit aliquando, eu viderer dolorem mnesarchum per.",
"Veri deleniti ad quo, at quo dico tamquam, per te quas mutat deseruisse.",
"Per inani putent ne, expetenda pertinacia vituperata ei cum.",
"Per inani putent ne, expetenda pertinacia vituperata ei cum.",
"Lorem ipsum dolor sit amet, usu in sint blandit aliquando, eu viderer dolorem mnesarchum per.",
"Veri deleniti ad quo, at quo dico tamquam, per te quas mutat deseruisse.",
"Per inani putent ne, expetenda pertinacia vituperata ei cum.",
"Lorem ipsum dolor sit amet, usu in sint blandit aliquando, eu viderer dolorem mnesarchum per.",
"Veri deleniti ad quo, at quo dico tamquam, per te quas mutat deseruisse.",
"Per inani putent ne, expetenda pertinacia vituperata ei cum.",];

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

function allTrue(answers){
    for(var word in answers) {
        if(!answers[word]) return false;
    }
    return true;
}

function checkSentenceForRequiredWords() {
    var el = this;
    var input = $(el).val().split(" ");
    for (var k in answers) {
        answers[k] = false;
        for (var i = 0; i < input.length; i++) {
            if (input[i] === k) {
                answers[k] = true;
            } 
        }
    }
    // At this point, answers will have the correct values for each word
    for (var word in answers) {
        if (answers[word]) {
            $("#" + word).css("color", "#0f0");
        } else {
            $("#" + word).css("color", "#333");
        }
    }

    if (allTrue(answers)){
        console.log("all are true, go ahead");
        goodToSave = true;
    }
    
}





var debouncedCheckSentence = _.debounce(checkSentenceForRequiredWords, 300);



    /*function() {
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
}); */

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


    var questions = [
        "Who are you?",
        "Where do you come from and why?",
        "What's your favorite thing?",
        "What's the most dangerous thing you own?",
        "What is the folly of man?"];

    //set variable for #of questions and responses
    var i=0;

    //sets question in placeholder prompt
    $("#text").attr("placeholder", questions[i]);

    var value="";

    //*var questions = getQuestions(),


    //next question function- next question,resets input on click + enter
    function nextQuestion(){
        var el = this;
        if (value.length>0){
        	if (i<4){
    	    	i++;
    	        $("#text").attr("placeholder", questions[i]);
    	        console.log(value, i);
                answers[value] = false;//pushes response to answers array
    	        console.log(answers);
    	        $("#text").attr("value","");
        	} else if (i===4) {
                //fifth one
                i++,
                console.log(value, i);
                answers[value] = false;
                console.log(answers);
                $("#text").attr("value","");
                $("input").addClass("sentence-input");
    			$("#text").attr("placeholder", "Write the next sentence using your answers.");
    			$("#text").attr("maxlength", "180");

                // Add listener here becuase class doesn't exist before
                $('.sentence-input').keyup(debouncedCheckSentence);
                var wordBankHtml = ""
                for(var k in answers) {
                    wordBankHtml += '<span id="' + k + '">' + k  + '&nbsp;</span>'
                }   

                document.getElementById('wordbank').innerHTML = wordBankHtml;

                $("#lastsentence").fadeIn();
                $("#wordbank").fadeIn();
    		} else if (goodToSave){
                //triggers following code on enter/click when all is good to save
                
                console.log(value);
                var yourSentence= value;
                var sentenceObj = new Sentence();
                sentenceObj.set("text", yourSentence)
                console.log(yourSentence);
                sentenceObj.save(null, {
                  success: function(sentenceObj) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + sentenceObj.id);
                  },
                  error: function(sentenceObj, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and description.
                    alert('Failed to create new object, with error code: ' + error.message);
                  }
                });
            }
        }
    };

    //updating value with every keypress
    $("#text").keyup(function() {

            value = $("#text").val();
            //console.log(value);

            if (i>4){

                function wordInString(s, word){
                    return new RegExp( '\\b' + word + '\\b', 'i').test(s);
                }

                //if (wordInString(value , answers[0])) {alert('fuck');}

            }   
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


