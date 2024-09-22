// Generate id task and show modal
$('#new-task').on('click', function () {
    $.ajax({
        url: '/Task/GetNewTaskId',
        type: 'GET',
        success: function (newId) {
            $('#task-id').val(newId);
            $('#new-task-modal').modal('show');
        },
        error: function () {
            alert('Erro ao gerar novo ID');
        }
    });
});

// Add a new task
$('#add-new-task').off('click').on('click', function () {
    $('.text-danger').hide();

    let newTask = {
        Id: $('#task-id').val(),
        Title: $('#task-title').val(),
        Description: $('#task-desc').val(),
        Status: $('#task-status').val(),
        DueDate: $('#task-date').val()
    };

    $.ajax({
        url: '/Task/Create',
        type: 'POST',
        data: newTask,
        success: function (data) {
            if (data.success) {
                location.reload();
                $('#new-task-modal').modal('hide');
            } else {
                data.errors.forEach(function (error) {
                    if (error.includes("título")) {
                        $('#title-error-create').text(error).show();
                    } else if (error.includes("descrição")) {
                        $('#desc-error-create').text(error).show();
                    } else if (error.includes("status")) {
                        $('#status-error-create').text(error).show();
                    } else if (error.includes("data")) {
                        $('#date-error-create').text(error).show();
                    }
                });
            }
        },
        error: function () {
            alert('Erro ao criar a nova tarefa, tente novamente mais tarde!');
        }
    });
});

// Close modal new-task
$('#close-new-task').on('click', function () {
    $('#new-task-modal').modal('hide');
});

// Edit task
$('.edit-btn').on('click', function () {
    let taskId = $(this).data('id');

    $.ajax({
        url: '/Task/GetTaskById',
        type: 'GET',
        data: { id: taskId },
        success: function (data) {
            $('#edit-task-id').val(data.id);
            $('#edit-task-title').val(data.title);
            $('#edit-task-desc').val(data.description);
            $('#edit-task-status').val(data.status);
            if (data.dueDate) {
                $('#edit-task-date').val(data.dueDate.split('T')[0]);
            } else {
                $('#edit-task-date').val('');
            }
            $('#edit-task-modal').modal('show');
        },
        error: function () {
            alert('Erro ao buscar a tarefa');
        }
    });
});

// Save edit task
$('#save-edit-task').off('click').on('click', function () {
    $('.text-danger').hide();

    let editedTask = {
        Id: $('#edit-task-id').val(),
        Title: $('#edit-task-title').val(),
        Description: $('#edit-task-desc').val(),
        Status: $('#edit-task-status').val(),
        DueDate: $('#edit-task-date').val()
    };

    $.ajax({
        url: '/Task/EditTask',
        type: 'POST',
        data: editedTask,
        success: function (data) {
            if (data.success) {
                location.reload();
                $('#edit-task-modal').modal('hide');
            } else {
                data.errors.forEach(function (error) {
                    if (error.includes("título")) {
                        $('#title-error-edit').text(error).show();
                    } else if (error.includes("descrição")) {
                        $('#desc-error-edit').text(error).show();
                    } else if (error.includes("data")) {
                        $('#date-error-edit').text(error).show();
                    }
                });
            }
        },
        error: function () {
            alert('Erro ao editar a tarefa, tente novamente mais tarde!');
        }
    });
});

// Close modal edit task
$('#close-edit-task').on('click', function () {
    $('#edit-task-modal').modal('hide');
    $('.text-danger').hide();
});

// Delete Task
$('.delete-btn').on('click', function () {
    let taskId = $(this).data('id');
    let deleteUrl = $(this).data('url'); 

    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        $.ajax({
            url: deleteUrl,
            type: 'POST',
            success: function (data) {
                if (data.success) {
                    location.reload();
                } else {
                    alert('Erro ao excluir a tarefa.');
                }
            },
            error: function () {
                alert('Erro ao tentar excluir a tarefa.');
            }
        });
    }
});

// on click 'Dashboard'
$('#dashboard-nav').on('click', function (e) {
    e.preventDefault();
    $('#dashboard-section').show();
    $('#all-details-section').hide();

    $('#dashboard-nav').addClass('active');
    $('#all-details-nav').removeClass('active');
});

// on click 'Todas as Tarefas'
$('#all-details-nav').on('click', function (e) {
    e.preventDefault();
    $('#all-details-section').show();
    $('#dashboard-section').hide();

    $('#all-details-nav').addClass('active');
    $('#dashboard-nav').removeClass('active');
});