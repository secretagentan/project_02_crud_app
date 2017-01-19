console.log('hello from main.js');

// focus on input field on page load
var $input = $('input');
$input.focus();

// VARIABLES
var $ul = $('.todos');
var $btn = $('.add');
var $input = $('input');

// APPEND TO-DOS
// on button click
$btn.click(function(evt) {
  // store input value into todo variable
  var todo = $input.val();
  // if input value is NOT empty
  if (todo !== "") {
    // post request to /posts
    $.post('/posts', { todo: todo}, function(res){
      // console.log(evt);
      // console.log(evt.target);
      // console.log(todo);
      $input.focus();
      getPosts();
    })
  }
})

function getPosts() {
  console.log('getPosts is running');
  $.get('/posts', function(res){
    console.log("res=", res);
    renderList(res);
  });
};
getPosts();

function renderList(list) {
  var htmlTemp = $('#todo-template').html();
  console.log(htmlTemp);
  var template = Handlebars.compile(htmlTemp); // returns a function
  var html = template(list);
  // console.log(html);
  $('.todo-list').html(html);
};

















