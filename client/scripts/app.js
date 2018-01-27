// YOUR CODE HERE:


var app = {};
var roomsList = [];
var friendsList = [];
var currentRoom;
var fetchedMessages;
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function init() {
  // body...
  

  app.clearMessages();
  //app.renderRoom('lobby');
  setInterval(function(){
    app.fetch();
  },1000);
  //app.fetch();
  $('.username').on('click', ()=>{
    app.handleUsernameClick();
  });

  $('.submit').on('click',function(){

    app.handleSubmit();

  });

  $('#roomSelect').on('change', function () {
    var optionSelected = $('option:selected', this);
    if(this.value === 'newroom'){
      var newRoom = prompt('Name your new room:');
      app.renderRoom(newRoom);
     
    } else {
      currentRoom = this.value;
    }
  });

 

};

app.send = function send(message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
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

app.fetch = function fetch() {
  // body...
  $.ajax({
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function(data){
      fetchedMessages = data;
      app.clearMessages();
      app.displayMessages();

     $('.username').on('click',function(){
        console.log($(this).attr('id'),' added to Class');
        friendsList.push($(this).attr('id'));
     });
      console.log(fetchedMessages, 'chatterbox: Message received');
    },
    error: function(data){
      console.error('chatterbox: Failed to receive message', data);
    }

  });
};

app.clearMessages = function clearMessages() {
  $('#chats').remove();
  var $chats = $('<div></div>').attr('id','chats');
  $('#main').append($chats);
};


app.renderMessage = function renderMessage(message, friend) {
  var $message = $('<div></div>').attr('id','message');
  var $user = $('<div></div>').attr('id',message.username);
  var $text = $('<div></div>').attr('id','text');
  $user.addClass('username');
  $message.addClass('message');
  if (friend){
    $message.addClass('friend');
  }
  $user.text(message.username + ': ');
  $text.text(message.text);

  $message.append($user);
  $message.append($text);
  //$message.text(message.username + ': ' + message.text);

  
  $('#chats').append($message);

};

app.renderRoom = function renderRoom(roomName) {

  var $option = $(`<option value=${roomName}> ${roomName} </option>`);
  $('#roomSelect').append($option);
  $('#roomSelect').val(roomName);


  currentRoom = roomName;

};

app.handleUsernameClick = function(){

};

app.handleSubmit = function(){
  //do stuff

  var textValue = $('#message').val();
  var name = window.location.search.substr(10);
  var message = {username:name,text:textValue,roomname:currentRoom};
  app.send(JSON.stringify(message));
};

app.displayMessages = function () {
  fetchedMessagesList = fetchedMessages.results;
  var message = {};  
  var friend = false;
  for(var i = 0; i < fetchedMessagesList.length; i++) {
    message = fetchedMessagesList[i];
    if (friendsList.indexOf(message.username) !== -1) {
      friend = true;
    } else{
      friend = false;
    }
    message.text = message.text === undefined ? " " : message.text;
    if (message.text.length<100 && message.roomname === currentRoom){
      app.renderMessage(message, friend);
    }
  }
};


$(document).ready(app.init);

//to do
//1) Add Rooms - DONE
//2) Select a room - DONE
//3) Add friends
//4) Post a message -- DONE

