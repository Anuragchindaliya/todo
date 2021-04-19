showtask();

document.addEventListener("keydown",function(e){
    if(e.keyCode==46){
        deleteallbtn.click();
    }
    
})

let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
enterkey=true;
// Add button will work on click of keyborad enter key
addtaskinput.addEventListener("keyup", function(event) {
    let savevalue = document.getElementById("saveindex");
    if (event.keyCode === 13) {
        event.preventDefault();
        if(enterkey==true){
            
            addtaskbtn.click();
        }else{
            savetaskbtn.click();
        }
    }
  });


// addbtn functionality
addtaskbtn.addEventListener("click", function () {
    //global variable we dont use var let const
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            // create an Array
            taskobj = [];
        }
        else {
            //use parse while getting values from localstorage
            taskobj = JSON.parse(webtask);
        }
        // converting first letter to uppercase
        // addtaskinputval=addtaskinputval.charAt(0).toUpperCase()+addtaskinputval.slice(1);
        addtaskinputval = addtaskinputval.replace(/^./, addtaskinputval[0].toUpperCase());

        //add input value to taskobj array with push function
        //array.push(item1, item2, ..., itemX)
        taskobj.push({ 'task_name': addtaskinputval, 'completeStatus': false, 'time': Date() });
        // use stringify while putting values to localstorage
        localStorage.setItem("localtask", JSON.stringify(taskobj));
    }
    addtaskinput.value = '';
    
    showtask();
})



function showtask() {
    let webtask = localStorage.getItem('localtask');
    let html = '';
    if (webtask == null) {
        taskobj = [];
    }
    else {
        taskobj = JSON.parse(webtask);
    }
    
    let addedtasklist = document.getElementById('addedtasklist');

    taskobj.forEach((item, index) => {
        // item.task_name = item.task_name.replace(/^./, item.task_name[0].toUpperCase());
        if (item.completeStatus == true) {
            completeTD = `<td class="completed">${item.task_name}</td>`;
            completeBtn=`<button type="button" class="text-success fa fa-check-square" style="font-size:20px" id="${index}" title="completed"><span class="d-md-inline-block" style=" display:none;font-family:'roboto',sans-serif;font-size:15px">Done</span></button>`;
        } else {
            completeTD = `<td>${item.task_name}</td>`;
            completeBtn=`<button type="button" class="text-success fa fa-check-square-o"  style="color:#007bff!important; font-size:20px" id="${index}" title="complete"><span class="d-md-inline-block" style=" display:none;font-family:'roboto',sans-serif;font-size:15px">To go</span></button>`;
        }
        html += `<tr>
        <td scope="row">${index + 1}</td>
        ${completeTD}
        <td style="color:#8c8383; font-size:12px;">${timeAgo(item.time)}</td>
        <td>${completeBtn}</td>
        <td><button type="button" onclick="edittask(${index})" class="text-primary" title="Edit"><i class="fa fa-edit"></i></button></td>
        <td><button type="button" onclick="deleteitem(${index})" class="text-danger" title="Delete" accesskey="delete"><i class="fa fa-trash"></i></button></td>
    </tr>`;
        index++;
        document.getElementById("addtaskinput").placeholder=`Enter your ${index+1} task`;
    });
    
    addedtasklist.innerHTML = html;
    
}


function edittask(index) {
    let saveindex = document.getElementById('saveindex');
    saveindex.value = index;
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    let addtaskinput = document.getElementById("addtaskinput");
    addtaskinput.value = taskobj[index]['task_name'];

    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "inline-block";
    enterkey = false;

}





//save task
let savetaskbtn = document.getElementById('savetaskbtn');
savetaskbtn.addEventListener('click', function () {
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById('saveindex').value;
    let addtaskinputval =document.getElementById('addtaskinput').value;

    if (addtaskinputval.length == 0) {
        alert("Please enter task name\n\n▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬");
    } else {
        addtaskinputval = addtaskinputval.replace(/^./, addtaskinputval[0].toUpperCase());
        taskobj[saveindex]['task_name'] = addtaskinputval;
        taskobj[saveindex]['time'] = Date();
        // taskObj[mytargetid].completeStatus = false;
        localStorage.setItem('localtask', JSON.stringify(taskobj));
    }
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    addtaskbtn.style.display = "inline-block";
    savetaskbtn.style.display = "none";
    addtaskinput.value = '';
    enterkey=true;
    showtask();
})

//delelte task
function deleteitem(index) {
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    // array.splice(index, howmany, item1, ....., itemX)
    taskobj.splice(index, 1);
    if(taskobj.size==null){
        document.getElementById("addtaskinput").placeholder=`Enter your first task`;
    }
    localStorage.setItem('localtask', JSON.stringify(taskobj));

    showtask();
}

// deleteallbtn
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    localStorage.clear();
    showtask();
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    addtaskbtn.style.display = "inline-block";
    savetaskbtn.style.display = "none";
    document.getElementById("addtaskinput").placeholder=`Enter your first task`;

})

// searchtextbox searching
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function (item) {
        let trvalue = item.getElementsByTagName("td")[1].innerText;
        let searching = searchtextbox.value;
        let re = new RegExp(searching, 'gi');
        if (trvalue.match(re)) {
            item.style.display = "table-row";
        }
        else {
            item.style.display = "none";
        }
    })
})


// //compelte task status
// let addedtasklist = document.getElementById("addedtasklist");
// addedtasklist.addEventListener("click",function(e){
//     // console.log(e);

//     let mytarget =e.target;
//     if(mytarget.classList[0]==="text-success"){
//         let mytargetid= mytarget.getAttribute('id');
//         console.log(mytarget);

//         mytargetprevsibling=mytarget.parentElement.previousElementSibling.previousElementSibling;
//         console.log(mytargetprevsibling);
//         let webtask = localStorage.getItem('local');
//         let taskobj = JSON.parse(webtask);
//         for(keys in taskobj[mytargetid]){
//             if(keys=='completeStatus' && taskobj[mytaskid][keys]==true){
//                 taskobj[mytargetid].completeStatus=false;
//             }else if(keys =='completeStatus' && taskobj[mytargetid][keys]==false){
//                 taskobj[mytargetid].completeStatus=true;
//             }
//         }
//         localStorage.setItem('local',JSON.stringify(taskobj));
//     }
// })







// complete task
let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function (e) {
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let mytarget = e.target;
    if (mytarget.classList[0] === 'text-success') {
        let mytargetid = mytarget.getAttribute("id");

        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;

        for (keys in taskObj[mytargetid]) {
            if (keys == 'completeStatus' && taskObj[mytargetid][keys] == true) {
                taskObj[mytargetid].completeStatus = false;

            } else if (keys == 'completeStatus' && taskObj[mytargetid][keys] == false) {
                taskObj[mytargetid].completeStatus = true;

            }
        }

        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
})





//time time
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    // const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.toLocaleTimeString();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}


// --- Main function
function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}