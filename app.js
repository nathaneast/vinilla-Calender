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

function todoListForm() {
    this.todos = []; 
    this.dones = [];
}

function addTodoList() {
    var month = todoDate.getMonth() + 1;
    var monthValue = `${month < 10 ? "0" + month : month}`;
    var dateValue = `${todoDate.getDate() < 10 ? "0" + todoDate.getDate() : todoDate.getDate()}`;
    todoKey = `todo${todoDate.getFullYear()}${monthValue}${dateValue}`;

    var selectTodo = new todoListForm();
    if (todoListStorage[todoKey] === undefined) {
    //     //저장소에 키값 없으면
        selectTodo.todos.push(inputTodo.value);
    //     // console.log(selectTodo);
        todoListStorage[todoKey] = selectTodo;
    //     // console.log(todoListStorage);
        console.log("투두키 없음");
    } else {
        console.log("투두키있음");
    }
    inputTodo.value = "";



    //값을 추가하려면 , 로컬 스토리지에서 값을 받고
    //추가한 후에 로컬 스토리지에 값 넣기
    // var li = document.createElement("li");
    // li.innerText = inputTodo.value;
    // todoList.appendChild(li);

    // var httpReq = new XMLHttpRequest();
    // var todoForm = "json_todoForm.txt";
    // httpReq.open("GET", todoForm);
    // httpReq.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         //ajax에서 폼값 받아오기

    //         var getTodo = sessionStorage.getItem(todoKey);
    //         // console.log(getTodo);

    //         if (getTodo !== null) {
    //             //투두값이 있을때
    //             // console.log("투두값 있다")
    //             JSON.parse(getTodo);
    //             console.log(typeof (getTodo));
    //             console.log(getTodo);
    //         } else {
    //             //투두값이 없을때     
    //             var todoData = JSON.parse(this.response);
    //             todoData.todos.push(inputTodo.value);
    //             console.log(todoData);
    //             // JSON.stringify(todoData);
    //             sessionStorage.setItem(todoKey, todoData);
    //             //추가한 투두값 넣고 세션에 전송
    //             console.log("스트링" + todoData);
                // inputTodo.value = "";
    //         }
    //     } 
    // };
    // httpReq.send();
    
}

function viewTodoList(todoDate) {
    //todoDate : 클릭날짜
    // 클릭해당 날짜의 YMD : 객체명
    var month = todoDate.getMonth() + 1;
    var monthValue = `${month < 10 ? "0" + month : month}`;
    var dateValue = `${todoDate.getDate() < 10 ? "0" + todoDate.getDate() : todoDate.getDate()}`;
    todoKey = `todo${todoDate.getFullYear()}${monthValue}${dateValue}`;
    var getTodo = sessionStorage.getItem(todoKey);
    // 로컬스토리지에 투두키값이 있을때
    if (getTodo !== null) {
       /* 
       var a = getTodo;
       var b = JOSN.parseInt(a);
       todokey.todo[] 배열 접근 ?
       */
    }
    // 로컬스토리지에 값 추가
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
        todoList.firstChild.remove();
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
    viewTodoList(clickDateResult);
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
    viewTodoList(nowDate);
    nextMonth.addEventListener("click", calenderHandler);
    backMonth.addEventListener("click", calenderHandler);
    inputTodo.addEventListener("keydown", function (event) {
        if(event.key === "Enter" && inputTodo.value !== "") {
            addTodoList();
        }
    });
}
init();
