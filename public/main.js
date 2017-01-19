console.log('hello from main.js');

// focus on input field on page load
var $input = $('input');
$input.focus();

// VARIABLES
var $ul = $('.todos');
var $btn = $('.add');
var $input = $('input');
var $span = $('.update');


// $span.bind('keypress', function(evt) {
//     // $btn.trigger('keypress');
//     // addToDo();
//   };
// });

$(document).bind('keypress', function(evt) {
  if (evt.which === 13) {
    $btn.trigger('keypress');
    addToDo();
  };
});

// ADD TO-DOS
function addToDo(evt) {
  // store input value into todo variable
  var todo = $input.val();
  // if input value is NOT empty
  if (todo !== "") {
    // post request to /posts
    $.post('/posts', { todo: todo }, function(res) {
      // console.log(evt);
      // console.log(evt.target);
      // console.log(todo);
      $input.focus();
      getPosts();
    });
  $input.val('');
  };
};

// binds/delegates keypress to nested <span>
$('.todo-list').delegate('span', 'keypress', function(evt){
  if (evt.which === 13 ) {
    // prevents jumping to new line
    evt.preventDefault();
    var $txt = $(this).text();
    console.log($txt);
    var oid = $(this).attr('oid');
    console.log($(this).attr('oid'));
    // alert('enter key pressed on span');
    $.post('/update', { todo: $txt, oid: oid }, function(res) {
      getPosts();
    });
  };
});

// UPDATE TO-DOS
// $span.keydown(function(evt) {
//   if (evt.which === 13) {
//     alert('enter key pressed!');
//   };
// });

// AJAX GET request to /posts and responds w/ data
function getPosts() {
  $.get('/posts', function(res){
    // console.log("res=", res);
    renderList(res);
  });
};
getPosts();

function renderList(list) {
  var htmlTemp = $('#todo-template').html();
  // console.log(htmlTemp);
  var template = Handlebars.compile(htmlTemp); // returns a function
  var html = template(list);
  // console.log(html);
  $('.todo-list').html(html);
};

















