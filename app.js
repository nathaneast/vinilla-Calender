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
//클릭 날짜 표시 변수
var todoKey;
var todoListStorage = {};

function TodoListForm() {
        this.todo = {},
        this.complete = false;
}

function TodoCompleted() {
    for(var i = 0; todoListStorage[todoKey].length > i; i++) {
        todoListStorage[todoKey][i].complete = true;
    }
    viewTodoList();
}

function clearDoneList() {
    for (var i = 0; todoListStorage[todoKey].length > i; i++) {
        console.log(i);
        if (todoListStorage[todoKey][i].complete === true) {
            todoListStorage[todoKey].splice(i ,1);
            clearDoneList();
        }
    }
    viewTodoList();
}

function editTodo(e) {
    var todoEleAll = document.querySelectorAll(".todoName");
    for (var i = 0; todoEleAll.length > i; i++) {
        todoEleAll[i].removeEventListener("dblclick", editTodo);
    }
    var li = e.target.parentNode;
    for (var i = 0; li.children.length > i; i++) {
        li.children[i].classList.add("hide");
    }
    var editInput = document.createElement("input");
    editInput.classList.add("editing");
    li.appendChild(editInput);
    editInput.focus();
    li.removeEventListener("mouseover", todoMouseOver);
    li.removeEventListener("mouseleave", todoMouseLeave);
    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && editInput.value !== "") {
            var storageIndex = li.classList[1];
            todoListStorage[todoKey][storageIndex].value = editInput.value;
            e.target.blur();
        }
    });
    editInput.addEventListener("blur", function (e) {
        viewTodoList();
    });
}

function moveTodo(e) {
    var li = e.target.parentNode;
    var StorageIndex = li.classList[1];
    todoListStorage[todoKey][StorageIndex].complete = !todoListStorage[todoKey][StorageIndex].complete;
    viewTodoList();
}

function todoRemove(e) {
    var li = e.target.parentNode;
    var StorageIndex = li.classList[1];
    todoListStorage[todoKey].splice(StorageIndex , 1);
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
        var arr = [];
        var newTodoForm = new TodoListForm();
        newTodoForm.value = inputTodo.value;
        newTodoForm.complete = false;
        arr.push(newTodoForm);
        todoListStorage[todoKey] = arr;
    } else {
        //저장소에 투두키값 있으면
        var todoKeyValue = todoListStorage[todoKey];
        var addTodoForm = new TodoListForm();
        addTodoForm.value = inputTodo.value;
        addTodoForm.complete = false;
        todoKeyValue.push(addTodoForm);
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
        addTodo();
        if (todoListStorage[todoKey].length > 0) {
            todoListCount.innerText = "todo count : " + todoListStorage[todoKey].length;
        } else {
        todoListCount.innerText = "Add To do ^.^";
        }
    } else {
        clearBtn.classList.add("hide");
        completedBtn.classList.add("hide");
        todoListCount.innerText = "Add To do :)";
    }
    
    function addTodo() {
        //todo,done 리스트에 값이 1개 이상일때 버튼 생성 (클리어)
        viewClearBtn(todoListStorage[todoKey], completedBtn, TodoCompleted);
        viewClearBtn(todoListStorage[todoKey], clearBtn, clearDoneList);
        if (todoListStorage[todoKey].length > 0) {
            for (var i = 0; todoListStorage[todoKey].length > i; i++) {
                var li = document.createElement("li");
                li.classList.add("todoElement");
                li.classList.add(i);
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                var span = document.createElement("span");
                span.innerText = todoListStorage[todoKey][i].value;
                span.classList.add("todoName");
                var btn = document.createElement("button");
                btn.innerText = "x";
                btn.classList.add("deleteBtn");
                btn.classList.add("hide");
                //데이터 비교 complete가 true면 던리스트에 추가
                if (todoListStorage[todoKey][i].complete === false) {
                    todoList.appendChild(li);
                } else {
                    doneList.appendChild(li);
                    checkBox.setAttribute("checked", "checked");
                }
                li.appendChild(checkBox);
                li.appendChild(span);
                li.appendChild(btn);
                li.addEventListener("mouseover", todoMouseOver);
                li.addEventListener("mouseleave", todoMouseLeave);
                span.addEventListener("dblclick", editTodo);
                btn.addEventListener("click", todoRemove);
                checkBox.addEventListener("click", moveTodo);
            }
            
        }
    }

    function resetList(list) {
        while (list.children.length > 0) {
            list.children[0].remove();
        }
    }

    function viewClearBtn(list,btn,fn){
        if (list.length > 0) {
            btn.classList.remove("hide");
            btn.addEventListener("click", fn);
        } else {
            btn.classList.add("hide");
        }
    }

}

function makeTodoKey(todoDate) {
    var month = todoDate.getMonth() + 1;
    var monthValue = `${month < 10 ? "0" + month : month}`;
    var dateValue = `${todoDate.getDate() < 10 ? "0" + todoDate.getDate() : todoDate.getDate()}`;
    todoKey = `${todoDate.getFullYear()}${monthValue}${dateValue}`; 
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
    var clickDateNum = event.target.classList[1];
    var clickDateResult = new Date(nowDate.getFullYear(), nowDate.getMonth(), clickDateNum);
    clickView(clickDateResult);
    makeTodoKey(clickDateResult);
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
                //변수 따로 지정 이유 : 주가 바뀌고, 일요일로 변경
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
    makeTodoKey(nowDate);
    nextMonth.addEventListener("click", calenderHandler);
    backMonth.addEventListener("click", calenderHandler);
    inputTodo.addEventListener("keydown", function(e) {
        if(e.key === "Enter" && inputTodo.value !== "") {
            addTodoList();
        }
    });
}
init();
