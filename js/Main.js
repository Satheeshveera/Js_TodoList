var todoArray = JSON.parse(localStorage.getItem("todoArray"));
//declare variables we'll need
const alarmButton = document.querySelector(".btn-alarm");
const snoozeButton = document.querySelector(".btn-snooze");
const stopButton = document.querySelector(".btn-stopalarm");
const time = document.querySelector(".alarm-time");
const options = document.querySelector(".options");
const alarmSound = new Audio();

/* 
* I cannot guarantee this url
* will not change and break 
* the sound functionality. 
*/

alarmSound.src = "http://soundbible.com/mp3/Rooster-SoundBible.com-1114473528.mp3";
let alarmTimer;

// initially hides snooze and stop alarm options until they're useful
options.style.display = "none";
$(document).ready(function () {

 if(todoArray.length>0){
  listTodo(todoArray);
 }else{
  $("#contain").html(`<div class="card openCard">
  <div class="card-body">
      Let's Start the TODO...
  </div>
</div>`)
 }

});

function listTodo(obj) {
  
  $("#contain").html("");

  obj.forEach((element, index, array) => {
    $("#contain").append('<div class="row d-flex mt-3 w-100 pl-3 pr-3 no-gutters">' +
      '<div class="col-7">' +
      '<input type="text" id="uid' + element.id + '" class="appendinput form-control mb-0 ' + element.type + '" value=' + (element.text).replace(" ", "_") + ' oninput="editchange(\'' + element.id + '\')">' +
      '<small >' + element.updated_ts + '</small>' +
      '</div>' +
      '<div class="col-5 m-auto">' +
      '<button title="Finish" data-toggle="tooltip" id="fsh' + element.id + '" class=" ml-1 addBtn" onclick="finishTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-check"></i>' +
      '</button>' +
      '<button title="Edit" data-toggle="tooltip" id="edit' + element.id + '" class=" ml-1 editBtn" disabled onclick="editTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-edit"></i>' +
      '</button>' +
      '<button title="Delete" data-toggle="tooltip" id="del' + element.id + '" class=" ml-1   addBtn" onclick="deleteTodo(\'' + element.id + '\',\'' + element.type + '\')"><i class="zmdi zmdi-delete"></i></button>' +
      '</div></div>')
  });
  if (obj.length == 0) {
    $("#contain").html(`<div class="card openCard">
      <div class="card-body">
          Let's Start the TODO...
      </div>
    </div>`)
  }
}

function filterChange(val) {
  if (val.value === "completed") {
    var filterItem = todoArray.filter(function (item) {
      return item.type == val.value;
    });
    listTodo(filterItem);
  } else if (val.value === "uncompleted") {
    var filterItem = todoArray.filter(function (item) {
      return item.type == "";
    });
    listTodo(filterItem);
  } else {
    listTodo(todoArray);
  }
}

function editchange(id) {
  $("#edit" + id).prop("disabled", false);
}

function addDisabled(val) {
  $("#addbutton").prop("disabled", false);
}

function finishTodo(id, type) {
  var ids = ("#fsh" + id).toString();

  if (type != "") {
    $(ids).html("<i class='zmdi zmdi-close'></i>");
    Object.assign(todoArray.find(b => b.id == id), { type: "" });
  } else {
    $(ids).html("<i class='zmdi zmdi-close'></i>");
    Object.assign(todoArray.find(b => b.id == id), { type: "completed", updated_ts: moment().format('MMM Do YYYY, h:mm:ss a') });
  }
  localStorage.clear();
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
  listTodo(todoArray);
}

function editTodo(id) {
  $(".editBtn").prop("disabled", true);
  var contVal = $("#uid" + id).val();
  Object.assign(todoArray.find(b => b.id == id), { text: contVal, updated_ts: moment().format('MMM Do YYYY, h:mm:ss a') });
  localStorage.clear();
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
  listTodo(todoArray);
}

function deleteTodo(id) {
  todoArray = todoArray.filter(obj => obj.id != id);
  localStorage.clear();
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
  listTodo(todoArray);
}

function addTodo() {
  var contVal = $("#todoContent").val();

  if (contVal.replace(/^\s+|\s+$/g, "").length != 0) {
    todoArray.push({
      id: (Math.random() * 10000).toFixed(0),
      text: contVal,
      updated_ts: moment().format('MMM Do YYYY, h:mm:ss a'),
      type: ""
    });
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    $("#todoContent").val("");
    $("#addbutton").prop("disabled", true);
    listTodo(todoArray);
  } else {
    alert("Todo can't be Empty")
  }
  
}


// alarm 
function setAlarm() {
  let ms =
    new Date().setHours(0, 0, 0, 0) +
    time.valueAsNumber;
  if (isNaN(ms)) {
    alert("Please Set the Time Duration");
    return;
  }
  let alarm = new Date(ms);
  var dt = new Date().getTime();
  let differenceInMs = alarm.getTime() - dt;

  if (differenceInMs < 0) {
    alert(
      "It looks like that's a date from the past! Are you a time traveler?!"
    );
    return;
  }
  alarmTimer = setTimeout(initAlarm, differenceInMs);

  $(".btn-alarm").html('<i class="zmdi zmdi-alarm-plus">');
  alarmButton.setAttribute("title", "Cancel Alarm");
  alarmButton.setAttribute("onclick", "cancelAlarm(this);");
  options.style.display = "";
}

function cancelAlarm() {
  clearTimeout(alarmTimer);
  $(".btn-alarm").html('<i class="zmdi zmdi-alarm-check">');
  alarmButton.setAttribute("title", "Set Alarm");
  alarmButton.setAttribute("onclick", "setAlarm(this);");
  options.style.display = "none";
}

function initAlarm() {
  alarmSound.play();
  alarmSound.loop = true;
  options.style.display = "";
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  options.style.display = "none";
}

function snooze() {
  stopAlarm();
  setTimeout(initAlarm, 5000);
}

alarmButton.addEventListener("click", setAlarm, false);
snoozeButton.addEventListener("click", snooze, false);
stopButton.addEventListener("click", stopAlarm, false);
