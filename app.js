var date = document.querySelector(".nowCalender");
var backMonth = document.querySelector(".backMonth");
var nextMonth = document.querySelector(".nextMonth");
var clickViewDay = document.querySelector(".clickResult-Day");
var clickViewDate = document.querySelector(".clickResult-Date");

var nowDate = new Date();
//버튼 누름에 따라서 바뀌는 년도,월
var nowClick;

function removeCalender() {
    if(nowClick !== undefined) {
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
    nextMonth.addEventListener("click", calenderHandler);
    backMonth.addEventListener("click", calenderHandler);
}
init();
