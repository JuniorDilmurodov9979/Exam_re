const elTableTeacher = document.querySelector('.js-teacher-table')
const elForm = document.querySelector('.js-teacher-form')
let count = 1;

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
        yunalish.append(newOpt)
    },data.data.sort((a, b) => b.id - a.id))
})
}
let formData = new FormData();

function createTeachers(data) {
    fetch('http://localhost:9090/teacher/create', {
    method: 'POST',
    headers: {},
    body: data,
})
.then((res) => res.json())
.then((data) => { console.log(data);
}) 
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formData.append('first_name', evt.target[0].value)
    formData.append('last_name',evt.target[1].value)
    formData.append('age',evt.target[4].value)
    formData.append('phone_number',evt.target[3].value)
    formData.append('subject_id',evt.target[2].value)
    formData.append('img',evt.target[5].files[0])
    
    createTeachers(formData)
})

subjectGet();

function teacherGet() {
    fetch('http://localhost:9090/all-teacher/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        console.log(item)
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <th scope="row">${count++}</th>
        <td>${item.first_name + ' ' + item.last_name}</td>
        <td>${item.phone_number}</td>
        <td>${item.subjects.subject_name}</td>
        <td>${item.age}</td>
        <td scope="col" class="d-flex gap-4 justify-content-end ">
        <button class="edit-btn-teacher" data-id ='${item.id}' ></button>
        <button class="delete-btn-teacher" data-id ='${item.id}'></button>
        </td>
        `;
        elTableTeacher.append(newRow)
    },data.data.sort((a, b) => b.id - a.id))
})
}
teacherGet()

elTableTeacher.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('edit-btn-teacher')) {
        const row = target.closest('tr');
        const name = row.querySelector('td:nth-child(2)'); 
        const age = row.querySelector('td:nth-child(5)'); 
        let editedName = prompt('Tahrirlash, Ism :', name.textContent.trim());
        let editedAge = prompt('Tahrirlash, Age :', age.textContent.trim());
        const id = target.dataset.id; 
        editTeacher(id,editedName,editedAge,null)
        if (editedName !== null) {
            name.textContent = editedName;
        } else if (editedAge !== null) {
            age.textContent = editedAge;
        }
        
    }
    else if (target.classList.contains('delete-btn-teacher')) {
        const row = target.closest('tr');
        const id = target.dataset.id; 
        deleteTeacher(id);
        elTableTeacher.removeChild(row);
    }
    
});

function deleteTeacher(id) {
    fetch(`http://localhost:9090/teacher/delete/${id}`, {
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
function editTeacher(id, first_name , age, img) {
    fetch(`http://localhost:9090/teacher/update/${id}`, {
    method: 'PUT', 
    headers: {
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        'first_name':first_name,
        "age": age,
        "img" : img 
    })
})
.then((res) => res.json())
.then((data) => {
    
    console.log(data.id)
})
}
