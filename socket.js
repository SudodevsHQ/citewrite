

class Socket {

  constructor() {
    console.log("sssssssssssssssssss");
    if ("WebSocket" in window) {
      this.ws = new WebSocket("ws://127.0.0.1:5876/socket/nlp");
      this.ws.onopen = function () {
        console.log("Connection is opened");
      }
      this.ws.onclose = function () {
        console.log("Connection is closed");
      }
      this.ws.onmessage = function (msg) {
        document.getElementById("resources").innerHTML = msg.data;
      }
    } else {
      console.log('Your browser doenst support WebSocket!')
    }
  }

  add(data) {
    if ($(".card").length > 0) {
      // $("#card-area").empty()
      $(".card").each(function () {

        if (!$(this).hasClass("pinned")) {
          $(this).remove()
        }
        if ($(this).hasClass("preloader")) {
          $(this).remove()
        }
      })
    }

    for (var j in data) {
      for (var i in data[j]) {
        let teaserText = data[j][i]['summary'].substr(0, data[j][i]['summary'].indexOf('.'));
        let elem = '<div class="card px-5 mx-5 my-3">' +
          '<button type="button" id="pin-button">Pin</button><button type="button" id="remove">Remove</button><img src="' + data[j][i]["image"] + '" class="card-img-top" alt="...">' +
          '<div class="card-body">' +
          `<h5 class="card-title">${data[j][i]['title']}</h5>` +
          `<p class="card-text"><span class="teaser">${teaserText}</span> <span class="complete d-none"> ${data[j][i]['summary']}</span> <span class="more">more...</span></p>` +
          `<a href="${data[j][i]['url']}" class="btn btn-primary">Go somewhere</a>` +
          '</div>' +
          '</div>';
        $("#card-area").append(elem);
      }
    }


  }

  send(text) {
    let preloader = `<div class="card preloader"><svg class="psvg" version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
 <path fill="#1F2537" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#1F2537" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#1F2537" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg></div>`

    if ($(".card").length > 0) {
      // $("#card-area").empty()
      $(".card").each(function () {

        if (!$(this).hasClass("pinned")) {
          $(this).remove()
        }
      })
    }
    $("#card-area").append(preloader)


    this.ws.onmessage = (event) => {
      console.log("event = " + event);
      this.add(JSON.parse(event.data));
    }
    this.ws.send(text);

  }

}

module.exports = Socket