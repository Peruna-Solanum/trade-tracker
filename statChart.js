/////////////////////////////////////////////////////////////loadSettings/////////////////////////////////////////////////////////////
const changeFileButton = document.getElementById('changeFileButton');
const chooseFile = document.getElementById('changeFileButton');

chooseFile.addEventListener('click', ()=> {
    pywebview.api.openFileExplorer().then(main)
    }
)
async function loadResults() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve(window.pywebview.api.loadSettings());}, 400)
        })
}
userData = loadResults();
async function main() {
    data =await userData
        let currentFile = data[0];
        let quickPL = data[1];
        let quickWW = data[2];
        let editable = data[3];
        let hideable = data[4];
        let hidden = data[5];
        let quickShow = data[6];
        let color = data[7];

    changeFileButton.textContent = currentFile;

    const monthPL = document.getElementById('monthPL');
        monthPL.textContent = "P/L: $" + quickPL
    const monthWW = document.getElementById('monthWW');
        monthWW.textContent = "Win %: " + quickWW + "%";
    console.log("currentFile[0], quickPl[1], quickWW[2], editable[3], hideable[4], hidden[5], quickshow[6], color[7]")
    console.log("editable:" + editable)
    console.log("hideable:" + hideable);
    console.log("hidden:" + hidden);
    console.log("quickShow:" + quickShow);
    console.log("color:" + color);

    happyFacePicker();
}
main()
function pyNameToTitleName(name) {
    let capitalName = name[0].toUpperCase() + name.slice(1);
    let finalName = capitalName + ":"
    return finalName
}
async function userOptions() {
    let data = await userData;
    let editable = data[3];
    const customBox = document.getElementById('custom');
    for (i = 0; i < editable.length; i++) {
        let customSelect = document.createElement('option')
        customSelect.id = editable[i];
        customSelect.value = editable[i];
        customSelect.textContent = pyNameToTitleName(editable[i])
        customBox.appendChild(customSelect)
    }
}
userOptions();
function happyFacePicker() {
    //&#128526; &#128512; &#128522; &#128529; &#128532; &#128543; &#128546; &#128557; &#128565; &#128128;
    //\u{1F60E} \u{1F600} \u{1F60A} \u{1F611} \u{1F614} \u{1F61F} \u{1F622} \u{1F62D} \u{1F635} \u{1F480}
    //😎        😀          😊         😑         😔     😟      😢          😭      😵      💀
    const happyFace = document.getElementById('happyFace');
    let pL = data[1];
    if (pL <= -500) {
        happyFace.textContent= '\u{1F480}';
    } else if (pL > -500 && pL <= -200) {
        happyFace.textContent = '\u{1F62D}';
    } else if (pL > -200 && pL <= -100) {
        happyFace.textContent = '\u{1F622}'
    } else if (pL > -100 && pL <= -50) {
        happyFace.textContent = '\u{1F61F}'
    } else if (pL > -50 && pL <= -1){
        happyFace.textContent = '\u{1F614}';
    } else if (pL === 0) {
        happyFace.textContent = '\u{1F611}';
    } else if (pL > 0 && pL <= 100) {
        happyFace.textContent = ' \u{1F60A}';
    } else if (pL > 100 && pL <= 200) {
        happyFace.textContent = '\u{1F600}';
    } else if (pL > 200) {
        happyFace.textContent = '\u{1F60E}';
    }
    else {
        console.log('I got nothing');
    }
}
///////Get Date/////////
const dateDiv = document.getElementById('date');
    const date = new Date();
    const dayOfWeekNum = date.getDay();
    let dayOfWeekName;
    const dateNum = date.getDate();
    const dateMonth = date.getMonth();
    const year = date.getFullYear();
