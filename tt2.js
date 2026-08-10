function reloadPage() {
    window.location.reload();
}
window.addEventListener('pywebviewready', loadNotifications)
function loadNotifications() {
    pywebview.api.loadNotifications().then(showNotifications)
}
function showNotifications(notificationList) {
    const notificationBox = document.getElementById('notificationBox');
    for (i = 0; i <notificationList.length; i++){
        let notification = document.createElement('div');
        notificationBox.appendChild(notification);
        notification.textContent = notificationList[i][1];
        if (notificationList[i][2] === 'red') {
            notification.classList.add('redNotification');
        } else if (notificationList[i][2]=== "yellow") {
            notification.classList.add('yellowNotification')
        } else if (notificationList[i][2] === 'blue') {
            notification.classList.add('blueNotification')
        }else {
            notification.style.backgroundColor = "gray"
        }
    }
}
const changeFileButton = document.getElementById('changeFileButton');

changeFileButton.addEventListener('click', ()=> {
    pywebview.api.openFileExplorer().then(reloadPage)
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
        let canEdit = data[3];
        let editable = [];
       // let editable = data[3];
        let hideable = data[4];
        let hidden = data[5];
        let quickShow = data[6];
        let color = data[7];
        let fileCustomList  = data[8];
        

function popExtra() {
    for (i - 0; i < fileCustomList.length; i++) {
        fileCustomList[i].replace('"', '');
    }
    console.log(fileCustomList)
        for (x = 0; x < canEdit.length; x ++) {
            if (fileCustomList.includes(canEdit[x])) {
                console.log(canEdit[x] + ' is included in both')
                editable.push(canEdit[x])
            } else {
                console.log(canEdit[x] + ' is not included')
        }
    }}
    popExtra()

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
async function screenLayout() {
    const data = await userData;
    const editable = data[3];
    const hidden= data[5]
    const customContainer = document.getElementById('customContainer');
    //not including pL, explanation, and pics b/c they cant be removed from quickShow
    const dateBox = document.getElementById('tradeDate');
    const tradeStartBox = document.getElementById('tradeStart');
    const tradeLengthBox = document.getElementById('tradeLength');
    const contractsBox = document.getElementById('tradeContracts');
    const dteBox = document.getElementById('dte');
    const ratingBox = document.getElementById('rating');
    const longShortBox = document.getElementById('longShort');

    const hideableList = ['trade_start', 'trade_length', 'dte'];
    
    function addTradeLayout() {
        if (hidden.includes('trade_start')) {
            tradeStartBox.style.display = "none";
        }if (hidden.includes('trade_length')) {
            tradeLengthBox.style.display = "none";
        }if (hidden.includes('dte')) {
            dteBox.style.display = "none";
        } else {}
        //custom section
        for (i = 0; i < (editable.length); i ++ ) {
            iLabel = document.createElement('label');
            iLabel.classList.add("checkboxLabel");
            iLabel.innerHTML = `<input type="checkbox" id = "${editable[i]}" class="checkbox"/> ${pyNameToTitleName(editable[i])} `
            customContainer.appendChild(iLabel);
        }
    }
    addTradeLayout();
}
screenLayout();
function pyNameToTitleName(name) {
    let capitalName = name[0].toUpperCase() + name.slice(1);
    let finalName = capitalName + ":"
    return finalName
}
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
const tradeDate = document.getElementById('tradeDate');
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
    tradeDate.value = finalDate;
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
const tradeTimeFrame = document.getElementById('tradeTimeframe');
const todaySelect = document.getElementById('todaySelect');
const weekSelect = document.getElementById('weekSelect');
let selectionVal;
    let currentDate = dateCalculator();
    // console.log("curremnt Date " + currentDate)
const todayPl = document.getElementById('todaypl');

window.addEventListener('pywebviewready', loadTrades)
tradeTimeFrame.addEventListener('change', loadTrades)
async function loadTrades() {
    const data = await userData
    currentFile = data[0]
    tradeZone.innerHTML = "";
    if(weekSelect.selected) {
            dateCalculator(); //a date range won't work if it's only one day so in that case just make it run the today range instead. I'd have to put it somewhere, either here or in py
        if (dayOfWeekNum === 1) {
            pywebview.api.loadTradesToday(currentFile, currentDate).then(populateTrades)
        }else {
            let dateRange = loadWeekRange();
                    pywebview.api.loadTradesWeek(currentFile, dateRange).then(populateTrades);
        }
    } else if (todaySelect.selected) {
        pywebview.api.loadTradesToday(currentFile, currentDate).then(populateTrades);
    } else {
                console.log('Error: neither today nor this week was selected as a timeframe which doesn\'t exist')
    }
}
const submitButton = document.getElementById('saveTrade');
const form = document.getElementById('form');

    const clearTradeButton = document.getElementById('clearTrade');
            const plVal = document.getElementById('tradeAmt');
        const dateVal = document.getElementById('tradeDate');
        const tradeStartVal= document.getElementById('tradeStart');
        const tradeLengthVal = document.getElementById('tradeLength');
        const explanationVal = document.getElementById('tradeExplanation');
        const contractVal = document.getElementById('tradeContracts');
        const dteVal = document.getElementById('dte');
        const selectGradeVal = document.getElementById('selectGrade');
        const longShort = document.getElementById('longShort');
            const pic1 = document.getElementById('pic1');
            const pic2 = document.getElementById('pic2');
            const pic3 = document.getElementById('pic3');
            const pic4 = document.getElementById('pic4');
    function clearTrade() {
        plVal.value = "";
        tradeStartVal.value = "";
        tradeLengthVal.value = "";
        explanationVal.value = "";
        contractVal.value = "";
        dteVal.value = "";
        selectGradeVal.value = "";
        longShort.value = "nolongShort";
        document.querySelectorAll('input[type=checkbox]').forEach(element=> element.checked = false);//don't need to define individual boxes anymore
        pic1.innerHTML = "";
        pic2.innerHTML = "";
        pic3.innerHTML = "";
        pic4.innerHTML = "";
    }
    clearTradeButton.addEventListener('click', clearTrade)
 function saveTrade() {
    function isChecked(boxName) {
        if (boxName) {
            let boxVal = "on";
            return boxVal
        }else {
            let boxVal = "off";
        return boxVal
        }
    } 
    function boxChecked() {
        //document.querySelectorAll('input[type=checkbox]').forEach(element=> element.checked = false);
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        let checkBoxNames = [];
        let checkBoxValues = [];
        for (i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                checkBoxValues.push("on")
                checkBoxNames.push(checkboxes[i].id)
            } else {
                checkBoxValues.push("off")
                checkBoxNames.push(checkboxes[i].id)
            }
        }
        if (contractVal.value === '') {
            contractVal.value = 1;
        } else {}
        pywebview.api.saveTrade(currentFile, plVal.value, dateVal.value, tradeStartVal.value, tradeLengthVal.value, explanationVal.value, contractVal.value, dteVal.value, selectGradeVal.value, longShort.value, pic1.innerHTML, pic2.innerHTML, pic3.innerHTML, pic4.innerHTML, checkBoxNames, checkBoxValues).then(loadTrades).then(main);
    }
    boxChecked();
clearTrade();
}
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    saveTrade();
});

