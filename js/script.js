

    var questions = getQuestions(),
    answers = [],
    i=0,
    value="";

    //sets question in placeholder prompt
    $("#text").attr("placeholder", questions[i]);




    //next question function- next question,resets input on click + enter
    function nextQuestion(){
    	if (i<=3){
	    	i++;
	        console.log(i);
	        $("#text").attr("placeholder", questions()[i]);
	        console.log(value);
	        answers.push(value);//pushes response to answers array
	        console.log(answers);
	        $("#text").attr("value","");
    	} else {
    		//once the first 5 are done
			$("#text").attr("placeholder", "Write the next sentence using your answers.");
			$("#text").attr("maxlength", "140");
			

		}
    };

    //updating value with every keypress
    $("#text")
 		.keyup(function() {
    	value = $(this).val();
  		});
  		
 	//on button click, do shit
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

/*
 if(i==4){
		$('#button').click(function(){
			$("#text").attr("placeholder", "Write the next sentance.");
			console.log("herd");
		});

	}*/








