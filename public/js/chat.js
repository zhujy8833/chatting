//chat.js

var Chat = {};

Chat.init = function(){
	var that = this;
	var socket = io.connect('http://localhost:4444');
    that.socket = socket;
};

Chat.index = function() {
	var that = this;
	var socket = that.socket;
	$('.enter').on('click', function(){
		socket.emit('set nickname', $("input.nickname").val().trim());
		window.location.href = '/room';
	});
};

Chat.room = function() {
	var that = this;
	var socket = that.socket;

	socket.on('ready', function (obj) {
      console.log(obj.nickname + 'Connected ! ');
      $(".user_enter_result").append(["<p>",obj.nickname, " just entered the room.</p>"].join(""));
    });

    socket.on('sent out', function(data){
      $(".msg_board").append("<p><span class='user'>"+data.user+"</span> said: <span class='msg_content'>" + data.msg + "</span></p>");
	});

	$(".send_message").on('click', function(){
		socket.emit("send message", {msg: $('.message.field').find('.msg').val().trim()});
	});

};



//Chat.init();