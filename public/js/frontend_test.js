function checkArrow(serverAnswer){
  var numberPage = document.querySelector("#input-task-number").value

  if(serverAnswer != null){
  	arrowLink = document.querySelector(".arrow_next_page");

    if(numberPage == "1"){
      arrowLink.href = "/index/python_lessons_2";
    }
    if(numberPage == "2"){
      arrowLink.href = "/index/python_lessons_3";
    }
    if(numberPage == "3"){
      arrowLink.href = "/index/python_lessons_3";
    }
    arrowLink.style.opacity = 1;
  }
}

var serverAnswer = document.querySelector(".code-window-server-text").value;
var check_task = "Right Answer!";
result = serverAnswer.match(check_task);

checkArrow(result);
