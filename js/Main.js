var todoArray = [
    {
        id:1,
        text:"Workouts",
        updated_ts:"Feb 28th 2022, 9:07:51 am",
        type:""
    },
    {
        id:2,
        text:"Maths Test",
        updated_ts:"Feb 28th 2022, 9:07:51 am",
        type:""
    }
]

$(document).ready(function(){
    listTodo();
 });

function listTodo(){
    $("#contain").html("");
    todoArray.forEach((element, index, array) => {
        $("#contain").append('<div class="row d-flex mt-3 w-100 pl-3 pr-3 no-gutters">'+
        '<div class="col-7">'+
        '<input type="text" id="uid'+element.id+'" class="appendinput form-control mb-0 '+element.type+'" value='+element.text+' oninput="editchange(\'' + element.id + '\')">'+
        '<small >'+element.updated_ts+'</small>'+
        '</div>'+
        '<div class="col-5 m-auto">'+
        '<button title="finish" id="fsh'+element.id+'" class=" ml-1 addBtn" onclick="finishTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-check"></i>'+
        '</button>'+
        '<button title="edit" id="edit'+element.id+'" class=" ml-1 editBtn" disabled onclick="editTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-edit"></i>'+
        '</button>'+
        '<button title="delete" id="del'+element.id+'" class=" ml-1   addBtn" onclick="deleteTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-delete"></i></button>'+
        '</div></div>')  
    });
    
}
function editchange(id){
        $("#edit"+id).prop("disabled", false);  
}
function addDisabled(){
        $("#addbutton").prop("disabled", false); 
}
function finishTodo(id,type){
    if(type != ""){
       
        $("#fsh"+id).html("<i class='zmdi zmdi-check'></i>");
        Object.assign(todoArray.find(b => b.id == id),{type: "",updated_ts:moment().format('MMM Do YYYY, h:mm:ss a')});
    }else{
        
        $("#fsh"+id).html("<i class='zmdi zmdi-close'></i>");
        Object.assign(todoArray.find(b => b.id == id),{type: "completed",updated_ts:moment().format('MMM Do YYYY, h:mm:ss a')});
    }
    
    listTodo();
}
function editTodo(id){
    $(".editBtn").prop("disabled", true);
    var contVal =  $("#uid"+id).val();
    Object.assign(todoArray.find(b => b.id == id),{text: contVal,updated_ts:moment().format('MMM Do YYYY, h:mm:ss a')});
    listTodo();
}
function deleteTodo(id){
    todoArray= todoArray.filter( obj => obj.id != id);
    listTodo();
}
function addTodo(){
    var contVal =  $("#todoContent").val();
    todoArray.push({
        id:Math.random()*100,
        text:contVal,
        updated_ts:moment().format('MMM Do YYYY, h:mm:ss a'),
        type:""
    });
    $("#todoContent").val("");
    $("#addbutton").prop("disabled", true);
    listTodo();
}