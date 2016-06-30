function openFileDialog (){
  $("#upload").trigger('click');
}

function readURL(files) {
    if (files[0]) {
        var reader = new FileReader();
        reader.onload = onImageLoad;
        reader.readAsDataURL(files[0]);
    }
}

function onImageLoad (e) {
    $('#pic').attr('src', e.target.result);

    // var data = new FormData();
    // $.each(files, function(key, value)
    // {
    //     data.append(key, value);
    // });

    $.ajax({
      url : 'https://api.projectoxford.ai/emotion/v1.0/recognize',
      type: 'POST',
      dataType : "json",
      data: {}, // {"images": e.target.result},
      headers: {
        "Ocp-Apim-Subscription-Key": "e0b5b29480894ae6b192b98380dd550e",
        //"Content-Type": "application/octet-stream"
      },
      success: function(data, textStatus, jqXHR)
          {debugger;
              if(typeof data.error === 'undefined')
              {
                  // Success so call function to process the form
                  submitForm(event, data);
              }
              else
              {
                  // Handle errors here
                  console.log('ERRORS: ' + data.error);
              }
          },
          error: function(jqXHR, textStatus, errorThrown)
          {
            debugger;
              // Handle errors here
              console.log('ERRORS: ' + textStatus);
              // STOP LOADING SPINNER
          }
    });
}
