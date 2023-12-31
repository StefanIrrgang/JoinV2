/**
 * Render all cards in board by loading from remote storage
 */
async function renderBoard() {
    await getCardsFromStorage();
    clearAllListTypesAmount();
    renderBoardCards();
    getCategoriesFromStorage();
}
/**
 * collection of other functions which are needed when render cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardFunctionsTemplate(i) {
    renderProgressBar(i);
    renderAssignedUserInBoard(i);
    renderBackgroundColorCategory(i);
    renderListTypeArrows(i);
}
/**
 * assign the correct color of the card category by compare category of the card with category array
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategory(i) {
    let cat = cards[i]['category'];
    let catClass = document.getElementById(`cardBoardInsideCategory${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClass.style['background-color'] = categories[k]['color'];
        }
    };
}
/**
 * render progressbar in card by update the bar according to amount of subtasks and checked subtasks
 * @param {number} i - index of the Cards array
 */
function renderProgressBar(i) {
    let progressValue = cards[i]['progress'] * 100 / cards[i]['subtasks'].length;
    let progressBar = document.getElementById(`progressBar${i}`);
    if (cards[i]['subtasks'].length == 0) {
        document.getElementById(`cardBoardInsideProgress${i}`).classList.add("d-none");
    } else {
        progressBar.style.width = progressValue + '%';
    }
}
/**
 * render color of user icon according to assigned color in contacts array
 * @param {number} i - index of the Cards array
 * @param {number} j - index of assigned user in Cards JSON
 * @returns 
 */
function findUserColor(i, j) {
    for (let k = 0; k < Contacts.length; k++) {
        if (Contacts[k]['name'] == cards[i]['assignedUserFullName'][j]) {
            return `${nameTagsColors[k]}`;
        }
    }
}
/**
 * set list type 0 to clear value
 */
function clearAllListTypesAmount() {
    for (let k = 0; k < listTypes.length; k++) {
        listTypes[k]['amount'] = 0;
    }
}
/**
 * close addTask overlay in board
 */
function closeOverlay() {
    let overlayClose = document.getElementById('overlay');
    overlayClose.classList.add('overlay-close');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('d-none');
        overlayClose.classList.remove('overlay-close');
    }, 0);
    document.getElementById('CardContainer').style = "display:none;";
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:none;";
    renderBoard();
    removeDropDownClass();
}
/**
 * stop other function when multiple functions called the same time
 */
function doNotClose(event) {
    event.stopPropagation();
}
/**
 * filter cards and show or hide depending on title and description
 */
