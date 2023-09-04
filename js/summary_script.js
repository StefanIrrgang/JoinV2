//Conditionen für Mobile-Version
const mediaQueryMobile = window.matchMedia('(max-width: 992px)');


async function init() {
    await getContactsFromStorage();
    await getCardsFromStorage();
    welcomeMsgTime();
    welcomeMsgUser();
    addClassMobile();
    summaryTasks();
    filterCardsPrioHigh(); 
}

//Begrüßung zur aktuellen Tageszeit
function welcomeMsgTime() {
    const currenttime = new Date().getHours();
    const morningstart = 6;
    const morningend = 11;
    const daystart = 12;
    const dayend = 14;
    const afternoonstart = 15;
    const afternoonend = 17;
    const eveningstart = 18;
    const eveningend = 22;
    const nightstart = 23;
    const nightend = 24;
    const nightstart2 = 0;
    const nightend2 = 5;
    let messageTime = document.getElementById('welcomemsgtime');

    if(messageTime){
    if (currenttime >= morningstart && currenttime <= morningend) {
        messageTime.innerHTML = "Good morning";
    };
    if (currenttime >= daystart && currenttime <= dayend) {
        messageTime.innerHTML = "Good day";
    };
    if (currenttime >= afternoonstart && currenttime <= afternoonend) {
        messageTime.innerHTML = "Good afternoon";
    };
    if (currenttime >= eveningstart && currenttime <= eveningend) {
        messageTime.innerHTML = "Good evening";
    };
    if ((currenttime >= nightstart && currenttime <= nightend) || (currenttime >= nightstart2 && currenttime <= nightend2)) {
        messageTime.innerHTML = "Good night";
    };
}
}

//Begrüßung des eingeloggten Nutzers mit Namen
async function welcomeMsgUser() {
    let messageUser = await document.getElementById('welcomemsguser');
    if(messageUser){
    await getContactsFromStorage();
    if(currentUser !== 1000) {
    let user = await Contacts[currentUser].name; 
    if(currentUser || '0') {  
        messageUser.innerHTML = user;
        } 
    } else {
        messageUser.innerHTML = '';
    } 
}
}


//Fügt in der mobilen Version (nach 2 Sekunden) eine Klasse hinzu
function addClassMobile() {
    let messageContainer = document.getElementById('welcomemsg');
    if(messageContainer){
    setTimeout(function hideWelcome() {
        if (mediaQueryMobile.matches) {
            messageContainer.classList.add('remove');
            setTimeout(
                function hideContainer(){
                    console.log('hide container');
                    messageContainer.style.display = "none";
                },1000);
        }
        else {
            messageContainer.classList.remove('remove');
            messageContainer.style.display = 'flex';
        }
    }, 2000);
}
}


//Prüft bei Veränderung die Media Query Conditions
  window.addEventListener('resize', addClassMobile);


//Count tasks
function summaryTasks(){
    //all
    let allBox = document.getElementById('sum-1');
    if(allBox){
    allBox.innerHTML = `${cards.length}`;
    //progress
    let progressBox = document.getElementById('sum-2');
    const countProg = cards.filter(item => item.listType === 'InProgress').length; 
    progressBox.innerHTML = `${countProg}`;
    let awaitBox = document.getElementById('sum-3');
    const countAwait = cards.filter(item => item.listType === 'Awaitingfeedback').length; 
    awaitBox.innerHTML = `${countAwait}`;
    let prioBox = document.getElementById('sum-4');
    const countPrio = cards.filter(item => item.prio === 'Urgent').length; 
    prioBox.innerHTML = `${countPrio}`;
    let toDoBox = document.getElementById('sum-5');
    const countToDo = cards.filter(item => item.listType === 'ToDo').length; 
    toDoBox.innerHTML = `${countToDo}`;
    let doneBox = document.getElementById('sum-6');
    const countDone = cards.filter(item => item.listType === 'Done').length; 
    doneBox.innerHTML = `${countDone}`;
    }
}


let filteredPrioHigh = [];
function filterCardsPrioHigh(){
for(f=0; f<cards.length;f++){
    if (cards[f].prio == 'Urgent') {
        filteredPrioHigh.push(cards[f].dueDate);
        console.log(filteredPrioHigh);
}
};
sortCardsPrioHigh();
}

function sortCardsPrioHigh(){
    let urgentDate = new Date(filteredPrioHigh[0]);
    let urgenDateFormatted = urgentDate.toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric'});

    filteredPrioHigh.forEach(function (role) {
        role = role.replace('-','');
    });
    console.log(filteredPrioHigh);
    let upComingDeadline = document.getElementById('upcomingDeadline');
    let upComingDeadlineTitle = document.getElementById('upcomingDeadlineTitle');
    if(upComingDeadline && upComingDeadlineTitle){
    if(filteredPrioHigh.length > 0){
    upComingDeadline.innerHTML = urgenDateFormatted;
    } else {
        upComingDeadline.innerHTML = "No urgent tasks";
        upComingDeadlineTitle.innerHTML = "";
    }
}
}



