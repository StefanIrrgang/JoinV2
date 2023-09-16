let cards = [];
let categories = [];
let categoryColors = ['#FFC701', '#1FD7C1', '#0038FF', '#FF7A00', '#FF0000', '#E200BE'];
let listTypes = [{
    name: "ToDo",
    amount: 0,
    },
    {
    name: "InProgress",
    amount: 0,
    },
    {
    name: "Awaitingfeedback",
    amount: 0,
    },
    {
    name: "Done",
    amount: 0,
    }
];
let currentListType = "";
let currentDraggedElement;
let prioValue;

/**
 * svg graphics which shows arrows for mobile view to move cards to other status
 */
let svgArrowRight = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="10" ry="10" fill="#D3D3D3" />
<path d="M2 8L12 8M12 8L8 4M12 8L8 12" stroke="#696969" stroke-width="2" />
</svg>`;
let svgArrowLeft = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="10" ry="10" fill="#D3D3D3" />
<path d="M14 8L4 8M4 8L8 4M4 8L8 12" stroke="#696969" stroke-width="2" />
</svg>
`;

/**
 * HTML temnplate for render functions
 * @param {number} i 
 * @returns html content
 */
function renderBoardTemplate(i) {
    return `<div class="cardBoard" draggable="true" id="card${i}" ondragstart="startDragging(${i})" onclick='openCard(${i})'>
    <div class="cardBoardInside">
        <div class="cardHeadMain">
        <div class="cardBoardInsideCategory"; id="cardBoardInsideCategory${i}">${cards[i]['category']}</div>
        <div class="svgImage"><div class="svgMinus90Degree" id="svgToLeft${i}" onclick="listTypeToLeft(${i})">${svgArrowLeft}</div><div class="svgPlus90Degree" id="svgToRight${i}" onclick="listTypeToRight(${i})">${svgArrowRight}</div></div>
        </div>
        <div class="cardBoardInsideTitleAndDescrption">
            <div class="cardBoardInsideTitle">${cards[i]['title']}</div>
            <div class="cardBoardInsideDescription">${cards[i]['description']}</div>
        </div>
        <div class="cardBoardInsideProgress" id="cardBoardInsideProgress${i}"><div class="progressBar"><div class="progress" id="progressBar${i}"></div></div>
        <div><p>${cards[i]['progress']}/${cards[i]['subtasks'].length} Done</p></div>
        </div>
        <div class="cardBoardInsideUserAndPrio">
        <div class="InsideUser" id="InsideUser${i}"></div><img src="/assets/img/board/${cards[i]['prio']}.svg" alt="">
        </div>
    </div>
</div>`;
}

/**
 * Render the current prio state of card
 */
function renderPrioState(i) {
    return `
    <div class="addTaskPrios" id="prioButtons2">
                                    <button class="SubTaskPrios2 red" id="prioSelect0" onclick="addActiveState2(${i},0)">Urgent<img
                                            src="/assets/img/addtask/prio-high.svg" alt="" class="default"><img
                                            src="/assets/img/addtask/prio-high-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 yellow" id="prioSelect1" onclick="addActiveState2(${i},1)">Medium<img
                                        src="/assets/img/addtask/prio-medium.svg" alt="" class="default"><img
                                        src="/assets/img/addtask/prio-medium-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 green" id="prioSelect2" onclick="addActiveState2(${i},2)">Low<img
                                        src="/assets/img/addtask/prio-low.svg" alt="" class="default"><img
                                        src="/assets/img/addtask/prio-low-w.svg" alt="" class="active"></button>
                                </div>`;
}

/**
 * Render sub task mask
 */
function renderSubTaskMask(i) {
    return `
    <div class="subtask" id="subtask_main2">
        <h5>Subtasks</h5>
        <div id="addNewSubtask2" class="subtask-input">
            <p>Add new subtask</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
                <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div id="subtasklist"></div>
        <div class="checkboxes" id="added_subtasks_main">
        </div>
    </div>`;
}

function openSubtaskInput2HTML(i) {
    return `
    <input type="text" placeholder="New subtask" id="added_subtask">
    <button class="close-category-input-btn" onclick="cancelSubtaskInput2()">${smallXSVG}</button>
    <svg height="40" width="3">
        <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
    </svg>
    <button class="add-category-btn" onclick="addSubtask2(${i})">${checkedSmallSVG}</button>
    `
}

function cancelSubtaskInput2HTML() {
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
}

function addSubtask2HTML() {
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
}

function loadAssignedUserToFormHTML(i, p) {
    return `
    <div class="addusertocard" onclick="addUser(${i}, ${p})" id="addusercard${p}">
    <div class="label-card" style="background-color:${nameTagsColors[p]}">${Contacts[p]['firstLetters']}</div>
    <div class="card-name" id="contactsname${i}${p}">${Contacts[p]['name']}</div>
    <img src="assets/img/board/checkbox-unchecked.svg" class="usercheckb default" id="userchecked${p}">
    <img src="assets/img/board/checkbox-checked.svg" class="usercheckb hover"></div>`
}

