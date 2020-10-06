$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
});

$('#submission-modal').on('click', function (event) {
  event.preventDefault();
  $('#submit-recipe').modal('show');
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});

// POST request to submit cakes into the database
$('#cake-submit').on('click', function (event) {
  event.preventDefault();

  const newCake = {
    name: $('#cake-name').val().trim(),
    difficulty: $('#cake-difficulty').val().trim(),
    ingredients: $('#cake-ingredients').val().trim()
  };
  console.log(newCake);
  // Send the POST request to the database
  $.ajax('/api/cakes', {
    type: 'POST',
    // this is important, with withCredentials needs to be with comments onclick
    withCredentials: true,
    data: newCake
  }).then(
    function () {
      console.log('New cake added!');
      location.reload();
    }
  );
});

// DELETE
// Delete cake

$('#delete-cake').on('click', function (event) {
  event.preventDefault();
  const deleteCake = {
    name: $('#name').val().trim(),
    difficulty: $('#difficulty').val().trim(),
    ingredients: $('#ingredients').val().trim()
  };
  console.log(deleteCake);
  $.ajax({
    type: 'DELETE',
    // need id to reference
    url: '/api/Cakes',
    data: deleteCake
  }).then(
    function () {
      (console.log('Cake deleted'));
      location.reload();
    });
});

// Delete comment
$('#delete-comment').on('click', function (event) {
  event.preventDefault();
  const deleteComment = {
    title: $('#title').val().trim(),
    body: $('#body').val().trim(),
    likes: $('#likes').val().trim()
  };
  console.log(deleteComment);
  $.ajax({
    type: 'DELETE',
    // need id to reference
    url: '/api/Cakes',
    data: deleteComment
  }).then(
    function () {
      (console.log('Comment deleted'));
      location.reload();
    });
});

$('.cake-preview').click(function (event) {
  window.location.href = '/cake-page';
});
