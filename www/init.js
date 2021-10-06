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
      list();
    },

    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function list() {
  $('.list').html('');
  $.ajax({
    type: 'get',
    url: '/notes',
    data: JSON.stringify({ title: title, description: description }),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      for (const note of data) {
        $('.list').append(`
    <div class="item">
       <h2>${note.title}</h2>
       <p>${note.description}</p>

       <button onClick="">Editar</button>
       <button onClick="del('${note.id}')">Excluir</button>
    </div>
        `);
      }
    },

    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function del(id) {
  const answer = window.confirm('Deseja deletar essa anotação?');
  if (answer) {
    $.ajax({
      type: 'delete',
      url: '/notes',
      data: JSON.stringify({ id: id }),
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        alert(data.message);
        list();
      },

      error: function (res) {
        alert(res.responseJSON.message);
      },
    });
  }
}

list();
