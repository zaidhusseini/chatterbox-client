// YOUR CODE HERE:

var app = {};

app.init = function init() {
  // body...

  $('.username').on('click', ()=>{
    app.handleUsernameClick();
  });

  $('.submit').on('submit', app.handleSubmit);
  

};

app.send = function send(message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function fetch(message) {
  // body...
  $.ajax({
    url: undefined,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function(data){
      console.log('chatterbox: Message received');
    },
    error: function(data){
      console.error('chatterbox: Failed to receive message', data);
    }

  });
};

app.clearMessages = function clearMessages() {
  $('#chats').remove();
};


app.renderMessage = function renderMessage(message) {
  //1) Create node
  var $chats = $('<div></div>').attr('id','chats');
  // var $user = $('<div></div>').attr('class','username');
  var $message = $('<div></div>');
  $message.addClass('username');
  //2) Add user name from message object to node
  //3) Add the text of message from object to node
  $message.text(message.username + ': ' + message.text);
  //4) Append that node to #chats node
  $('#main').append($chats);
  $chats.append($message);

};

app.renderRoom = function renderRoom(roomName) {
  var $room = $('<div></div>').attr('id', roomName);
  
  if ($('#roomSelect').children().length === 0) {
    var $Div = $('<div></div>').attr('id','rooms');
    var $roomSelector = $('<select></select>').attr('id','roomSelect');
    var $option = $(`<option value=${roomName}>${roomName}</option>`);
    $('body').append($Div);
    $('#roomSelect').append($roomSelector);
    $roomSelector.append($option);
  } else {
    var $option = $(`<option value=${roomName}> ${roomName} </option>`);
    $('#roomSelect').append($option);
  }

};

app.handleUsernameClick = function(){

};

app.handleSubmit = function(){

};

