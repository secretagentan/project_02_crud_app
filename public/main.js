console.log('hello from main.js');

// focus on input field on page load
var $input = $('input');
$input.focus();

// VARIABLES
var $ul = $('.todos');
var $btn = $('.add');
var $input = $('input');
var $span = $('span');

// binds keypress to add button
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
  };
};

// UPDATE TO-DOS
$span.keypress(function(evt) {
  if (evt.which === 13) {
    alert('enter key pressed!');
  };
});

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

















