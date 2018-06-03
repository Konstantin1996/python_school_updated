$('#input-send').click(function() {
  $.ajax({
    type: "POST",
    url: "http://localhost:9000/index/python_lessons",
    dataType: "json",

    success: function(){
      alert("vse horosho");
    },
    error: function(){
      alert("fuck this shit");
    }
  });
})
