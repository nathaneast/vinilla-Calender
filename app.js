var date = document.querySelector(".nowCalender");
var backMonth = document.querySelector(".backMonth");
var nextMonth = document.querySelector(".nextMonth");

var clickDay = document.querySelector(".clickResult-Day");
var clickDate = document.querySelector(".clickResult-Date");

var nowDate = new Date();
//버튼 누름에 따라서 바뀌는 년도,날짜

function removeCalender() {
    var allDate = date.children[0].children.length;
    for (var i = 1; i < allDate; i++) {
        for (var j = 0; j < 7; j++) {
            var removeDate = date.children[0].children[i].children[j];
            removeDate.innerText = "";
            removeDate.removeEventListener("click" , ClickDateResult);
        }
    }
}

function calanderHandler(event) {
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

function ClickDateResult() {
    console.log("이벤트 실행"); 
    var options = {
        weekday: "long"
    };
    clickDay.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate);
    clickDate.innerText = nowDate.getDate();

}

function viewNowCalender() {
    var inputWeek = 1;
    var inputDay;
    var firstDateDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay();
    //이번년도 ,달의 1일의 요일 num값으로 가져옴
    var lastDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();
    //이번년도 ,달의 마지막 날짜

    //달력상단 현재 년도,월 
    var nowMonthYear = document.querySelector(".month-year");
    var options = {
        month: "long"
    };
    nowMonthYear.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate) + nowDate.getFullYear();

    for (var i = 1; i <= lastDate; i++) {
        //1일부터 마지막일까지 값 들어가게
        if (i === 1) {
            var firstDate = date.children[0].children[inputWeek].children[firstDateDay];
            firstDate.innerText = i;
            firstDate.addEventListener("click", ClickDateResult);
            inputDay = firstDateDay;
            //요일값을 1일의 요일 넘버 값으로 바꿈
            inputDay++;
        } else {
            if (inputDay < 7) {
                var dayMonToSat = date.children[0].children[inputWeek].children[inputDay];
                dayMonToSat.innerText = i;
                dayMonToSat.addEventListener("click", ClickDateResult);
                inputDay++;
            } else {
                inputWeek++;
                inputDay = 0;
                var daySun = date.children[0].children[inputWeek].children[inputDay];
                daySun.innerText = i;
                daySun.addEventListener("click", ClickDateResult);
                inputDay++;
            }
        }
    }
}

function init() {
    viewNowCalender();
    ClickDateResult();
    nextMonth.addEventListener("click", calanderHandler);
    backMonth.addEventListener("click", calanderHandler);
}
init();
