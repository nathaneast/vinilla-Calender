var date = document.querySelector(".nowCalender");
var backMonth = document.querySelector(".backMonth");
var nextMonth = document.querySelector(".nextMonth");
var clickViewDay = document.querySelector(".clickResult-Day");
var clickViewDate = document.querySelector(".clickResult-Date");

var nowDate = new Date();
//버튼 누름에 따라서 바뀌는 년도,날짜

function removeCalender() {
    var allDate = date.children[0].children.length;
    for (var i = 1; i < allDate; i++) {
        for (var j = 0; j < 7; j++) {
            var removeDate = date.children[0].children[i].children[j];
            removeDate.innerText = "";
            if (removeDate.className.length > 0) {
                removeDate.classList.remove(removeDate.className);
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
    viewNowCalender();
}

function clickDate(event) {
    var clickDateValue = event.target.className;
    var clickDateResult = new Date(nowDate.getFullYear(), nowDate.getMonth(), clickDateValue);
    var options = {
        weekday: "long"
    };
    clickViewDay.innerText = new Intl.DateTimeFormat('en-US', options).format(clickDateResult);
    clickViewDate.innerText = clickDateValue;
}

function viewToday() {
    var options = {
        weekday: "long"
    };
    clickViewDay.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate);
    clickViewDate.innerText = nowDate.getDate();
}

function viewNowCalender() {
    var inputWeek = 1;
    var inputDay;
    var firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay();
    //이번년도 ,달의 1일의 요일 num값으로 가져옴
    var lastDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();
    //이번년도 ,달의 마지막 날짜

    //달력 상단 현재 년도,월 변경 
    var nowMonthYear = document.querySelector(".month-year");
    var options = {
        month: "long"
    };

    nowMonthYear.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate) + " "+nowDate.getFullYear();

    for (var i = 1; i <= lastDate; i++) {
        if (i === 1) {
            //월의 첫 날짜의 요일에 들어가는 값
            var firstDate = date.children[0].children[inputWeek].children[firstDay];
            firstDate.innerText = i;
            firstDate.addEventListener("click", clickDate);
            firstDate.classList.add(i);
            inputDay = firstDay;
            inputDay++;
        } else {
            if (inputDay < 7) {
                //월~금요일에 들어가는 값
                var dayMonToSat = date.children[0].children[inputWeek].children[inputDay];
                dayMonToSat.innerText = i;
                dayMonToSat.addEventListener("click", clickDate);
                dayMonToSat.classList.add(i);
                inputDay++;
            } else {
                //일요일에 들어가는 값
                inputWeek++;
                inputDay = 0;
                var daySun = date.children[0].children[inputWeek].children[inputDay];
                daySun.innerText = i;
                daySun.addEventListener("click", clickDate);
                daySun.classList.add(i);
                inputDay++;
            }
        }
    }
}

function init() {
    viewNowCalender();
    viewToday();
    nextMonth.addEventListener("click", calenderHandler);
    backMonth.addEventListener("click", calenderHandler);
}
init();