function filterCards() {
    const query = document.getElementById("inputSearchBoard").value.toLowerCase();
    const cards = document.querySelectorAll(".cardBoard");
    cards.forEach((card) => {
        const title = card.querySelector(".cardBoardInsideTitle").innerHTML.toLowerCase();
        const description = card.querySelector(".cardBoardInsideDescription").innerHTML.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
/**
 * Render Categorie and user details
 */
function renderCategoriesAndUser(i) {
    renderBackgroundColorCategoryDetail(i);
    renderAssignedUserInBoardDetail(i);
    renderAssignedUserFullName(i);
    renderSubtasksInBoardDetail(i);
    prioButtonStyle(i);
}
/**
 * render background color for category in detailed card view
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategoryDetail(i) {
    let cat = cards[i]['category'];
    let catClassDet = document.getElementById(`cardBoardInsideCategoryDetail${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClassDet.style['background-color'] = categories[k]['color'];
        }
    };
}
/**
 * help function for addTask to transfer currentListType to add task in correct column
 * @param {string} currentListType - current list type to create card to correct board column
 */
function addTaskToBoardMain(currentListType) {
    if (currentListType == "") {
        currentListType = "ToDo";
    }
    addTaskToBoard(currentListType);
}
/**
 * render arrows to transfer cards to next or previous column
 * @param {number} i - index of the Cards array
 */
function renderListTypeArrows(i) {
    if (cards[i].listType == "ToDo") {
        document.getElementById(`svgToLeft${i}`).classList.add('d-none');
    } else {
        if (cards[i].listType == 'Done') {
            document.getElementById(`svgToRight${i}`).classList.add('d-none');
        }
    }
}
/**
 * change list type of card to previous type in board
 * @param {number} i - index of the Cards array
 */
async function listTypeToLeft(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j - 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}
/**
 * change list type of card to next type in board
 * @param {number} i - index of the Cards array 
 */
async function listTypeToRight(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j + 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}
/**
 * check and uncheck subtask checkbox of card
 */
async function ChangeCheckboxSubtasks(i, j) {
    if (cards[i]['subtasks'][j]['status'] == "checked") {
        cards[i]['subtasks'][j]['status'] = "unchecked";
        cards[i]['progress']--;
    } else {
        if (cards[i]['subtasks'][j]['status'] == "unchecked") {
            cards[i]['subtasks'][j]['status'] = "checked";
            cards[i]['progress']++;
        }
    }
    await saveCardsToStorage();
    renderBoard();
}
/**
 * set style of priority button according to choosen priority
 */
function prioButtonStyle(i) {
    let prioBtnDetail = document.getElementById('priobtndetail');
    let prioBtnDetailImg = document.getElementById('prioImg');
    for (let y = 0; y < cards.length; y++) {
        prioBtnDetail.classList.remove('prio-high-btn');
        prioBtnDetail.classList.remove('prio-med-btn');
        prioBtnDetail.classList.remove('prio-low-btn');
        prioBtnDetailImg.src = "";
    };
    if (cards[i]['prio'] == "Urgent") {
        prioBtnDetail.classList.add('prio-high-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-high-w.svg";
    } else
        if (cards[i]['prio'] == "Medium" || cards[i]['prio'] == "Mid") {
            prioBtnDetail.classList.add('prio-med-btn');
            prioBtnDetailImg.src = "assets/img/addtask/prio-medium-w.svg";
        } else
            if (cards[i]['prio'] == "Low") {
                prioBtnDetail.classList.add('prio-low-btn');
                prioBtnDetailImg.src = "assets/img/addtask/prio-low-w.svg";
            }
}
/**
 * delete card from board
 * @param {number} i - index of the Cards array 
 */
async function deleteCard(i) {
    cards.splice(i, 1);
    await saveCardsToStorage();
    closeOverlay();
}
/**
 * save edited subtasks to card
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function saveEditedSubtask(i, b) {
    document.getElementById('editsubtaskbtn').style.display = "none";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    cards[i]['subtasks'][b].nameSub = editSubtaskInputValue.value;
    loadSubtasksEditform(i);
}
/**
 * cancel edit subtask
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function cancelEditedSubtask(i, b) {
    loadSubtasksEditform(i);
}
/**
 * cancel edit subtask form
 */
function cancelSubtaskInput2() {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = cancelSubtaskInput2HTML();
}
/**
 * delete subtask in edit view
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function deleteEditedSubtasks(i, b) {
    cards[i]['subtasks'].splice(b, 1);
    loadSubtasksEditform(i);
}
/**
 * load current priority state
 * @param {number} i - index of the Cards array
 */
function loadActiveStatePrio(i) {
    let currentPrioSelection = cards[i]['prio'];
    if (currentPrioSelection == "Urgent") {
        let prioSelect0 = document.getElementById('prioSelect0');
        prioSelect0.classList.add('active-state');
    } else
        if (currentPrioSelection == "Mid" || currentPrioSelection == "Medium") {
            let prioSelect1 = document.getElementById('prioSelect1');
            prioSelect1.classList.add('active-state');
        } else
            if (currentPrioSelection == "Low") {
                let prioSelect2 = document.getElementById('prioSelect2');
                prioSelect2.classList.add('active-state');
            }
}
/**
 * remove or add prio state
 * @param {number} i - index of the Cards array
 * @param {number} j - index of priority number
 */
function addActiveState2(i, j) {
    let btnsTip = document.getElementById('prioButtons2').getElementsByClassName('SubTaskPrios2');
    if (btnsTip[j].classList.contains('active-state')) {
        btnsTip[j].classList.remove('active-state');
    }
    else {
        for (let f = 0; f < btnsTip.length; f++) {
            btnsTip[f].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
    prioValueForSaving(i, j);
}
/**
 * set prio depending on value 
 * @param {*} i - index of the Cards array
 * @param {*} h - priority number value
 */
function prioValueForSaving(i, h) {
    if (h == 0) {
        prioValue = "Urgent";
    } else
        if (h == 1) {
            prioValue = "Mid";
        } else
            if (h == 2) {
                prioValue = "Low";
            }
    cards[i]['prio'] = prioValue;
}
/**
 * save edited card to board
 * @param {number} i - index of the Cards array 
 */
async function saveEditedCard(i) {
    cards[i]['title'] = document.getElementById('editCardTitle').value;
    cards[i]['description'] = document.getElementById('editCardDescription').value;
    cards[i]['dueDate'] = document.getElementById('editCardDueDate').value;
    cards.push();
    await saveCardsToStorage();
    openCard(i);
    document.getElementById('CardEditForm').style = "display:none;";
}
/**
 * drag and drop function, start dragging element 
 * @param {number} i - index of the Cards array
 */
function startDragging(i) {
    currentDraggedElement = i;
    const cardElement = document.getElementById('card' + i);
    cardElement.classList.add('dragging'); // Füge die Klasse 'dragging' hinzu
}
/**
 * allow elements to drop in area with event
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * set new list type for card after dropped in new column of board
 * @param {string} listType - name of list type
 */
async function moveTo(listType) {
    getCardsFromStorage();
    cards[currentDraggedElement]['listType'] = listType.slice(9);
    await saveCardsToStorage();
    renderBoard();
}
/**
 * open dropdown menu for contacts in board card
 * @param {number} i - index of the Cards array
 */
function openDropdownContact2(i) {
    let addContactDropdown = document.getElementById('selectuser');
    let selectBoxActivated = document.getElementById('selectbox');
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    addContactDropdown.innerHTML = "";
    if (addContactDropdown.style.display == "none") {
        addContactDropdown.style = "display: flex;";
        selectBoxActivated.classList.add('active');
    }
    else {
        addContactDropdown.style = "display: none;";
        selectBoxActivated.classList.remove('active');
    };
    showAssignedUserOfCard(i);
    openTransparentOverlay();
}
/**
 * Render assigned user in dropdown and add class
 */
function showAssignedUserOfCard(i) {
    for (let p = 0; p < Contacts.length; p++) {
        loadAssignedUserToForm(i, p);
        if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
            let addClassAssignedUser = document.getElementById(`addusercard${p}`);
            addClassAssignedUser.classList.add('added');
            let changeCheckboxImg = document.getElementById(`userchecked${p}`);
            changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
        };
    }
}
/**
 * add user to card
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function addUser(i, p) {
    let indexOfUser = cards[i]['assignedUserFullName'].indexOf(Contacts[p]['name']);
    let addClassAssignedUser = document.getElementById(`addusercard${p}`);
    let changeCheckboxImg = document.getElementById(`userchecked${p}`);
    if (indexOfUser == -1) {
        addNewUser(i, p, addClassAssignedUser, changeCheckboxImg);
    }
    else if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
        removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg);
    };
}
/**
 * Assigned user dropdown: Add selected user to card.
 */
function addNewUser(i, p, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].push(Contacts[p]['firstLetters']);
    cards[i]['assignedUserFullName'].push(Contacts[p]['name']);
    addClassAssignedUser.classList.add('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
}
/**
 * Assigned user dropdown: Remove selected user from card.
 */
function removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].splice(indexOfUser, 1);
    cards[i]['assignedUserFullName'].splice(indexOfUser, 1);
    addClassAssignedUser.classList.remove('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-unchecked.svg";
}
/**
 * open dropdown search menu 
 * @param {number} i - index of the Cards array 
 */
function openDropdownSearch(i) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: flex;";
    addContactDropdown.innerHTML = "";
    openTransparentOverlay();
    findContacts(i, findContactFormatted);
}
/**
 * Assigned user search
 */
function findContacts(i, findContactFormatted) {
    for (p = 0; p < Contacts.length; p++) {
        if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
            loadAssignedUserToForm(i, p);
            openTransparentOverlay();
            if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
                let addClassAssignedUser = document.getElementById(`addusercard${p}`);
                addClassAssignedUser.classList.add('added');
                let changeCheckboxImg = document.getElementById(`userchecked${p}`);
                changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
            };
        }
    }
}
/**
 * load assigned user to form
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function loadAssignedUserToForm(i, p) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
        addContactDropdown.innerHTML += loadAssignedUserToFormHTML(i, p);
    }
}
/**
 * Creates a transparent overlay on card
 */
function openTransparentOverlay() {
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "block";
}
/**
 * Close dropdown by click on transparent overlay
 */
function closeTransparentOverlay() {
    removeDropDownClass();
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "none";
}
/**
 * Closes the dropdown
 */
function removeDropDownClass() {
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: none;";
}