/**
 * render assigned user icon with initials in card
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoard(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUser${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>`;
    }
}

/**
 * render assigned user full name in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserFullName(i) {
    const currentUserNumber = parseInt(currentUser);
    for (let j = 0; j < cards[i]['assignedUserFullName'].length; j++) {
        if (currentUser < Contacts.length) {
            if (cards[i]['assignedUserFullName'][j] == Contacts[currentUserNumber]['name']) {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]} (You)</div>`;
            } else {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>`;
            }
        } else {
            document.getElementById(`InsideUserFullName${i}`).innerHTML += `
        <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>`;
        }
    }
}

/**
 * render 'no cards in board' placeholder for all columns
 */
function renderNoCardsInCardBoard() {
    for (let k = 0; k < listTypes.length; k++) {
        if (listTypes[k]['amount'] == 0) {
            document.getElementById(`cardBoard${listTypes[k]['name']}`).innerHTML += `
            <div class="NoCardsInBoardPlaceholder">No tasks in ${listTypes[k]['name']}</div>
            `;
        }
    }
}

/**
 * clear all columns in board
 */
function clearBoardCards() {
    document.getElementById('cardBoardToDo').innerHTML = '';
    document.getElementById('cardBoardInProgress').innerHTML = '';
    document.getElementById('cardBoardAwaitingfeedback').innerHTML = '';
    document.getElementById('cardBoardDone').innerHTML = '';
}

/**
 * open addTask overlay in board
 */
function openAddTask(i) {
    const screenWidth = window.innerWidth;
    currentListType = `${i}`;
    if (screenWidth < 993) {
        document.getElementById('mobileAddTask').innerHTML = `<div class="includeTaskForm" w3-include-html="templates/task_form2.html"></div>`;
        main();
        includeTemplates();
    } else {
        document.getElementById('CardContainer').style = "display:block;";
        document.getElementById('overlay').classList.remove('d-none');
        main();
    }
}

/**
 * render assigned user in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoardDetail(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUserDetail${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>`;
    }
}

/**
 * render subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function renderSubtasksInBoardDetail(i) {
    if (cards[i]['subtasks'].length > 0) {
        for (let j = 0; j < cards[i]['subtasks'].length; j++) {
            document.getElementById(`cardDetailSubTasks${i}`).innerHTML += `
                <div id="SubTaskHead${j}" class="subtaskAndCheckbox"><input class="SubTaskCheckbox" id="SubTaskCheckbox${i}${j}"
                ${cards[i]['subtasks'][j]['status']} type="checkbox" onclick="ChangeCheckboxSubtasks(${i},${j})">
                <div class="label-subtask">${cards[i]['subtasks'][j]['nameSub']}</div></div>`;
        }
    } else {
        subHead = document.getElementById(`SubtaskHeader${i}`);
        subHead.classList.add('d-none');
    }
}

/**
 * edit card function in card detailed view
 * @param {number} i - index of the Cards array
 */
function editCard(i) {
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:block;";
    document.getElementById('editCardTitle').value = `${cards[i]['title']}`;
    document.getElementById('editCardDescription').value = `${cards[i]['description']}`;
    document.getElementById('editCardDueDate').value = `${cards[i]['dueDate']}`;
    document.getElementById('editCardPrio2').innerHTML = renderPrioState(i);
    document.getElementById('editCardSubtasks').innerHTML = renderSubTaskMask(i);
    let addUserInput = document.getElementById('selectbox');
    addUserInput.innerHTML = `<input type="text" placeholder="Select Contacts to assign" id="inputassigneduser" onclick="openDropdownContact2(${i})" onkeyup="openDropdownSearch(${i})">`;
    let editCardSave = document.getElementById('editCardSave');
    editCardSave.innerHTML = `<div onclick='saveEditedCard(${[i]})'>Ok`;
    loadActiveStatePrio(i);
    loadSubtasksEditform(i);
    loadAssignedUserEditForm(i);
}

/**
 * load form to edit subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function loadSubtasksEditform(i) {
    let subtaskMain = document.getElementById('subtasklist');
    subtaskMain.innerHTML = '';
    for (let b = 0; b < cards[i]['subtasks'].length; b++) {
        subtaskMain.innerHTML += `<div class="boxes" id="boxes${b}">• ${cards[i]['subtasks'][b].nameSub}<div class="actionlinks">
        <a href="#" onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg">
        </a><a href="#" onclick="deleteEditedSubtasks(${i},${b})" class="subTaskDel">
        <img src="assets/img/board/trash-icon.svg"></a></div></div>`;
    }
}

/**
 * edit subtasks in form 
 * @param {number} i - index of the Cards array
 * @param {number*} b - index of subtask in Cards JSON
 */
function editLoadedSubtasks(i, b) {
    let editSubtaskInput = document.getElementById(`subtasklist`);
    editSubtaskInput.innerHTML = `<input type="text" id='inputEditTask${b}'><div class="editactionlinks" style="display:none;" id="editsubtaskbtn">
    <a href="#" onclick="cancelEditedSubtask(${i},${b})" class="subdellink"><img src="assets/img/board/trash-icon.svg">
    </a><a href="#" onclick="saveEditedSubtask(${i},${b})" class="subedilink"><img src="assets/img/board/check-icon.svg"></a></div>`;
    document.getElementById('editsubtaskbtn').style.display = "flex";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    editSubtaskInputValue.value = `${cards[i]['subtasks'][b].nameSub}`;
}