function dateCalculator() {
    function dayOfWeekNamer() {
        if(dayOfWeekNum === 0) {
            dayOfWeekName = "Sunday";
        } else if (dayOfWeekNum === 1) {
            dayOfWeekName= "Monday";
        } else if (dayOfWeekNum == 2) {
            dayOfWeekName = "Tuesday";
        } else if (dayOfWeekNum=== 3) {
            dayOfWeekName = "Wednesday";
        } else if (dayOfWeekNum ===4) {
            dayOfWeekName = "Thursday";
        } else if (dayOfWeekNum === 5) {
            dayOfWeekName = "Friday";
        }
          else if(dayOfWeekNum === 6) {
            dayOfWeekName = "Saturday";
        } else {"Error: no date?"};
        
        return dayOfWeekName;
    } 
    dayOfWeekNamer()
    function dateName() {
        if (dateNum === 1 || dateNum === 21 || dateNum === 31) {
            finishedDateNum = dateNum + "st";
        } else if (dateNum === 2 || dateNum === 22) {
            finishedDateNum = dateNum + "nd";
        } else if (dateNum === 3 || dateNum === 23) {
            finishedDateNum = dateNum + "rd";
        } else {finishedDateNum = dateNum + "th"}
    }
    dateName()
    let finalDay = "0" + dateNum;
    let finalMonth = "0" + (dateMonth + 1);
    function addZero2Date() {
        if (finalDay.length === 3) {
            finalDay = dateNum;
        }else{}
        if (finalMonth.length === 3) {
            finalMonth = dateMonth + 1;
        } else {}
        return (finalDay, finalMonth)
    }
    addZero2Date()
    let finalDate = year + "-" + finalMonth + "-" +finalDay;

    dateDiv.textContent = dayOfWeekName + " the " + finishedDateNum ;
    // return [finalDate,dayOfWeekNum]
    return finalDate
}
dateCalculator()
function loadWeekRange() {
    let currentDate = dateCalculator();
    // let dayOfWeekNum = 6;//saturday
    // let currentDate = "2026-04-24"; for testing various dates/day of weeks
    let yearDate = parseInt(currentDate.slice(0, 4));
    let monthDate = currentDate.slice(5, 7);
    let endDate = parseInt(currentDate.slice(8,10));
    //console.log(yearDate + " " + monthDate + " " + endDate)
    function addZeroToDate(data) {
        console.log(data)
        for (i = 0; i < data.length + 1; i ++) {
            if (data[i].toString().length === 1) {
                data[i] = "0" + data[i];
                console.log(data[i])
                return data
            } if (data[i].toString().length > 1){
                return data
            }else {}
        }
        console.log(data)
        return data
    }
    function dateRangeMaker() {
        let dateRange;
        if(dayOfWeekNum === 0) {//sun prev week
            let dateRange = [endDate- 6, endDate];
            addZeroToDate(dateRange);
            return dateRange;
        } else if (dayOfWeekNum === 1) {//only show today
            dateRange= [endDate, endDate];
            addZeroToDate(dateRange);
            return dateRange;
        } else if (dayOfWeekNum == 2) {
            let dateRange = [(endDate - 1) , endDate];
            addZeroToDate(dateRange);
            return dateRange;
        } else if (dayOfWeekNum=== 3) {
            let dateRange = [endDate- 2, endDate];
            addZeroToDate(dateRange);
            return dateRange;
        } else if (dayOfWeekNum ===4) {
            let dateRange = [endDate- 3, endDate];
            addZeroToDate(dateRange);
            return dateRange;
        } else if (dayOfWeekNum === 5) {
            let dateRange = [endDate- 4, endDate];
            addZeroToDate(dateRange);
            return dateRange;
        }
          else if(dayOfWeekNum === 6) {//sat prev week
            let dateRange = [endDate- 5, endDate]
            addZeroToDate(dateRange);
            return dateRange;
        } else {"Error: There is no day of week number for selecting the last week of trades"};
      return dateRange
    }
    function monthLength() {//sees prev month's length, not the current month's length
        let prevMonthLength;
        if (monthDate === "01" || monthDate === "02" || monthDate === "04" || monthDate === "06" || monthDate === "08" || monthDate === "09" || monthDate === "11"){ 
            let prevMonthLength = 31;
            return prevMonthLength;
        }
        else if (monthDate == "05" ||monthDate === "07" ||monthDate === "10" ||monthDate === "12"){
            let prevMonthLength = 30;
            return prevMonthLength;
        } else if (monthDate == "03") {
            if (Number.isInteger(yearDate / 4) === true ) {//fun fact, ever 100 years is not a leap year other than every 400th year, but this program isn't lasting till 2100 so that's not an issue here
                let prevMonthLength = 29;
                return prevMonthLength;
            } else {
                let prevMonthLength = 28;
                return prevMonthLength;
            }
        }else {
            console.log('Error: monthLength() can\'t tell what month it is ')
        }
        return prevMonthLength;
    }
    function ifZero() {
        let prevMonthLength= monthLength();
        let dateRange = dateRangeMaker();
        if (dateRange[0] <= 0) {
            let newRange = [prevMonthLength - (dateRange[1] - dateRange[0]), prevMonthLength, dateRange[1]];
            let prevMonth = (monthDate-1);
            function prevMonthName() {
                if (prevMonth.length = 1) {
                    return ("0" + prevMonth)
                } else {console.log("prev Month length is more than 1")}
            }
            let finalRange = [yearDate + '-' + prevMonthName() + '-' + newRange[0], yearDate+ "-" + prevMonthName() + '-' + newRange[1], yearDate + '-' + monthDate + '-' + "00", yearDate + '-' + monthDate + '-' + newRange[2] ];
            return finalRange
        } else {
            let finalRange = [yearDate + '-' + monthDate + '-' + dateRange[0], 'N' , 'N', yearDate + '-' + monthDate + '-' +dateRange[1]]
            return finalRange
        }
        return finalRange
    }
   return ifZero();
}
const tradeTimeFrame = document.getElementById('tradeTimeFrame');
const todaySelect = document.getElementById('todaySelect');
const weekSelect = document.getElementById('weekSelect');
let currentDate = dateCalculator();
const todayPl = document.getElementById('todaypl');


