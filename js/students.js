const elName = document.querySelector('.js-input-name')
const elTel = document.querySelector('.js-input-tel')
const elSurname = document.querySelector('.js-input-surname')
const elParentName = document.querySelector('.js-input-parent')
const elParentTel = document.querySelector('.js-input-parent-tel')
const elAge = document.querySelector('.js-input-age')
const elForm = document.querySelector('.js-student-form')
const elStudentTable = document.querySelector('.js-add-students-table');
const elSelectGroup = document.querySelector('.js-select-student')
const elSelect = document.querySelector('.js-input-group') 
const elSearch = document.querySelector('.search__add')
const elSearchForm = document.querySelector('.js-add-student-search-form')
// function subjectGet() {
//     fetch('http://localhost:9090/all-subject/', {
//     method:'GET',
// })
// .then((res) => res.json())
// .then((data) => {
//     data.data.forEach((item) => {
//         const newOpt = document.createElement('option');
//         newOpt.textContent = item.subject_name;
//         newOpt.value = item.id
//         elSelect.append(newOpt)
//     },data.data.sort((a, b) => b.id - a.id))
// })
// }
// subjectGet()

let count = 1;


elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valueName = elName.value
    const valueTel = elTel.value.trim();
    const valueSurname = elSurname.value.trim();
    const valueParentName = elParentName.value.trim();
    const valueParentTel = elParentTel.value.trim();
    const valueAge = elAge.value.trim();
    
    
    if (valueName.length < 2 || valueName.length > 30 ) {
        alert('Iltimos Ism kiriting!');
        return;
    }
    else if(!isNaN(valueName)) {
        alert('Iltimos Ism kiriting!');
        return;
    }
    else if(valueSurname.length < 2 || valueSurname.length > 30) {
        alert('Iltimos Familya kiriting!');
        return;
    }
    else if(!isNaN(valueSurname)) {
        alert('Iltimos Familya kiriting!');
        return;
    }
    else if(valueParentName.length < 2 || valueParentName.length > 30) {
        alert('Harflar uzunligi 2 tadan 30 tagacha bulishi lozim!');
        return;
    }
    else if(!isNaN(valueParentName)) {
        alert('Harflar uzunligi 2 tadan 30 tagacha bulishi lozim!');
        return;
    }
    else if(valueAge < 5 || valueAge > 150) {
        alert('Yosh chegarasi 5 yoshdan 150 yoshgacha!');
        return;
    }
    
    function studentCreate(first_name,last_name,age,phone_number,parent_name, parent_phone_number,) {
        fetch('http://localhost:9090/student/create', {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name":last_name,
            "age":age,
            "phone_number":phone_number,
            "parent_name":parent_name,
            "parent_phone_number":parent_phone_number,
            "group_id":1,
        })
    }).then((res) => res).then((data) => data)
}
studentCreate(valueName,valueSurname,valueAge,valueTel,valueParentName,valueParentTel)

})

function studentAll() {
    fetch('http://localhost:9090/all-student/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    // console.log(data)
    data.data.forEach((item) => {
        // console.log(item)
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <th scope="row">${count++}</th>
        <td>${item.first_name + ' ' + item.last_name}</td>
        <td>${item.phone_number}</td>
        <td>${item.groups.group_name}</td> 
        <td>${item.parent_name}</td>
        <td>${item.parent_phone_number}</td>
        <td scope="col" class="d-flex gap-4 justify-content-end ">
        <button class="edit-btn-teacher" data-id ='${item.id}' ></button>
        <button class="delete-btn-teacher" data-id ='${item.id}'></button>
        </td>
        `;
        elStudentTable.append(newRow)
    },data.data.sort((a, b) => b.id - a.id))
})
}
studentAll()

elStudentTable.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('edit-btn-teacher')) {
        const row = target.closest('tr');
        const name = row.querySelector('td:nth-child(2)'); 
        const phone_number = row.querySelector('td:nth-child(3)'); 
        let editedName = prompt('Tahrirlash, Ism :', name.textContent.trim());
        let editedNumber = prompt('Tahrirlash, Raqam :', phone_number.textContent.trim());
        const id = target.dataset.id; 
        editStudent(id,editedName,editedNumber,null)
        if (editedName !== null) {
            name.textContent = editedName;
        } else if (editedNumber !== null) {
            phone_number.textContent = editedNumber;
        }
        
    }
    else if (target.classList.contains('delete-btn-teacher')) {
        const row = target.closest('tr');
        const id = target.dataset.id; 
        deleteStudent(id);
        elStudentTable.removeChild(row);
    }
    
});

function deleteStudent(id) {
    fetch(`http://localhost:9090/student/delete/${id}`, {
    method: 'DELETE', 
    headers: {
        'Content-Type' : "application/json"
    },
})
.then((res) => res.json())
.then((data) => {
    
    data.id
})

}
function editStudent(id, first_name , last_name, phone_number) {
    fetch(`http://localhost:9090/student/update/${id}`, {
    method: 'PUT', 
    headers: {
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        'first_name':first_name,
        "last_name": last_name,
        'phone_number' : phone_number 
    })
})
.then((res) => res.json())
.then((data) => {
    
    data.id
})
}


function optCreate() {
    fetch('http://localhost:9090/all-group/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        let newOpt = document.createElement('option')
        newOpt.textContent = item.group_name
        newOpt.value = item.id
        elSelectGroup.appendChild(newOpt)
    })
})
}
optCreate()

// function studentSearch(name) {
//     fetch(`http://localhost:9090/all-student?name=${name}`, {
//     method:'GET',
// })
// .then((res) => res.json())
// .then((data) => {
//     console.log(data.data);
//     data.data.filter((item) => {
//         console.log(item)
//         if(name == item.first_name.toLowerCase().trim()) {
//             item
//         }
//     })
// })
// }

// elSearch.addEventListener('keyup', (evt) => {
//     evt.preventDefault();
//     let value = elSearch.value.trim();
//     studentSearch(value)
// })
