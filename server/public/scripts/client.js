console.log('heyyyyy');

$(document).ready(function(){
    console.log('JQ');
    getToDoList();
    $('#inputForm').on('click', function(event){
        event.preventDefault();
    })
    $('#submitButton').on('click', addToDo)
    $('#fullList').on('click', '.deleteButton', function(){
        console.log('delete clicked');
        let deleteItem = $(this).data('id');
        deleteToDoItem(deleteItem); 
    })
    $('#fullList').on('click', '.completeButton', function(){
        console.log('complete clicked');
        let completeItem = $(this).data('id');
        completeToDoItem(completeItem); 
    })
})

function getToDoList(){
    console.log('get list sent');
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).done((response) => {
        console.log('Successfully retrieved ', response);
        showToDoList(response); 
    }).fail((response) => {
        console.log('You did not get the list');
    })
}

function showToDoList(listItems){
    $('#fullList').empty();
    for ( let item of listItems){
        if (item.completion == 'i'){
            let showItem = `<div> ${item.thing_todo} ${item.date} <button class="completeButton" data-id="${item.id}">Complete</button> 
            <button class="deleteButton" data-id="${item.id}">Delete</button></div>`;
            $('#fullList').append(showItem);
        }
        else {
            let showItem = `<div> ${item.thing_todo} ${item.date}  
            <button class="deleteButton" data-id="${item.id}">Delete</button></div>`;
            $('#fullList').append(showItem);
            $('#fullList').children().css("background-color", 'green'); 
            $('#fullList').children().css('color', 'white');
        }
    }
}

function addToDo(){
    console.log('clicked');
    $.ajax({
        type: 'POST',
        url: '/todo/add',
        data: {
            thing_todo: $('#thingToDoIn').val(),
            date: $('#dateIn').val(),
            completion: 'i'
        }
    }).done((response) => {
        console.log('item added');
        getToDoList();
    }).fail((response) => {
        console.log('item not added');
    })
}

function deleteToDoItem(id){
    $.ajax({
        type: 'DELETE',
        url: `/todo/delete/${id}`
    }).done((response) => {
        console.log('item deleted');
        getToDoList();
    }).fail((response) => {
        console.log('item not deleted');
    })
}

function completeToDoItem(id){
    $.ajax({

    })
}