/**
 * open subtask input form
 * @param {number} i - index of subtask in Cards JSON
 */
function openSubtaskInput2(i) {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += openSubtaskInput2HTML(i);
}

/**
 * add new subtask to card in edit card view
 * @param {number} i - index of the Cards array
 */
function addSubtask2(i) {
    let subtaskMain = document.getElementById('subtasklist');
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    let addedSubtask = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = addSubtask2HTML();
    subtaskMain.innerHTML += `<div class="boxes" id="boxes${b}">• ${addedSubtask}<div class="actionlinks">
    <a href="#" onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg">
    </a><a href="#" onclick="deleteEditedSubtasks(${i},${b})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg">
    </a></div></div>`
    cards[i]['subtasks'].push({ nameSub: addedSubtask, status: "unchecked" });
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
}

/**
 * open card in detailed view in board
 * @param {number} i - index of the Cards array
 * @param {*} event - help function to prevent from call unwanted function
 */
function openCard(i, event) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('CardDetail').style = "display:block;";
    let cardDetailCat = document.getElementById('cardDetailCat');
    let cardDetailTitle = document.getElementById('cardDetailTitle');
    let cardDetailDesc = document.getElementById('cardDetailDesc');
    let cardDetailDueDate = document.getElementById('cardDetailDueDate');
    let cardDetailPrio = document.getElementById('cardDetailPrio');
    let cardDetailAssignedUser = document.getElementById('cardDetailAssignedUser');
    let cardDetailDelete = document.getElementById('deleteCard');
    let cardDetailEdit = document.getElementById('editCard');
    cardDetailCat.innerHTML = `<div class="cardBoardInsideCategory" id="cardBoardInsideCategoryDetail${i}">${cards[i]['category']}</div>`;
    cardDetailTitle.innerHTML = `${cards[i]['title']}`;
    cardDetailDesc.innerHTML = `${cards[i]['description']}`;
    cardDetailDueDate.innerHTML = `<span class="detlabel">Due date:</span>${cards[i]['dueDate']}`;
    cardDetailPrio.innerHTML = `<span class="detlabel">Priority:</span><div id="priobtndetail">${cards[i]['prio']}<img id="prioImg" src=""></div>`;
    cardDetailAssignedUser.innerHTML = `<div class="cardBoardInsideUserAndPrio FullNameSplit"><div class="InsideUser" id="InsideUserDetail${i}"></div><div id=InsideUserFullName${i}></div></div><div class="cardDetailSubtasksAll"><div class="detlabel" id="SubtaskHeader${i}">Subtasks:</div><div class="cardDetailSubTasks" id="cardDetailSubTasks${i}"></div></div>`;
    cardDetailDelete.innerHTML = `<div onclick='deleteCard(${[i]})'><img src="assets/img/board/delete.svg" class="default"><img src="assets/img/board/delete-blue.svg" class="hover">`;
    cardDetailEdit.innerHTML = `<div onclick='editCard(${[i]})'><img src="assets/img/board/edit.svg">`;
    renderCategoriesAndUser(i);
}

/**
 * Render assigned user in edit card form.
 * @param {number} i - index of the Cards array
 */
function loadAssignedUserEditForm(i) {
    let assignedUserEditForm = document.getElementById('assignedUserEditForm');
    assignedUserEditForm.innerHTML = "";
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        assignedUserEditForm.innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>`;
    }
}

/**
 * Render all ToDo cards in board
 */
async function renderBoardCards() {
    await getContactsFromStorage();
    await getCardsFromStorage();
    clearBoardCards();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i]['listType'] == 'ToDo') {
            listTypes[0]['amount']++;
            document.getElementById('cardBoardToDo').innerHTML +=
                renderBoardTemplate(i);
            renderBoardFunctionsTemplate(i);
        } else {
            renderBoardCardsInProgress(i)
        };
    } renderNoCardsInCardBoard();
}

/**
 * Render all InProgress cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsInProgress(i) {
    if (cards[i]['listType'] == 'InProgress') {
        listTypes[1]['amount']++;
        document.getElementById('cardBoardInProgress').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsAwaitingFeedback(i) };
}

/**
 * Render all AwaitingFeedback cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsAwaitingFeedback(i) {
    if (cards[i]['listType'] == 'Awaitingfeedback') {
        listTypes[2]['amount']++;
        document.getElementById('cardBoardAwaitingfeedback').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsDone(i) };
}

/**
 * render addTask overlay by loading template
 */
function renderAddTask() {
    includeTemplates();
}

/**
 * Render all Done cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsDone(i) {
    if (cards[i]['listType'] == 'Done') {
        listTypes[3]['amount']++;
        document.getElementById('cardBoardDone').innerHTML +=
            renderBoardTemplate(i);
    }
    renderBoardFunctionsTemplate(i);
}