const template = document.getElementById('template');
const showTrades = document.getElementById('showTrades');
const tradeZone = document.getElementById('tradeZone');

    async function showTrade(data, index, custom) {
        // console.log("customData" + customData)

        let settingsData = await userData;
        let editable = settingsData[3];
        let hideable = settingsData[4];
        let hidden = settingsData[5];
        let quickShow = settingsData[6];
        let color = settingsData[7];

        let clone = template.content.cloneNode(true);
            tradeZone.appendChild(clone);
        let tradeName = document.querySelector('#trade');
        let tradeId = document.getElementById('tradeId');
        let xButton = document.getElementById('x');
        let deleteTradeAlert = document.getElementById('deleteTradeAlert');
        let yesDelete = document.getElementById('yesDelete');
        let noDelete = document.getElementById('noDelete');
        let editButton = document.getElementById('edit');
            let tradeData = document.getElementById('tradeData')
        let pl = document.getElementById('pl');
        let time = document.getElementById('time');
        let length = document.getElementById('length');
        let explanation = document.getElementById('explanation');
        let contracts = document.getElementById('contractNum');
        let rating = document.getElementById('rating');
            let pic1 = document.getElementById('pic1');
            let pic2 = document.getElementById('pic2');
            let pic3 = document.getElementById('pic3');
            let pic4 = document.getElementById('pic4');

            tradeName.id = "trade" + index;
            tradeId.id= "id" + index;
            xButton.id ="x" + index;
            deleteTradeAlert.id = "deleteTradeAlert" + index;
            yesDelete.id = "yesDelete" + index;
            noDelete.id = "noDelete" + index;
            editButton.id = "edit" + index;
                tradeData.id = "tradeData" + index;
            pl.id = "pl" + index;
            time.id = "time" + index;
            length.id = "length" + index;
            explanation.id = "explanation" + index;
            contracts.id = "contractNum" + index;
            rating.id = "rating" + index;
            pic1.id = "pic1_" + index;
            pic2.id = "pic2_" + index;
            pic3.id = "pic3_" + index;
            pic4.id = "pic4_" + index;

            for (i = 0; i < editable.length; i++) {
                // if (quickShow.includes(editable[i])) {
                //     console.log('includes' + data[index][0])
                //     let showCustom = document.createElement('div');
                //     showCustom.id = editable[i];
                //     let innerText = editable[i][0].toUpperCase() + editable[i].slice(1);
                //     showCustom.textContent = innerText;
                //     tradeData.appendChild(showCustom);
                //     if (color[i][0] == editable[i]) {
                //         showCustom.style.backgroundColor = color[i][1]
                //     } else {showCustom.style.backgroundColor = "white"}
                //     //showCustom.style.backgroundColor = "white";
                //     showCustom.style.color = "black";
                //     showCustom.style.paddingTop = "7px";
                //     showCustom.style.paddingBottom = "7px"
                // }else {}
                    let indexAmt = 14 + i;//since i starts at 0, I was making a mistake since it needs to start at the correct value, was starting late
                    let indexValue = data[index][indexAmt]
                    if (indexValue === "on") {
                        console.log(quickShow.includes(editable[i]))
                        if (quickShow.includes(editable[i])) {
                            let showCustom = document.createElement('div');
                            showCustom.id = editable[i];
                            let innerText = editable[i][0].toUpperCase() + editable[i].slice(1);
                            showCustom.textContent = innerText;
                            tradeData.appendChild(showCustom);
                            if (color[i][0] == editable[i]) {
                                showCustom.style.backgroundColor = color[i][1]
                            } else {showCustom.style.backgroundColor = "white"}
                            //showCustom.style.backgroundColor = "white";
                            showCustom.style.color = "black";
                            showCustom.style.paddingTop = "7px";
                            showCustom.style.paddingBottom = "7px"
                        } else {}
                    } else {}
            }

    
        tradeId.textContent = data[index][0];
        pl.textContent = "P/L: " + data[index][1];
        time.textContent = "Time: " + data[index][3];
        length.textContent = "Length: "+ data[index][4] + " min";
        explanation.textContent = data[index][5];
        contracts.textContent = data[index][6];
        rating.textContent = data[index][8];
        pic1.innerHTML = data[index][10];
        pic2.innerHTML = data[index][11];
        pic3.innerHTML = data[index][12];
        pic4.innerHTML = data[index][13];
        function dateColor() {
            let tradeDate= new Date(data[index][2]);
            let dayOfWeek = tradeDate.getUTCDay(); //you have to change the getDay to the universal timeazone so it works right, still says the day wrong but gets the day color
            let currentTradeId =document.getElementById(tradeName.id)
                if (dayOfWeek === 1) {
                    currentTradeId.style.backgroundColor = "light-dark(rgb(230, 174, 174), rgb(82, 33, 33))"; 
                } else if (dayOfWeek === 2) {
                    currentTradeId.style.backgroundColor = "light-dark(rgb(248, 241, 211), rgb(121, 109, 40)";
                } else if (dayOfWeek=== 3) {
                    currentTradeId.style.backgroundColor = "light-dark(rgb(199, 233, 192), rgb(75, 104, 61)";
                } else if (dayOfWeek ===4) {
                    currentTradeId.style.backgroundColor = "light-dark(rgb(200, 236, 245), rgb(58, 97, 100)";
                } else if (dayOfWeek=== 5) {
                    currentTradeId.style.backgroundColor = "light-dark(rgb(190, 179, 238), rgb(68, 53, 92)";
                } else { console.log("mrkt ain't open on " + data[index].date)
                };
        };
        dateColor();
        function contractColor() {
            let currentContracts = document.getElementById(contracts.id)
            if(currentContracts.textContent == 1) {
                currentContracts.style.backgroundColor = "light-dark(rgb(207, 207, 207), rgb(104, 104, 104))";
            }else if (currentContracts.textContent == 2 ) {
                currentContracts.style.backgroundColor = "light-dark(rgb(238, 112, 255), rgb(182, 5, 182))";
            } else if (currentContracts.textContent > 2) {
                currentContracts.style.backgroundColor = "light-dark(rgb(255, 188, 112), rgb(204, 101, 4))";
            } else {}//else {console.log("Error: there are 0 contracts for trade " + data[index][0])}
        };
        contractColor();
        function ratingColor() {
            let currentrating = document.getElementById(rating.id);
            let dataRating = data[index][8];
            if (dataRating == "A") {
                currentrating.style.backgroundColor = "light-dark(rgb(181, 255, 112), rgb(41, 151, 31))";
            } else  
                        if (dataRating === "B") {
                currentrating.style.backgroundColor = "light-dark(rgb(188, 214, 95), rgb(148, 172, 9))";
            } else 
                        if (dataRating === "C") {
                currentrating.style.backgroundColor = "light-dark(rgb(255, 230, 0), rgb(172, 147, 9))";
            } else 
                        if (dataRating === "D") {
                currentrating.style.backgroundColor = "light-dark(rgb(236, 146, 42), rgb(204, 101, 4))";
            }   else           if (dataRating === "F") {
                currentrating.style.backgroundColor = "light-dark(rgb(255, 112, 112), rgb(165, 9, 9))";
            } else {}//else {console.log("No rating for trade " + data[index][0])};
        }
        ratingColor()

    }

    function populateTrades(data) {
        tradeZone.innerHTML = "";
        let arrayLength =data.length;
        let plList = [];
        for (i=0; i < arrayLength; i++) {
            let custom = data[i].slice(14)
            showTrade(data, i, custom);
            plList.push(data[i][1])
        }
        function addPl(total, num) {
            return total + num;
        }
        if (plList.length === 0) {
                todayPl.textContent = "P/L: "
        }
        else {
            todayPl.textContent = "P/L: $" + plList.reduce(addPl)
        }
    }
    ////////////////////////////////////////////////////
    const closePic = document.getElementById('closePic');
    const screenDarkener = document.getElementById('screenDarkener')
    const body = document.getElementById('body')
    const activePic = document.getElementById('activePic')
    async function deleteTrade(clickedObject) {
        let data = await userData;
        let currentFile = data[0]
        let fullClickedObject = clickedObject.slice(1);
        let tradeNum = document.getElementById('trade' + fullClickedObject)
        let tradeId = document.getElementById('id' + fullClickedObject);
        let deleteTradeAlert = document.getElementById('deleteTradeAlert' + fullClickedObject)
        let yesDelete = document.getElementById('yesDelete' + fullClickedObject);
        let noDelete = document.getElementById('noDelete' + fullClickedObject);
        let deleteButton = document.getElementById(clickedObject);

        deleteTradeAlert.style.visibility = "visible";
        screenDarkener.classList.toggle("hidden")
        tradeNum.classList.add("tradeDelete");
        tradeNum.style.pointerEvents = "none";
        deleteTradeAlert.style.pointerEvents = "auto"

        function yesDeleteTrade() {
            console.log(tradeId.textContent)
            pywebview.api.deleteTrade(currentFile, tradeId.textContent).then(loadTrades)
            screenDarkener.classList.add("hidden");
            console.log('trade deleted')
        }
        function cancelDelete() {
            deleteTradeAlert.style.visibility = "hidden";
            screenDarkener.classList.add("hidden");
            tradeNum.classList.remove("tradeDelete");
            tradeNum.style.pointerEvents = "auto"
            deleteTradeAlert.style.pointerEvents = "auto"
        }
        yesDelete.addEventListener('click', yesDeleteTrade);
        noDelete.addEventListener('click', cancelDelete);
        screenDarkener.addEventListener('click', cancelDelete);
        body.addEventListener('keydown', (e)=> {
        if (e.key === "Escape") {cancelDelete()}
        // else if (e.key === "Enter") {yesDeleteTrade()}
         else {}
    })

    }
    async function editTrade(clickedObject) {
        let data = await userData;
        let currentFile = data[0];
        let editable = data[3];
        let quickShow= data[6];
        let color = data[7];

        let fullClickedObject = clickedObject.slice(4);
        let tradeNum = document.getElementById('trade' + fullClickedObject)
        let tradeId = document.getElementById('id' + fullClickedObject);
        let deleteButton = document.getElementById('x' + fullClickedObject);
        let tradeData = tradeNum.querySelector('.tradeData');
        let tradeButtons = tradeNum.querySelector('.buttons');
        let sqlId = tradeId.textContent;
        console.log(sqlId)

        let exitEdit = document.createElement('button');
        exitEdit.setAttribute('type', 'button');
        exitEdit.textContent = "Cancel";
        exitEdit.setAttribute('class', 'editTradeButtons');

        let saveEditButton = document.createElement('button');
        saveEditButton.setAttribute('type', 'button');
        saveEditButton.textContent = "Save";
        saveEditButton.setAttribute('class', 'editTradeButtons');
        //  {
        //     type: "button", innerHTML: "Cancel", class: "editTradeButtons"})
        tradeButtons.innerHTML = "";
        
        tradeButtons.appendChild(exitEdit)
        tradeButtons.appendChild(saveEditButton)
        tradeData.innerHTML = "";
        screenDarkener.classList.remove("hidden");
        tradeNum.style.backgroundColor = "rgb(136, 135, 135)";
        tradeNum.classList.add("tradeEdit");
        const editTradeTemplate= document.getElementById('editTradeTemplate')
        const clone = editTradeTemplate.content.cloneNode(true)
        tradeData.appendChild(clone);

        function populateEdit(result){
            const editAmt = document.getElementById('edittradeAmt');
            const editDate = document.getElementById('edittradeDate');
            const editStart = document.getElementById('edittradeStart');
            const editLength = document.getElementById('edittradeLength');
            const editExplanation = document.getElementById('edittradeExplanation');
            const editContracts = document.getElementById('edittradeContracts');
            const editDte = document.getElementById('editdte');
            const editSelectGrade = document.getElementById('editselectGrade');
            const editlongShort = document.getElementById('editlongShort');
                    const editCustomBox= document.getElementById('editCustomBox');
                const editPic1 = document.getElementById('editpic1');
                const editPic2 = document.getElementById('editpic2');
                const editPic3 = document.getElementById('editpic3');
                const editPic4 = document.getElementById('editpic4');
             
             for (i = 0; i < (editable.length); i ++ ) {
            iLabel = document.createElement('label');
            iLabel.classList.add("checkboxLabel");
            iLabel.innerHTML = `${pyNameToTitleName(editable[i])} <input type="checkbox" id = "edit${editable[i]}" class="checkbox"/>`
            editCustomBox.appendChild(iLabel);
            console.log(document.getElementById("edit"+editable[i]))
            let customDataRange = result[0].slice(14);
            console.log(customDataRange)
            console.log(result[0])
            console.log(result[0].slice[14])
            editChecked(document.getElementById("edit"+editable[i]), customDataRange[i])
        }  

            function editChecked(objectName, data) {
                if (data === 'on') {
                    objectName.checked = true;
                } else if (data === 'off') {
                    objectName.checked = false;
                } else {console.log('editChecked() function is having issues telling if the edited trade is checked or not')}
            }
        
            editAmt.value = result[0][1];
            editDate.value = result[0][2];
            editStart.value = result[0][3];
            editLength.value = result[0][4];
            editExplanation.value = result[0][5];
            editContracts.value = result[0][6];
            editDte.value = result[0][7];
            editSelectGrade.value = result[0][8];
            editlongShort.value = result[0][9];
                editPic1.innerHTML = result[0][10];
                editPic2.innerHTML = result[0][11];
                editPic3.innerHTML = result[0][12];
                editPic4.innerHTML = result[0][13]; 
// return editTradeValues;
                 function cancelEditTrade() {
                    window.location.reload()
                }
        exitEdit.addEventListener('click', cancelEditTrade)
            body.addEventListener('keydown', (e)=> {
        if (e.key === "Escape") {
            if (activePic.classList.contains("hidden")) {cancelEditTrade()}}
        else {}
    })
        screenDarkener.addEventListener('click', cancelEditTrade);
        saveEditButton.addEventListener('click', saveEditTrade);
        body.addEventListener('keydown', (e)=> {
        if (e.key === "Enter") {saveEditTrade()}
        else {}
    })

       function saveEditTrade() {
            let checkBoxValues = [];
                            screenDarkener.classList.add("hidden")
                        for (i = 0; i < editable.length; i++) {
                currentCheckbox = document.getElementById("edit"+editable[i]);
                console.log(currentCheckbox)
                    if (currentCheckbox.checked === true) {
                        checkBoxValues.push("on")
                    } else {
                        checkBoxValues.push("off")
                    }
                        }
             let editTradeValues = [editAmt.value, editDate.value, editStart.value, editLength.value, editExplanation.value, editContracts.value, editDte.value, editSelectGrade.value, editlongShort.value, editPic1.innerHTML, editPic2.innerHTML, editPic3.innerHTML, editPic4.innerHTML]
             pywebview.api.saveEditTrade(currentFile, sqlId, editTradeValues, editable, checkBoxValues).then(setTimeout(()=> {
                window.location.reload();
             }, 100))
            
            }  
        }
        pywebview.api.loadEditTrade(currentFile, sqlId).then(populateEdit)
    
    }

