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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const settingsListBox = document.getElementById('settingsList');
window.addEventListener('pywebviewready',loadSettingList)
function loadSettingList() {
   //pywebview.api.settingList().then(populateSettings)
    pywebview.api.loadNotifications().then(populateNotification)
}
// function populateSettings(settingArray) {
//     console.log(settingArray)
// }
    const notificationListBox =document.getElementById('notificationList');
function populateNotification(notificationArray) {
    const notificationTemplate = document.getElementById('notificationTemplate');
    
    for (i = 0; i < notificationArray.length; i++) {
        let notificationClone = notificationTemplate.content.cloneNode(true)
        notificationListBox.appendChild(notificationClone);

        let notificationDiv = document.getElementById('notification')
        let notificationText = document.getElementById('notificationText')
        let notificationColor = document.getElementById('notificationColor')
        let notifX = document.getElementById('notifX');

        notificationText.id = 'notificationText' + notificationArray[i][0];
        notificationColor.id = 'notificationColor' + notificationArray[i][0];
        notifX.id = 'notifX' + notificationArray[i][0];

        notificationText.textContent = notificationArray[i][1];
        notificationColor.textContent = notificationArray[i][2];
    }   
}
const addNotificationButton = document.getElementById('addNotification')
addNotificationButton.addEventListener('click', addNotification)
function addNotification() {
    const message = document.getElementById('inputNotification')
    const colorChoice = document.getElementById('notificationSelect')
    let color = colorChoice.options[colorChoice.selectedIndex].value
    pywebview.api.saveNotification(message.value, color).then(reloadPage)
}
function clearAll(item){
    item.innerHTML = ''
}
function deleteNotification(e) {
    pywebview.api.deleteNotification(parseInt(e.slice(6))).then(reloadPage)
}
function reloadPage() {
    window.location.reload()
}
//////////////////////////////////////////////////////////////
async function loadSettings() {
    const hiddenList = document.getElementById('hiddenList');
    const quickShowList = document.getElementById('quickShowList');
    const customList = document.getElementById('customList');

    let data = await userData;
    let editable = data[3]
    let hideable = data[4];
    let hidden = data[5];
    let quickShow = data[6];
    let customColor = data[7];
    const quickShowAble = ['contracts', 'dte', 'rating']
    editable.forEach((i)=> {
        quickShowAble.push(i)
    })
    console.log('quickShowAble' + quickShowAble)
//<button type="button" value="quickShowList" class="editTradeButton" id="editQuickShow" onclick="editSetting(this.value)"><img  class="editButtonPic" src="blender_frame.1.png"></button>
/* <template id="settingTemplate">
    <li>
        <button type="button" id='button' class="editTradeButton" onclick="editSetting(this.value)">Edit</button>
        <div id="bullet"></div>
        <div id="settingName"></div>
    </li>
</template> */
let settingTemplate = document.getElementById('settingTemplate');
    populateList(hiddenList, hideable, hidden, 'hidden');
    populateList(quickShowList, quickShowAble, quickShow, 'quickShow');
    populateCustomList(customList, editable, hidden, quickShow, customColor)

}
loadSettings();
// let editButtons = document.querySelectorAll('.editSettingButton')
// editButtons.addEventListener('click', ()=> {editSetting(this.value)})
function editSetting(id) {
    let clickedButton = document.getElementById(id);
    let settingLocation = id.slice(4);
    let cancelButton  = document.getElementById('cancelButton' + settingLocation)
    let liName = document.getElementById('bullet' + settingLocation);
    let liText = document.getElementById('listName' + settingLocation)
    let editXY = document.getElementById('XY' + settingLocation);
    let originalVal = clickedButton.value;
    let finalVal = clickedButton.value;
    clickedButton.textContent = "Save";
    cancelButton.classList.add('editButton');
    cancelButton.classList.remove('hidden');
    liName.style.backgroundColor = "gray";
    cancelButton.addEventListener('click', ()=> {
        cancelButton.classList.add('hidden');
        clickedButton.textContent = "edit";
        liName.style.backgroundColor = "none";
        if (originalVal === 'N') {
            editXY.classList.remove('checkmark')
            editXY.classList.add('XMark');
        } else {
            editXY.classList.remove('XMark');
            editXY.classList.add('checkmark');
        }
        editXY.classList.remove('editable');
    })
    editXY.addEventListener('click', ()=> {
        if (editXY.classList.contains('checkmark')) {
            editXY.classList.remove('checkmark')
            editXY.classList.add('XMark');
            finalVal = 'N'
        } else {
            editXY.classList.remove('XMark');
            editXY.classList.add('checkmark');
            finalVal = 'Y'
        }
    })
    clickedButton.addEventListener('click', ()=> {saveEdit(editXY.value, liText.value, originalVal, finalVal)})
}
function saveEdit(settingType,name,  prevValue, changeValue) {
    pywebview.api.changeSetting(settingType, name, prevValue, changeValue).then(reloadPage)
}
function populateList(listContainer, listName, onOff, typeName) {
    let template = document.getElementById('listTemplate');
        for (i = 0; i < listName.length; i++) {      
            const clone = template.content.cloneNode(true)
        listContainer.appendChild(clone);
        
        let button = document.getElementById('editButton');
        let bullet = document.getElementById('bullet');
        let XY = document.getElementById('XY');
        let name = document.getElementById('listName');
        let cancelButton = document.getElementById('cancelButton');

        button.id =  'edit' + listContainer.id + i;
        bullet.id = 'bullet'+ listContainer.id + i;
        XY.id = 'XY'+ listContainer.id + i;
        name.id = 'listName'+ listContainer.id + i;
        cancelButton.id = 'cancelButton' + listContainer.id + i;

        button.textContent = 'edit';
        name.textContent =listName[i][0].toUpperCase() + listName[i].slice(1);
        name.value = listName[i];
        bullet.value = typeName;
        XY.value = typeName
        if (onOff.includes(listName[i])) {
            XY.classList.add('checkmark');
            button.value = "Y"
        } else {XY.classList.add('XMark')
            button.value = "N"
        }
    }
}
const container = document.getElementById('customList')
function populateCustomList(listContainer, listName, listHidden, listQuickShow, listColor){
    let template = document.getElementById('customTemplate');

    for(i = 0; i < listName.length; i++) {
        let clone = template.content.cloneNode(true);
        listContainer.appendChild(clone);

        let customEdit = document.getElementById('customEdit');
        let customBullet = document.getElementById('customBullet');
        let customName = document.getElementById('customName'); 
        let hiddenCheck = document.getElementById('hiddenCheck');
        let quickShowCheck = document.getElementById('quickShowCheck');
        let colorCheck = document.getElementById('colorCheck');
        let hiddenLabel = document.getElementById('hiddenLabel');
        let quickShowLabel = document.getElementById('quickShowLabel');
        let colorLabel = document.getElementById('colorLabel');
        let cancelCustom = document.getElementById('cancelCustom');

        if (customBullet.classList.contains("hasDelete")) {
            let deleteButton = document.getElementById('deleteCustom');
            deleteButton.id = 'deleteCutom' + i;
            deleteButton.value = listName[i]
        } else {}
        

        customBullet.id = 'customBullet' + i;
        customEdit.id = 'customEdit' + i;
        customName.id = 'customName' + i;
        quickShowCheck.id = 'quickShowCheck' + i;
        colorCheck.id = 'colorCheck' + i;
        hiddenLabel.id = 'hiddenLabel' + i;
        quickShowLabel.id = 'quickShowLabel' + i;
        colorLabel.id = 'colorLabel' + i;
        cancelCustom.id = 'cancelCustom' + i;
        hiddenCheck.id = 'hiddenCheck' + i;


        customName.value = listName[i];
        customName.textContent = listName[i][0].toUpperCase() + listName[i].slice(1) + ":"
        colorCheck.value = listColor[i][1];

        if (listHidden.includes(listName[i])) {
            hiddenCheck.checked = true;
            hiddenCheck.value = 'Y'
        } else{hiddenCheck.value = 'N'}
        if (listQuickShow.includes(listName[i])) {
            quickShowCheck.checked = true;
            quickShowCheck.value = 'Y'
        } else{quickShowCheck.value = 'N'}
    }
}


