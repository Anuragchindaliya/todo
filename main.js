showtask();

let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

// Add button will work on click of keyborad enter key
addtaskinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     addtaskbtn.click();
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
        taskobj.push({'task_name':addtaskinputval,'completeStatus':false});
        // use stringify while putting values to localstorage
        localStorage.setItem("localtask", JSON.stringify(taskobj));
    }
    addtaskinput.value = '';
    showtask();
})



function showtask() {
    let webtask = localStorage.getItem('localtask');
    if (webtask == null) {
        taskobj = [];
    }
    else {
        taskobj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById('addedtasklist');
    taskobj.forEach((item, index) => {

        if(item.completeStatus==true){
            completeTD=`<td class="completed">${item.task_name}</td>`;
        }else{
            completeTD=`<td>${item.task_name}</td>`;
        }
        html += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${completeTD}</td>
        <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
        <td><button type="button" class="text-success" id="${index}"><i class="fa fa-check-square-o"></i>Complete</button></td>
        <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
    </tr>`;
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
    savetaskbtn.style.display = "block";
    
}





//save task
let savetaskbtn = document.getElementById('savetaskbtn');
savetaskbtn.addEventListener('click', function () {
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById('saveindex').value;
    
    if (addtaskinput.value.length == 0) {
        alert("Please enter task name\n\n▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬");
    }else
    {
        taskobj[saveindex] = addtaskinput.value;
        localStorage.setItem('localtask', JSON.stringify(taskobj));
    }   
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    addtaskbtn.style.display = "block";
    savetaskbtn.style.display = "none";
    addtaskinput.value = '';
    showtask();
})

//delelte task
function deleteitem(index){
    let webtask= localStorage.getItem('localtask');
    let taskobj=JSON.parse(webtask);
    // array.splice(index, howmany, item1, ....., itemX)
    taskobj.splice(index,1);
    localStorage.setItem('localtask',JSON.stringify(taskobj));
    showtask();
}

// deleteallbtn
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click",function(){
    localStorage.clear();
    showtask();
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    addtaskbtn.style.display = "block";
    savetaskbtn.style.display = "none";
})

// searchtextbox searching
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input",function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let trvalue = item.getElementsByTagName("td")[0].innerText;
        let searching =searchtextbox.value;
        let re = new RegExp(searching,'gi');
        if(trvalue.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
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
    addedtasklist.addEventListener("click", function(e){
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
        
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
        
                }
              }
        
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
    })