function showPic(event) {
    //const clickedPic = event.currentTarget;
    const clickedPic = document.getElementById(event)
 activePic.innerHTML = clickedPic.innerHTML
    activePic.classList.remove('hidden');
    screenDarkener.classList.remove('hidden');
    closePic.classList.remove('hidden');//.toggle() exists too

    function back2Normal() {
        activePic.innerHTML = "";
        activePic.classList.add('hidden')
    screenDarkener.classList.add('hidden');
    closePic.classList.add('hidden');
    }
   closePic.addEventListener('click',back2Normal);
    body.addEventListener('keydown', (e)=> {
        if (e.key === "Escape") {back2Normal()}
        else {}
    })
    screenDarkener.addEventListener('click', back2Normal);
    activePic.addEventListener('click', (e)=> {//had to get this from stack overflow since didn't know abt currentTarget and target
        if (e.target === e.currentTarget) {
            back2Normal();
        } else {}
    })
}
function showEditPic(event) {
    //const clickedPic = event.currentTarget;
    const clickedPic = document.getElementById(event)
 activePic.innerHTML = clickedPic.innerHTML
    activePic.classList.remove('hidden');
    screenDarkener.classList.remove('hidden');
    closePic.classList.remove('hidden');//.toggle() exists too

    function back2Normal() {
        activePic.innerHTML = "";
        activePic.classList.add('hidden')
    closePic.classList.add('hidden');
    }
   closePic.addEventListener('click',back2Normal);
    body.addEventListener('keydown', (e)=> {
        if (e.key === "Escape") {back2Normal()}
        else {}
    })
    screenDarkener.addEventListener('click', back2Normal);
    activePic.addEventListener('click', (e)=> {//had to get this from stack overflow since didn't know abt currentTarget and target
        if (e.target === e.currentTarget) {
            back2Normal();
        } else {}
    })
}
const typeBox = document.getElementById('typeBox');
function bigExplanation() {
    tradeExplanation.addEventListener('mouseenter', ()=> {
        typeBox.style.visibility = "visible";
        typeBox.textContent = tradeExplanation.value;
        tradeExplanation.addEventListener('keyup', ()=> {
            typeBox.textContent = tradeExplanation.value;
        })
    })
    tradeExplanation.addEventListener('keyup', (k)=> {
        typeBox.style.visibility = "visible";
        typeBox.textContent = tradeExplanation.value;
        tradeExplanation.addEventListener('keydown', (k)=> {
            if (k.key === "Tab") {
                typeBox.style.visibility = "hidden"
                typeBox.textContent = ""
            }
        })
    })
    tradeExplanation.addEventListener('mouseleave', ()=> {
        typeBox.style.visibility = "hidden"
        typeBox.textContent = ""
    })
}
bigExplanation();
