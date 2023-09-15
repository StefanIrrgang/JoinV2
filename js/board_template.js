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