////////////////////////////////////////////////////////////////////////////////////
const rulesSubmit = document.getElementById('submitRules');
const allStats = document.getElementById('allStats');
const absoluteAll = document.getElementById('absolutelyAll');
function allOff() {
    allStats.checked = false
}
function absoluteOff() {
    absoluteAll.checked = false
}
    //const tradeTimeFrame = document.getElementById('tradeTimeFrame');
    const collationBox = document.getElementById('collation');
    const extraOptions = document.getElementById('custom');
rulesSubmit.addEventListener('click', getStats)
async function getStats() {
    let data = await userData;
    let currentFile = data[0]
    //const tradeTimeFrame = document.getElementById('tradeTimeFrame');
    const collationBox = document.getElementById('collation');
    const extraOptions = document.getElementById('custom');

    let timeFrameVal = [];
    let collationVal = collationBox.options[collationBox.selectedIndex].value;
    let optionVal = extraOptions.options[extraOptions.selectedIndex].value;
    let singleMulti;
    function weekDate(yr, month, date) {
        //2026-05-22
        let addZero;
        let zeroMonth
        if (date < 10) {
            addZero = '0' + date
        } else {addZero = date}

        if (month < 9) {
            zeroMonth = '0' + (month + 1)
        } else {
            zeroMonth =month + 1
        }
        let finalDate = yr +'-' + zeroMonth +'-'+ addZero
        return finalDate
    }
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
    function weekOfMonth() {
        //get month of yr, get start date, end date, get full weeks sundays/saturdays, and carryover if necessary
        //months start at 0, dates themselves are normal
        //let date = new Date("December 1, 2026");(2026-05-2) works too, don't need the 0 in front
        let week1= [];
        let week2= [];
        let week3= [];
        let week4= [];
        let week5= [];
        let finalWeekRanges = [week1, week2, week3, week4, week5]

        let mondays = [];
        let fridays = [];
        let months30 = [1,3,5,8,10]
        //[february, april, june, september, november]
        //[2,4,6,9,11]
        let firstDate = (new Date(year+'-' + (month + 1) + '-' + '1')).getDay();
        for (i = 1; i < 32; i++) {
            let testDate = new Date(year, month , i)
            if (testDate.getDay() === 1) {
                mondays.push(i)
            }else if (testDate.getDay() === 5) {
                fridays.push(i)
            }else {}
        }
        console.log('Mondays: ' + mondays);
        console.log('Fridays: ' + fridays);
        if (fridays[0] <6 && mondays[0] > 3) {//a partial week
            if (firstDate === 5) {//if partial week starts on friday
                //console.log('STARTS ON FRIDAY')
                week1.push(weekDate(year, month, 1))
                week1.push(weekDate(year, month, fridays[1]))
                week2.push(weekDate(year,month,mondays[1]))
                week2.push(weekDate(year, month, fridays[2]))
                week3.push(weekDate(year, month, mondays[2]))
                week3.push(weekDate(year, month, fridays[3]))
                week4.push(weekDate(year, month, mondays[3]))
                week4.push(weekDate(year, month, fridays[4]))
            }  else{//partial week that doesn't start on Friday (so leaving as partial week)
                //console.log('PARTIAL WEEK STARTING')
                week1.push(weekDate(year, month, 1))
                week1.push(weekDate(year, month, fridays[0]))
                week2.push(weekDate(year, month, mondays[0]))
                week2.push(weekDate(year, month, fridays[1]))
                week3.push(weekDate(year, month, mondays[1]))
                week3.push(weekDate(year, month, fridays[2]))
                week4.push(weekDate(year, month, mondays[2]))
                week4.push(weekDate(year, month, fridays[3]))
                week5.push(weekDate(year, month, mondays[3]))
                week5.push(weekDate(year, month, 31))
            }
        } else {
            if (mondays[4] === 31 || (mondays[4] === 30 && months30.includes(month))) {
                //console.log('ENDS ON A MONDAY') 
                week1.push(weekDate(year, month, mondays[0]))
                week1.push(weekDate(year, month, fridays[0]))
                week2.push(weekDate(year, month, mondays[1]))
                week2.push(weekDate(year, month, fridays[1]))
                week3.push(weekDate(year, month, mondays[2]))
                week3.push(weekDate(year, month, fridays[2]))
                week4.push(weekDate(year, month, mondays[3]))
                week4.push(weekDate(year, month, 31))
                
            }else {
            //console.log('STARTS ON A MONDAY')
                week1.push(weekDate(year, month, mondays[0]))
                week1.push(weekDate(year, month, fridays[0]))
                week2.push(weekDate(year, month, mondays[1]))
                week2.push(weekDate(year, month, fridays[1]))
                week3.push(weekDate(year, month, mondays[2]))
                week3.push(weekDate(year, month, fridays[2]))
                week4.push(weekDate(year, month, mondays[3]))
                week4.push(weekDate(year, month, fridays[3]))
                week5.push(weekDate(year, month, mondays[4]))
                week5.push(weekDate(year, month, 31))
            }
        }
        console.log(finalWeekRanges)
        return finalWeekRanges
    }
    weekOfMonth();
    function timeRange() {
        let start = performance.now()
        //let time = tradeTimeFrame.options[tradeTimeFrame.selectedIndex].value;
        let time = tradeTimeFrame.options[tradeTimeFrame.selectedIndex].value;
        if (time === "all") {
            singleMulti = "single";
            timeFrameVal = "> 0"
        } else {
            singleMulti = "multi"
            let weekAmts = weekOfMonth()
            let tradeDate= dateCalculator()
            let dateRange = tradeDate.slice(0,8)
            console.log(tradeDate)
            if (time === "month") {
                timeFrameVal.push(dateRange + "01", dateRange + "31");
                console.log(timeFrameVal)
            } else if (time === "byWeek") {
                singleMulti = "grouped"
                timeFrameVal = weekAmts;
            } else if (time === "week1") {
                timeFrameVal = weekAmts[0];
            } else if (time === "week2") {
                timeFrameVal = weekAmts[1]
            } else if (time === "week3") {
                timeFrameVal = weekAmts[2]
            } else if (time === "week4") {
                timeFrameVal = weekAmts[3]
            }else if (time === "week5") {
                timeFrameVal = weekAmts[4]
            }else if (time === "quarter") {
                let q1 = [0, 1, 2];
                let q2 = [3, 4, 5];
                let q3 = [6, 7, 8];
                let q4 = [9, 10, 11];

                if (q1.includes(month)) {
                    timeFrameVal = [year + '-01-01', dateRange + '31']
                } else if (q2.includes(month)) {
                    timeFrameVal = [year + '-04-01', dateRange + '31']
                } else if (q3.includes(month)) {
                    timeFrameVal = [year + '-07-01', dateRange + '31']
                } else { timeFrameVal = [year + '-10-01', dateRange + '31']}
                console.log(timeFrameVal)
            }
        }
        let end = performance.now()
        console.log(end - start)
    } 
    timeRange();
   pywebview.api.loadStats(currentFile, singleMulti, timeFrameVal, collationVal, optionVal ).then(calculateStats)
}
async function calculateStats(dataList) {
    console.log(dataList)
    const data = dataList;
    //let tableTitle = ('Table Title:' + tradeTimeFrame.options[tradeTimeFrame.selectedIndex].value + collationBox.options[collationBox.selectedIndex].value + extraOptions.options[extraOptions.selectedIndex].value)
   // let numTrades = data.length;
    let winTrades = [];
    let lossTrades = [];
    const profitLoss = data.reduce((a, b)=> a + b, 0)
    for (i = 0; i < data.length; i++) {
        if (data[i] < 0) {
            lossTrades.push(data[i])
        } else {winTrades.push(data[i])}
    }
    let ww = ((winTrades.length / data.length) * 100).toFixed(2)

    let wAmt = winTrades.reduce((a, b)=> a + b, 0);
    let lAmt = lossTrades.reduce((a, b)=> a + b, 0)
    let avgW = wAmt / winTrades.length;
    let avgL = lAmt / lossTrades.length;
    function projection() {
        let lossPercent = 100 - ww
        let win = avgW * ww;
        let loss = avgL * lossPercent;
        return (win + loss).toFixed(2)
    }

    //let projection = ((avgW * ww) + (avgL * (100-ww)))
    let totalAvg = profitLoss / data.length
   // console.log(tableTitle);
    console.log('winTrades: ' + winTrades)
    console.log('lossTrades: ' + lossTrades)
    console.log('profitLoss: ' + profitLoss)
    console.log('WW: ' + ww + '%')
    console.log('win amt: ' + wAmt)
    console.log('l amt: ' +lAmt)
    console.log('avgW: ' + avgW.toFixed(2));
    console.log('avg L ' + avgL.toFixed(2));
    console.log('projection: ' + projection() )
    console.log('total Avg: ' + totalAvg.toFixed(2))
    let statZone = document.getElementById('statZone')
    let tableTemplate = document.getElementById('tableTemplate')
    let newTable = tableTemplate.content.cloneNode(true);
            //let clone = tradeTemplate.content.cloneNode(true);
            statZone.appendChild(newTable);
    let tableDiv = document.getElementById('statsTable');
    let caption = document.getElementById('caption');
    let tableName = document.getElementById('tableName');
    let numTrades = document.getElementById('numTrades');
    let numWins = document.getElementById('numWins');
    let numLosses = document.getElementById('numLosses');
    let tablePl = document.getElementById('tablePl');
    let tableWW = document.getElementById('WW');
    let tableAvgW = document.getElementById('tableAvgW');
    let tableAvgL = document.getElementById('tableAvgL')
    let tableTotalAvg = document.getElementById('totalAvg');
    let tableProjection = document.getElementById('projection')
    let tableWLRatio = document.getElementById('wR');

    tableDiv.id = "statsTable" + 1;
    caption.id = "caption" + 1;
    tableName.id = "tableName" + 1;
    numTrades.id = "numTrades" + 1;
    numWins.id = "numWins" + 1;
    numLosses.id = "numLosses" + 1;
    tablePl.id = "tablePl" + 1;
    tableWW.id = "tableWW" + 1;
    tableAvgW.id = "tableAvgW" + 1;
    tableAvgL.id = "tableAvgL" + 1;
    tableTotalAvg.id = "tableTotalAvg" + 1;
    tableProjection.id = "tableProjection" + 1;
    tableWLRatio.id = "tableWLR" + 1;

    caption.textContent = (collationBox.options[collationBox.selectedIndex].value, extraOptions.options[extraOptions.selectedIndex].value,
        tradeTimeFrame.options[tradeTimeFrame.selectedIndex].value)
    numTrades.textContent  = data.length;
    numWins.textContent = winTrades.length;
    numLosses.textContent = lossTrades.length;
    tablePl.textContent = profitLoss;
    tableWW.textContent = ww + '%';
    tableAvgW.textContent = avgW.toFixed(2);
    tableAvgL.textContent = avgL.toFixed(2);
    tableTotalAvg.textContent = totalAvg.toFixed(2);
    tableProjection.textContent = projection()

}