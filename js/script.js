$( document ).ready(function() {

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


    //next question function- next question,resets input on click + enter
    function nextQuestion(){
        if (value.length>0){
        	if (i<4){
    	    	i++;
    	        console.log(i);
    	        $("#text").attr("placeholder", questions[i]);
    	        console.log(value);
    	        answers.push(value);//pushes response to answers array
    	        console.log(answers);
    	        $("#text").attr("value","");
        	} else if(i=4) {
                //fifth one
                console.log(value);
                answers.push(value);
                console.log(answers);
                $("#text").attr("value","");
    			$("#text").attr("placeholder", "Write the next sentance using your answers.");
    			$("#text").attr("maxlength", "140");			
    		} else {
                //after fifth
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