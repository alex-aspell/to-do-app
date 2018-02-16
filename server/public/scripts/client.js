console.log('heyyyyy');

$(document).ready(function(){
    console.log('JQ');
    getToDoList();
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
        let showItem = `<div> ${item.thing_todo} ${item.date} <button class="completeButton" data-id="${item.id}">Complete</button> 
        <button class="deleteButton" data-id="${item.id}">Delete</button></div>`;
        $('#fullList').append(showItem);
    }
}