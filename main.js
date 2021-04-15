showtask();

let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

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
        //add input value to taskobj array with push function
        //array.push(item1, item2, ..., itemX)
        taskobj.push(addtaskinputval);
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
        html += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${item}</td>
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
    addtaskinput.value = taskobj[index];

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


//compelte task status
let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click",function(e){
    // console.log(e);

    let mytarget =e.target;
    if(mytarget.classList[0]==="text-success"){
        let mytargetid= mytarget.getAttribute('id');
        console.log(mytargetid);
    }
})

