function openFileDialog (){
  $("#upload").trigger('click');
}

function readURL(files) {
  if (files[0]) {
    // A file reader to send the Microsoft Cognitive Services
    var emotionReader = new FileReader();
    emotionReader.onload = getEmotion;
    emotionReader.readAsArrayBuffer(files[0]);

    // A file reader to preview the image on the screen
    var previewReader = new FileReader();
    previewReader.onload = preview;
    previewReader.readAsDataURL(files[0]);
  }
}

function preview(e){
  $('#pic').attr('src', e.target.result);
}

function getEmotion (e) {
  $(".title").text("Let me see...");

  $.ajax({
    url : 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    type: 'POST',
    processData: false,
    contentType: "application/octet-stream",
    data: e.target.result,
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": "e0b5b29480894ae6b192b98380dd550e"
    },
    success: displayEmotion,
    error: function(jqXHR, textStatus, errorThrown)
    {
      debugger;
    }
  });
}

function displayEmotion(data){
  var scores = data[0].scores || {};

  var mostLikelyEmotion = "";
  var maxScore = 0;

  Object.keys(scores).forEach(function(emotion){
    if (scores[emotion] > maxScore){
      maxScore = scores[emotion];
      mostLikelyEmotion = emotion;
    }
  });

  $(".title").text("I sense " + mostLikelyEmotion);
}
