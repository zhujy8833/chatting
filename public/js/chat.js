//chat.js

var Chat = {};

Chat.init = function(){
	var that = this;
	var socket = io.connect('http://localhost:4444');

    $(".enter").on('click', function(){
    	$(".message.field").show();
    	socket.emit('set nickname', $("input.nickname").val());
    });
    
    $(".send_message").on('click', function(){
		socket.emit("send message", {msg: $('.message.field').find('.msg').val().trim()});
	});

	socket.on('ready', function (obj) {
      console.log(obj.nickname + 'Connected ! ');
      $(".enter_result").append(["<p>",obj.nickname, " just entered the room.</p>"].join(""));
    });

    socket.on('sent out', function(data){
      $(".enter_result").append(["<p>" + data.msg + "</p>"].join(""));
	});
};

// Chat.enterRoom = function() {
// 	var name, socket;

// 	name = $("input.nickname").val();
// 	if (io === undefined){
// 		alert("No Socket IO installed!");
// 	} else if(!name.trim()){
// 		alert("Fill in your nickname");
// 	} else {
// 		socket = io.connect('http://localhost:4444');
// 		$(".message.field").show();
// 		$(".send_message").on('click', function(){
// 			socket.emit("send message", {msg: $('.message.field').find('.msg').val().trim()});
// 		});

// 		socket.emit('set nickname', name);
// 		socket.on('sent out', function(data){
// 	      $(".enter_result").append(["<p>" + data.msg + "</p>"].join(""));
// 		});

// 	    socket.on('ready', function (obj) {
// 	      console.log(obj.nickname + 'Connected ! ');
// 	      $(".enter_result").append(["<p>",obj.nickname, " just entered the room.</p>"].join(""));
// 	    });
// 	}


// };
Chat.render = function(){

};

Chat.init();