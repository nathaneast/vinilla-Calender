var date = document.querySelector(".calender-Date");
var backMonth = document.querySelector(".backMonth");
var nextMonth = document.querySelector(".nextMonth");
var clickViewDay = document.querySelector(".clickResult-Day");
var clickViewDate = document.querySelector(".clickResult-Date");

var inputTodo = document.querySelector(".inputTodo");
var todoList = document.querySelector(".todo-List");
var doneList = document.querySelector(".done-List");
var completedBtn = document.querySelector(".completed-Btn");
var clearBtn = document.querySelector(".clear-Btn");
var todoListCount = document.querySelector(".todoList-count");

var nowDate = new Date();
//버튼 누름에 따라서 바뀌는 년도,월
var nowClick;
var todoKey;
var todoListStorage = {};


function TodoListForm() {
        this.todos = [],
        this.dones = []
}

//todo값 모두 done으로 이동
function TodoCompleted() {
    for(var i = 0; todoListStorage[todoKey].todos.length > i; i++) {
        todoListStorage[todoKey].dones.push(todoListStorage[todoKey].todos[i]);
    }
    todoListStorage[todoKey].todos.length = 0;
    viewTodoList();
}

//done값 모두 삭제
function clearDoneList() {
    todoListStorage[todoKey].dones.length = 0;
    viewTodoList();
}

function editTodo(e) {
    var todoEleAll = document.querySelectorAll(".todoName");
    var index;
    for (var i = 0; todoEleAll.length > i; i++) {
        todoEleAll[i].removeEventListener("dblclick", editTodo);
    }
    var li = e.target.parentNode;
    li.classList.add("editIndex");
    for (var i = 0; li.children.length > i; i++) {
        li.children[i].classList.add("hide");
    }
    var editInput = document.createElement("input");
    editInput.classList.add("editing");
    li.appendChild(editInput);
    editInput.focus();
    for (var i = 0; li.parentNode.children.length > i; i++) {
        if (li.parentNode.children[i].className === "todoElement editIndex") {
            index = i;
        }
    }
    if (li.parentNode.className === "todo-List") {
        editInput.value = todoListStorage[todoKey].todos[index];
    } else {
        editInput.value = todoListStorage[todoKey].dones[index];
    }
    li.removeEventListener("mouseover", todoMouseOver);
    li.removeEventListener("mouseleave", todoMouseLeave);
    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && editInput.value !== "") {
            if (li.parentNode.className === "todo-List") {
                todoListStorage[todoKey].todos[index] = editInput.value;
            } else {
                todoListStorage[todoKey].dones[index] = editInput.value;
            }
            // e.target.remove();
            e.target.blur();
            //이벤트 타겟이 포커스를 잃는다?
            // viewTodoList();
        }
    });
    editInput.addEventListener("blur", function (e) {
        viewTodoList();
    });
}

function moveTodo(e) {
    var li = e.target.parentNode;
    li.classList.add("moveIndex");
    var todos = todoListStorage[todoKey].todos;
    var dones = todoListStorage[todoKey].dones;

    if (li.parentNode.className === "todo-List") {
        moveHandler(todoList, dones, todos);
    } else {
        moveHandler(doneList, todos, dones);
    }

    function moveHandler(list, add, del) {
        for (var i = 0; list.children.length > i; i++) {
            if (list.children[i].className === "todoElement moveIndex") {
                add.push(del[i]);
                del.splice(i, 1);
            }
        }
    }
    viewTodoList();
}

function todoRemove(e) {
    var list = e.target.parentNode.parentNode;
    //버튼의.li.리스트 (투두,던)
    var li = e.target.parentNode;
    li.classList.add("RemoveIndex");
    for (var i = 0; list.children.length > i; i++) {
        if (list.className === "todo-List") {
            if (list.children[i].className === "todoElement RemoveIndex") {
                todoListStorage[todoKey].todos.splice(i, 1);
            }
        } else {
            if (list.children[i].className === "todoElement RemoveIndex") {
                todoListStorage[todoKey].dones.splice(i, 1);
            }
        }
    }
    viewTodoList();
}

