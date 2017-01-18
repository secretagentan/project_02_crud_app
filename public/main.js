console.log('hello from main.js');

var $input = $('input');
$input.focus();

var $ul = $('.todos');
var $btn = $('.add');
var $input = $('input');

$btn.click(function(evt) {
  var todo = $input.val();
  if (todo !== "") {
    $.post('/posts', { todo: todo}, function(res){
      console.log(evt);
      console.log(evt.target);
      console.log(todo);
      $input.focus();
      // txt = "";
    })
  }
})
