function checkArrow(serverAnswer){
  // get the number of the page
  var numberPage = document.querySelector("#input-task-number").value
  // create texta to color correct/incorrect answer
  var texta = document.querySelector(".code-window-server-text");
  // match function return null if no matches in string else return string
  if(serverAnswer != null){
    texta.style.color = "green";
    // to unlock next page add href to it
    arrowLink = document.querySelector(".arrow_next_page");
    if(numberPage == "1"){
      arrowLink.href = "/index/python_lessons_2";
    }
    if(numberPage == "2"){
      arrowLink.href = "/index/python_lessons_3";
    }
    if(numberPage == "3"){
      arrowLink.href = "/index/python_lessons_4";
    }

    arrowLink.style.opacity = 1;
  } else{
    texta.style.color = "red";
  }
}

var serverAnswer = document.querySelector(".code-window-server-text").value;
result_correct = serverAnswer.match("Right Answer!");

checkArrow(result_correct);
