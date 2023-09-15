let checkedSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<mask id="mask0_75029_4578" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
<rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_75029_4578)">
<path d="M9.54996 15.65L18.025 7.175C18.225 6.975 18.4625 6.875 18.7375 6.875C19.0125 6.875 19.25 6.975 19.45 7.175C19.65 7.375 19.75 7.6125 19.75 7.8875C19.75 8.1625 19.65 8.4 19.45 8.6L10.25 17.8C10.05 18 9.81663 18.1 9.54996 18.1C9.2833 18.1 9.04996 18 8.84996 17.8L4.54996 13.5C4.34996 13.3 4.25413 13.0625 4.26246 12.7875C4.2708 12.5125 4.37496 12.275 4.57496 12.075C4.77496 11.875 5.01246 11.775 5.28746 11.775C5.56246 11.775 5.79996 11.875 5.99996 12.075L9.54996 15.65Z" fill="#2A3647"/>
</g>
</svg>`;
let smallXSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
let upArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" transform="rotate(180)">
<mask id="mask0_77977_799" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" >
<rect width="24" height="24" fill="#D9D9D9" />
</mask>
<g mask="url(#mask0_77977_799)">
<path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
</g>
</svg>`;
let downArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_77977_799" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" >
<rect width="24" height="24" fill="#D9D9D9" />
</mask>
<g mask="url(#mask0_77977_799)">
<path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
</g>
</svg>`;

function renderOpenCategoryInputMainContainer() {
    return `
    <h5>Category</h5>
    <div class="add-category-container">
       <input class="added-category-name" id="added_category_name" type="text" placeholder="New category name">
       <button class="close-category-input-btn" onclick="closeCategoryInput()">${smallXSVG}</button>
       <svg height="40" width="3"> <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" /> </svg>
       <button class="add-category-btn" onclick="addCategory()">${checkedSmallSVG}</button>
    </div>
    <div class="selectable-category-colors" id="selectable_category_colors"> </div>
    `
}

function renderSelectedCategory() {
    return `
    <h5>Category</h5>
    <div class="selectContainer" id="addCategory" onclick="openCategoryDropDown()">
        <div class="category-selection">${element['name']} 
            <svg class="new-category-color">
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element['color']}" />
            </svg>
        </div>
    </div>`
}

function renderSelectableCategoryColorsMainDiv() {
    return `
    <div class="selected-category-color" id="${element}" onclick="selectedCategoryColor('${element}')">
        <svg class="new-category-color">
        <circle id="circle_${element}" cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element}" />
        </svg>
    </div>`
}

function renderGenerateOpenAddContactMainContainerDiv() {
    return `<h5>Assigned to</h5>
    <input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="closeDropdownContact()"> </input>
    <div class="contacts_list_add_task" id="addContact"></div>`
}

function renderGenerateUnselectedContact(j, element) {
    return `
    <div class="add-task-contact" id="addTaskContact_${j}" onclick="selectedContact(${j})">
        <div class="frame_212">
            <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>    
            <div class="add-task-contact-name">
                ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
            </div>
        </div>
        <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})"></div>
    </div>`
}

function RenderGenerateSelectedContact() {
    return `
    <div class="add-task-contact col_2A3647" id="addTaskContact_${j}" onclick="selectedContact(${j})">
        <div class="frame_212">
            <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>    
            <div class="add-task-contact-name">
                ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
            </div>
        </div>
        <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})" checked></div>
    </div>`
}

function RenderCloseDropdownContactHTML() {
    return `<h5>Assigned to</h5>
    <input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="openDropdownContact()">
        </input>`
}

function RenderAddedContactsNameTagsMain(p) {
    return `
    <div class="added-contact-name-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="60" fill="${nameTagsColors[p]}"/>
            </svg>
            <p>${firstTwoLetters}</p>
    </div>
    `
}

function RenderaddSubtaskContainerHTML() {
    return `
    <input type="text" placeholder="New subtask" id="added_subtask">
    <button class="close-category-input-btn" onclick="cancelSubtaskInput()">${smallXSVG}</button>
    <svg height="40" width="3">
        <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
    </svg>
    <button class="add-category-btn" onclick="addSubtask()">${checkedSmallSVG}</button>
    `
}

function RenderCancelSubtaskInputHTML() {
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
}

function RenderAddSubtaskHTML() {
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
}

function RenderSubtaskMainHTML() {
    return `<div class="boxes">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 18 17" fill="none">
        <rect x="1" y="0.5" width="16" height="16" rx="3"
            fill="url(#paint0_linear_71853_3184)" stroke="black" />
        <defs>
            <linearGradient id="paint0_linear_71853_3184" x1="9" y1="0.5" x2="9"
                y2="16.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F9F9F9" />
                <stop offset="1" stop-color="#F0F0F0" />
            </linearGradient>
        </defs>
    </svg>${addedSubtaskNameInput}
</div>`
}