function editCustom(id) {
    let clickedButton = document.getElementById(id);
    let settingLocation = id.slice(10);
    let cancelCustom = document.getElementById('cancelCustom' + settingLocation);
    let background = document.getElementById('customBullet' + settingLocation);
    let name = document.getElementById('customName' + settingLocation);
    let hiddenLabel = document.getElementById('hiddenLabel' + settingLocation);
    let quickShowLabel = document.getElementById('quickShowLabel' + settingLocation);
    let colorLabel = document.getElementById('colorLabel' + settingLocation);
    let hiddenCheck = document.getElementById('hiddenCheck' + settingLocation);
    let quickShowCheck = document.getElementById('quickShowCheck' + settingLocation);
    let colorBox = document.getElementById('colorCheck' + settingLocation);

    let originalValues = [hiddenCheck.value, quickShowCheck.value, colorBox.value]
    let finalValues = [hiddenCheck.value, quickShowCheck.value, colorBox.value]
    
    console.log(name.value)

    background.style.backgroundColor = "gray";
    clickedButton.textContent = "Save";
    cancelCustom.classList.remove('hidden');
    cancelCustom.classList.add('editButton');
    hiddenLabel.classList.remove('noClick');
    quickShowLabel.classList.remove('noClick');
    colorLabel.classList.remove('noClick');

    hiddenCheck.addEventListener('change', ()=> {
        if (hiddenCheck.checked) {
            finalValues[0] = 'Y'
        } else {finalValues[0] = 'N'}
    })
    quickShowCheck.addEventListener('change', ()=> {
        if (quickShowCheck.checked) {
            finalValues[1] = 'Y'
        } else {finalValues[1] = 'N'}
    })
    colorBox.addEventListener('change', ()=> {
        finalValues[2] = colorBox.value;
    })
    clickedButton.addEventListener('click', ()=> {
        saveCustomSettings(name.value, finalValues[0], finalValues[1], finalValues[2])
    })

}
function saveCustomSettings(name, hiddenVal, quickShowVal, colorVal) {
    pywebview.api.changeCustomSetting(name, hiddenVal, quickShowVal, colorVal).then(reloadPage);

}
function deleteCustom(id) {
    let target = document.getElementById('customName' + id.slice(11))
    let targetName = target.innerHTML.slice(0, -1)

    pywebview.api.deleteCustom(targetName).then(reloadPage)
}
const newCustomButton = document.getElementById('submitCustom')
function newCustom() {
    const newName = document.getElementById('newName')
    const newHidden = document.getElementById('newHidden')
    const newQuickShow = document.getElementById('newQuickShow');
    const newColor = document.getElementById('newColor');
function ifChecked(checkbox){
        if (checkbox.checked = true){
        return 'Y'
        } else { return 'N'}
}
// ifChecked(newHidden);
// ifChecked(newQuickShow)
    pywebview.api.newCustom(newName.value, ifChecked(newHidden), ifChecked(newQuickShow), newColor.value ).then(reloadPage)
}
newCustomButton.addEventListener('click',()=> { newCustom})//for the allTrades file, not the settingsFile
/////////////////////save and create new file
const createNewFile = document.getElementById('createNewFile');
const newFileName = document.getElementById('newFileName');
const fileLocationButton = document.getElementById('fileLocationButton');
let ready = [0,0];
function saveFolderLocation(fileType, id) {
    console.log(fileType)
    console.log(id)
    pywebview.api.saveFolderLocation(fileType, id).then(folderBackground)
}
function openFileExplorer(fileType, id) {
    pywebview.api.openFileExplorer(fileType, id).then(folderBackground)
}
function folderBackground(folderPath){
    let button = document.getElementById(folderPath[1])
    button.textContent = folderPath[0];
    ready[1] = 1;
    isItReady();
}

    newFileName.addEventListener('change', ()=> {
        if (newFileName.value !== '') {
            ready[0] = 1;
            isItReady();
        } else {}
    })
