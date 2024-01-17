const elSelect = document.querySelector('.js-input-group') 
const elSelectWeek = document.querySelector('.js-input-day')
const elSelectTeacher = document.querySelector('.js-input-teacher')
const elList = document.querySelector('.js-list')
const elForm = document.querySelector('.js-student-form')

function subjectGet() {
    fetch('http://localhost:9090/all-subject/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        const newOpt = document.createElement('option');
        newOpt.textContent = item.subject_name;
        newOpt.value = item.id
        elSelect.append(newOpt)
    },data.data.sort((a, b) => b.id - a.id))
})
}
subjectGet()

function selectWeek() {
    fetch('http://localhost:9090/all-week', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        const newOpt = document.createElement('option');
        newOpt.textContent = item.week_name;
        newOpt.value = item.id
        elSelectWeek.append(newOpt)
    })
})
}
selectWeek()


fetch('http://localhost:9090/all-teacher', {
method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        const newOpt = document.createElement('option')
        newOpt.value = item.id;
        newOpt.textContent = item.first_name + " " + item.last_name;
        elSelectTeacher.appendChild(newOpt)
    })
})

function createGroup(name,time_start,time_stop,subject_id,week_id,teacher_id) {
    fetch('http://localhost:9090/group/create', {
    method: "POST",
    headers: {
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        "group_name": name,
        "group_time_start" : time_start,
        "group_time_stop" : time_stop,
        "subject_id" : subject_id,
        "week_id" : week_id,
        "teacher_id" : teacher_id
    })
})
.then((res) => res).then((data) => console.log(data))
}
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let valueGroup = evt.target[0].value;
    let valueWeek = evt.target[1].value;
    let valueTimeStart = evt.target[2].value;
    let valueTeacher = evt.target[3].value;
    let valueTimeStop = evt.target[4].value;
    let valueNewName = evt.target[5].value;
    
    createGroup(valueNewName,valueTimeStart,valueTimeStop,valueGroup,valueWeek,valueTeacher)
    
})


function getGroup() {
    fetch('http://localhost:9090/all-group', {
    method: 'GET',
}).then((res) => res.json()).then((data) => {
    console.log(data);
    data.data.forEach((item) => {
        console.log(item);
        const liElement = document.createElement('li')
        liElement.classList.add('item__group','flex-wrap','list__group-had')
        liElement.innerHTML = `
        <h3 class="list__group-title m-0 text-center py-3 js-title">
        ${item.subjects.subject_name}
        </h3>
        <div class="item__inner">
        <div class="d-flex justify-content-between mb-4 ">
        <img class="item__group-img" src="${item.teachers.img}"></img>
        <ul class="list__item list-unstyled justify-content-center gap-3 d-flex flex-column ">
        <li class="list__item-item d-flex gap-3 align-items-center ">
        <strong class="item__head">O’qituvchi:</strong>
        <p class="item__text js-name" id="js_name" >${item.teachers.first_name + " " + item.teachers.last_name}</p>
        </li>
        <li class="list__item-item d-flex gap-2 align-items-center ">
        <strong class="item__head">Tel raqam:</strong>
        <p class="item__text js-tel"> ${item.teachers.phone_number}</p>
        </li>
        </ul>
        </div>
        <ul class="d-flex list-unstyled flex-wrap gap-3">
        <li class="d-flex justify-content-between w-100 ">
        <strong>Dars kunlari:</strong>
        <p class="item__text js-week">${item.weeks.week_name}</p>
        </li>
        <li class="d-flex w-100 ">
        <strong class="me-auto">Dars vaqti:</strong>
        <p class="item__text js-time" id="js_start">${item.group_time_start + "-"}</p>
        <p class="item__text js-time" id="js_stop">${item.group_time_stop}</p>
        </li>
        <li class="d-flex justify-content-between w-100 ">
        <strong>O’quvchilar soni</strong>
        <p class="item__text js-count">${item.students.length}</p>
        </li>
        </ul>
        <div class="d-flex gap-3 mt-3">
        <button class="btn btn-warning edit-btn w-50" data-id =${item.id}>EDIT</button>
        <button class="btn btn-danger delete-btn w-50 " data-id =${item.id}>DELETE</button>
        </div>
        </div>`
        elList.appendChild(liElement)
    })
})
}
getGroup()

elList.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('edit-btn')) {
        let editedName = prompt('Tahrirlash, Ism :', js_name.textContent.trim());
        let editedStart = prompt('Tahrirlash, Start :', js_start.textContent.trim());
        let editedStop = prompt('Tahrirlash, Stop :', js_stop.textContent.trim());
        const id = target.dataset.id; 
        editGroup(id,editedName,editedStart,editedStop)
        if (editedName !== null) {
            js_name.textContent = editedName;
        }
    }
    else if (target.classList.contains('delete-btn')) {
        const id = target.dataset.id; 
        deleteGroup(id);
    }
    
});

function deleteGroup(id) {
    fetch(`http://localhost:9090/group/delete/${id}`, {
    method: 'DELETE', 
    headers: {
        'Content-Type' : "application/json"
    },
})
.then((res) => res.json())
.then((data) => {
    
    console.log(data.id)
})

}
function editGroup(id, name , start, stop) {
    fetch(`http://localhost:9090/group/update/${id}`, {
    method: 'PUT', 
    headers: {
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        "group_name":name,
        "group_time_start":start,
        "group_time_stop":stop,
    })
})
.then((res) => res.json())
.then((data) => {
    
    console.log(data.id)
})
}