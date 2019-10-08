var body = document.querySelector("body");
var date = document.querySelector(".calender-Date");
var backMonth = document.querySelector(".backMonth");
var nextMonth = document.querySelector(".nextMonth");
var clickViewDay = document.querySelector(".clickResult-Day");
var clickViewDate = document.querySelector(".clickResult-Date");

var inputTodo = document.querySelector(".inputTodo");
var todoList = document.querySelector(".todo-List");
var doneList = document.querySelector(".done-List");

var nowDate = new Date();
//버튼 누름에 따라서 바뀌는 년도,월
var nowClick;
var todoKey;

var todoListStorage = {};

function TodoListForm() {
        this.todos = [],
        this.dones = []
}


function editTodo(e) {
    var index;
    var li = e.target.parentNode;
    for (var i = 0; li.children.length > i; i++) {
        li.children[i].classList.add("hide");
    }
    var input = document.createElement("input");
    li.appendChild(input);
    li.classList.add("index");
    for (var i = 0; li.parentNode.children.length > i; i++) {
        if (li.parentNode.children[i].className === "index") {
            index = i;
        }
    }
    input.addEventListener("focusout", function() {
        li.removeChild(input);
        for (var i = 0; li.children.length > i; i++) {
            if( li.children[i].className = "hide") {
                li.children[i].classList.remove("hide");
            }
        }
        body.removeEventListener("click", arguments.callee);
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && input.value !== "") {
            if (li.parentNode.className === "todo-List") {
                todoListStorage[todoKey].todos[index] = input.value;
            } else {
                todoListStorage[todoKey].dones[index] = input.value;
            }
            viewTodoList();
        }
    });

}

function moveTodo(e) {
    var chBox = e.target;
    var removeLi = e.target.parentNode;
    removeLi.classList.add("index");
    var todos = todoListStorage[todoKey].todos;
    var dones = todoListStorage[todoKey].dones;

    if(removeLi.parentNode.className === "todo-List") {
        moveHandler(todoList,dones,todos);
    } else {
        moveHandler(doneList,todos,dones);
    }

    function moveHandler(list,add,del) {
        for (var i = 0; list.children.length > i; i++) {
            if (list.children[i].className === "index") {
                add.push(del[i]);
                del.splice(i, 1);
            }
        }
    }
    viewTodoList();
}

function todoRemove(e) {
    var list = e.target.parentNode.parentNode;
    //todoList ,doneList중에서 어떤 값인지 최상위 태그를 변수에 담음
    var removeLi = e.target.parentNode;
    removeLi.classList.add("index");
    for (var i = 0; list.children.length > i; i++) {
        if (list.className === "todo-List") {
            if (list.children[i].className === "index") {
                todoListStorage[todoKey].todos.splice(i, 1);
            }
        } else {
            if (list.children[i].className === "index") {
                todoListStorage[todoKey].dones.splice(i, 1);
            }
        }
    }
    viewTodoList();
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
    }

    function addTodo(value, list) {
        if (value.length > 0) {
            for (var i = 0; value.length > i; i++) {
                var li = document.createElement("li");
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                // checkBox.setAttribute("checked");
                var span = document.createElement("span");
                span.innerText = value[i];
                var btn = document.createElement("button");
                btn.innerText = "X";
                list.appendChild(li);
                li.appendChild(checkBox);
                li.appendChild(span);
                li.appendChild(btn);
                span.addEventListener("dblclick", editTodo);
                btn.addEventListener("click", todoRemove);
                checkBox.addEventListener("click", moveTodo);

                if (list === doneList) {
                    checkBox.setAttribute("checked", "checked");
                }
            }
        }
    }

    function resetList(listKey) {
        while (listKey.children.length > 0) {
            listKey.removeChild(listKey.firstChild);
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
            removeDate.classList.remove(removeDate.classList[0]);
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
    var clickDateValue = event.target.classList[0];
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
            firstDate.classList.add(i);
            inputDay = firstDay;
            inputDay++;
        } else {
            if (inputDay < 7) {
                //월~금요일에 들어가는 값
                var dayOther = date.children[0].children[inputWeek].children[inputDay];
                dayOther.innerText = i;
                dayOther.addEventListener("click", clickDate);
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
    inputTodo.addEventListener("keydown", function (event) {
        if(event.key === "Enter" && inputTodo.value !== "") {
            addTodoList();
        }
    });
}
init();
