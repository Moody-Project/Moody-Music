$(document).ready(function() {
  $('#myform').submit(function(event) {
    event.preventDefault();

    var search = $('#books').val();
    if (search == '') {
      alert('please enter something');
    } else {
      var url = '';
      var img = '';
      var title = '';
      var author = '';
      $.ajax(
        
        'https://www.googleapis.com/books/v1/volumes?q=search+terms' + search,
        function(response) {
          console.log(response);
        }
      );
    }
  });
  return false;
});
// AIzaSyD8qve3oh3rIrcjK3HBzcj-c4vo3WOWYWU
google key