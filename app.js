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
            var a = removeDate.className;
            // console.log("현재값"+date.children[0].children[i].children[j]);
            // removeDate.classList.remove(a);
            removeDate.removeEventListener("click", clickDate);
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
    // console.log(nowDate);
}

function clickDate(event) {
    // console.log("나우데이트"+nowDate);
    var clickDateValue = event.target.className;
    var clickDateResult = new Date(nowDate.getFullYear(), nowDate.getMonth(), 25);
    //새로운 생성자 년월을 nowDate에서 가져오고 , 일은 클릭한 일수)
    console.log("클릭날짜결과"+clickDateResult);


    // var options = {
    //     weekday: "long"
    // };
    // clickViewDay.innerText = new Intl.DateTimeFormat('en-US', options).format(clickDateResult);
    // clickViewDay.innerText = clickDateResult.getDay();
}

function clickDateFirst() {
    console.log("이벤트 실행");
    var options = {
        weekday: "long"
    };
    clickViewDay.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate);
    clickViewDate.innerText = nowDate.getDate();
    //처음 실행은 클릭값이 이게 맞다.
    // 달력에 월의 날짜가 들어가고 클릭하면 들어가는 값은 다름
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
    nowMonthYear.innerText = new Intl.DateTimeFormat('en-US', options).format(nowDate) + nowDate.getFullYear();

    for (var i = 1; i <= lastDate; i++) {
        //1일부터 마지막일까지 값 들어가게
        if (i === 1) {
            var firstDate = date.children[0].children[inputWeek].children[firstDay];
            firstDate.innerText = i;
            firstDate.addEventListener("click", clickDate);
            firstDate.classList.add(i);
            inputDay = firstDay;
            //요일값을 1일의 요일 넘버 값으로 바꿈
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
    clickDateFirst();
    nextMonth.addEventListener("click", calanderHandler);
    backMonth.addEventListener("click", calanderHandler);
}
init();