function todoMouseOver(e) {
    for (var i = 0; e.target.children.length > i; i++) {
        if (e.target.children[i].className === "deleteBtn hide") {
            e.target.children[i].classList.remove("hide");
        }
        if (e.target.children[i].className === "todoName") {
            e.target.children[i].classList.add("todoFocus");
        }
    }
}

function todoMouseLeave(e) {
    for (var i = 0; e.target.children.length > i; i++) {
        if (e.target.children[i].className === "deleteBtn") {
            e.target.children[i].classList.add("hide");
        }
        if (e.target.children[i].className === "todoName todoFocus") {
            e.target.children[i].classList.remove("todoFocus");
        }
    }
}

function addTodoList() {
    if (todoListStorage[todoKey] === undefined) {
        //저장소에 투두키값 없으면
        var selectTodo = new TodoListForm();
        selectTodo.todos.push(inputTodo.value);
        todoListStorage[todoKey] = selectTodo;
    } else {
        //저장소에 투두키값 있으면
        var addTodo = todoListStorage[todoKey];
        addTodo.todos.push(inputTodo.value);
        todoListStorage[todoKey] = addTodo;
    }
    inputTodo.value = "";
    viewTodoList();
}

function viewTodoList() {
    //웹에 출력된 이전 todoList 제거
    if (todoList.children.length > 0) {
        resetList(todoList);
    }
    if (doneList.children.length > 0) {
        resetList(doneList);
    }

    //저장소에 선택 날짜 todoList 있으면 웹에 출력
    if (todoListStorage[todoKey] !== undefined) {
        addTodo(todoListStorage[todoKey].todos, todoList);
        addTodo(todoListStorage[todoKey].dones, doneList);

        if (todoListStorage[todoKey].todos.length > 0) {
            todoListCount.innerText = "todo count : " + todoListStorage[todoKey].todos.length;
        } else {
        todoListCount.innerText = "Add To do ^.^";
        }
    } else {
        clearBtn.classList.add("hide");
        completedBtn.classList.add("hide");
        todoListCount.innerText = "Add To do :)";
    }
    
    function addTodo(value, list) {
        //todo,done 리스트에 값이 1개 이상일때 버튼 생성 (클리어)
        viewMoveBtn(todoListStorage[todoKey].todos, completedBtn, TodoCompleted);
        viewMoveBtn(todoListStorage[todoKey].dones, clearBtn, clearDoneList);

        if (value.length > 0) {
            for (var i = 0; value.length > i; i++) {
                var li = document.createElement("li");
                li.classList.add("todoElement");
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                var span = document.createElement("span");
                span.innerText = value[i];
                span.classList.add("todoName");
                var btn = document.createElement("button");
                btn.innerText = "X";
                btn.classList.add("deleteBtn");
                btn.classList.add("hide");
                list.appendChild(li);
                li.appendChild(checkBox);
                li.appendChild(span);
                li.appendChild(btn);
                li.addEventListener("mouseover", todoMouseOver);
                li.addEventListener("mouseleave", todoMouseLeave);
                span.addEventListener("dblclick", editTodo);
                btn.addEventListener("click", todoRemove);
                checkBox.addEventListener("click", moveTodo);
                if (list === doneList) {
                    checkBox.setAttribute("checked", "checked");
                }
            }
            
        }
    }

    function resetList(list) {
        while (list.children.length > 0) {
            list.children[0].remove();
        }
    }

    function viewMoveBtn(list,btn,fn){
        if (list.length > 0) {
            btn.classList.remove("hide");
            btn.addEventListener("click", fn);
        } else {
            btn.classList.add("hide");
        }
    }

}

function todoListHandler(todoDate) {
    var month = todoDate.getMonth() + 1;
    var monthValue = `${month < 10 ? "0" + month : month}`;
    var dateValue = `${todoDate.getDate() < 10 ? "0" + todoDate.getDate() : todoDate.getDate()}`;
    todoKey = `todo${todoDate.getFullYear()}${monthValue}${dateValue}`; 
    viewTodoList();
}

