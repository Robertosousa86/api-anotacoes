function save() {
  const title = $('#title').val();
  const description = $('#description').val();

  $.ajax({
    type: 'post',
    url: '/notes',
    data: JSON.stringify({ title: title, description: description }),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      alert(data.message);
      $('#title').val('');
      $('#description').val('');
    },

    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}
