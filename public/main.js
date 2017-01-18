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
      console.log(evt);
      console.log(evt.target);
      console.log(todo);
      // $ul.append('<li>' + todo + '</li>');
      $input.focus();
    })
  }
})