function removeCalender() {
    if (nowClick !== undefined) {
        nowClick.classList.remove("clickEffect");
        nowClick = undefined;
    }
    var allDate = date.children[0].children.length;
    for (var i = 1; i < allDate; i++) {
        for (var j = 0; j < 7; j++) {
            var removeDate = date.children[0].children[i].children[j];
            removeDate.innerText = "";
            if (removeDate.className !== "") {
                removeDate.classList.remove("clickDateSet");
                removeDate.classList.remove(removeDate.classList[0]);
            }
            removeDate.removeEventListener("click", clickDate);
        }
    }
}

function calenderHandler(event) {
    var temDate;
    if (event.target.className === "nextMonth") {
        temDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1);
    } else {
        temDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1);
    }
    nowDate = temDate;
    removeCalender();
    viewCalender();
}

function clickDate(event) {
    //이전 날짜 투두리스트 제거
    while (todoList.children.length > 0 ) { 
        todoList.firstChild.remove();
    }
    while (doneList.children.length > 0 ) { 
        doneList.firstChild.remove();
    }
 
    if (nowClick === undefined) {
        event.target.classList.add("clickEffect");
        nowClick = event.target;
    } else if (nowClick === event.target) {
        event.target.classList.remove("clickEffect");
        nowClick = undefined;
    } else {
        nowClick.classList.remove("clickEffect");
        event.target.classList.add("clickEffect");
        nowClick = event.target;
    }
    var clickDateValue = event.target.classList[1];
    var clickDateResult = new Date(nowDate.getFullYear(), nowDate.getMonth(), clickDateValue);
    clickView(clickDateResult);
    todoListHandler(clickDateResult);
}

function clickView(dateValue) {
    var options = {
        weekday: "long"
    };
    clickViewDay.innerText = new Intl.DateTimeFormat('en-US', options).format(dateValue);
    clickViewDate.innerText = dateValue.getDate();

    if (clickViewDate.classList.length > 1 && clickViewDay.classList.length > 1) {
        clickViewDate.classList.remove(clickViewDate.classList[1]);
        clickViewDay.classList.remove(clickViewDay.classList[1]);
    }

    if (dateValue.getDay() === 6) {
        clickViewDate.classList.add("changeColorBlue");
        clickViewDay.classList.add("changeColorBlue");
    } else if (dateValue.getDay() === 0) {
        clickViewDate.classList.add("changeColorRed");
        clickViewDay.classList.add("changeColorRed");
    } else {
        clickViewDate.classList.add("changeColorBlack");
        clickViewDay.classList.add("changeColorBlack");
    }
}

function viewCalender() {
    var inputWeek = 1;
    var inputDay;
    var firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay();
    var lastDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();

    var nowMonthYear = document.querySelector(".month-year");
    var options = {
        month: "long"
    };
    nowMonthYear.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate) + " " + nowDate.getFullYear();

    for (var i = 1; i <= lastDate; i++) {
        if (i === 1) {
            //해당 월 1일의 요일에 들어가는 값
            var firstDate = date.children[0].children[inputWeek].children[firstDay];
            firstDate.innerText = i;
            firstDate.addEventListener("click", clickDate);
            firstDate.classList.add("clickDateSet");
            firstDate.classList.add(i);
            inputDay = firstDay;
            inputDay++;
        } else {
            if (inputDay < 7) {
                //월~금요일에 들어가는 값
                var dayOther = date.children[0].children[inputWeek].children[inputDay];
                dayOther.innerText = i;
                dayOther.addEventListener("click", clickDate);
                dayOther.classList.add("clickDateSet");
                dayOther.classList.add(i);
                inputDay++;
            } else {
                //일요일에 들어가는 값
                inputWeek++;
                inputDay = 0;
                var daySun = date.children[0].children[inputWeek].children[inputDay];
                //변수 따로 지정 이유 : 주가 바뀌어서
                daySun.innerText = i;
                daySun.addEventListener("click", clickDate);
                daySun.classList.add("clickDateSet");
                daySun.classList.add(i);
                inputDay++;
            }
        }
    }
}

function init() {
    viewCalender();
    clickView(nowDate);
    todoListHandler(nowDate);
    nextMonth.addEventListener("click", calenderHandler);
    backMonth.addEventListener("click", calenderHandler);
    inputTodo.addEventListener("keydown", function(e) {
        if(e.key === "Enter" && inputTodo.value !== "") {
            addTodoList();
        }
    });
}
init();