createNewFile.addEventListener('click',()=> {
    if (createNewFile.classList.contains('notReady')) { 
        alert('Can\'t create a new file yet. Pick a file location and a file name then try again.')
    } else {
        console.log('SAVING FILE NOW')
        let fileName = newFileName.value;
        let fileLocation = fileLocationButton.textContent;
        let referenceFile = document.getElementById('copyPastData')
        console.log(fileName)
        console.log(fileLocation)
        pywebview.api.createNewFile(fileName, fileLocation, referenceFile.textContent).then(newFileDialog(`${fileName}.db`, fileLocation))
        //pywebview.api.createPastStats(referenceFile.textContent)
    }
}
)
function isItReady() {
    if (ready[0] === 1 && ready[1] === 1) {
        console.log('its ready')
        createNewFile.classList.remove('notReady')
        createNewFile.classList.add('ready')
    }
    else {
        console.log('its not ready')
    }
}
function newFileDialog(name, folder) {
    alert(`New file ${name} made at ${folder}. Refresh page to see new file.`)
}
const includePastData = document.getElementById('includePastData')
includePastData.addEventListener('click', ()=> {
        const pastDataButton = document.getElementById('copyPastData')
    if (includePastData.checked === true) {
    console.log('it was checked')
    pastDataButton.classList.remove('notReady')
    } else if (includePastData.checked === false) {
         pastDataButton.classList.add('notReady')
    } else {}
})