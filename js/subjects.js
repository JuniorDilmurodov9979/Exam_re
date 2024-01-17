let subjectTable = document.querySelector('.js-table-subject')
let subjectAddWrapper = document.querySelector('.subject-add-js')
let count = 1;

function subject(name) {
    fetch('http://localhost:9090/subject/create', {
    method:'POST',
    headers: {
        'Content-Type' : "application/json"
    },
    body: JSON.stringify({
        "subject_name": name
    }),
})
.then((res) => res.json())
.then((data) => {
    console.log(data)
    
    window.location.reload()
})
}

function subjectGet() {
    fetch('http://localhost:9090/all-subject/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    data.data.forEach((item) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <th scope="row">${count++}</th>
        <td>${item.subject_name}</td>
        <td></td>
        <th scope="col" class="d-flex gap-4 justify-content-end ">
        <button class="edit-btn-subjects" data-id ='${item.id}' ></button>
        <button class="delete-btn-subjects" data-id ='${item.id}'></button>
        </th>
        `;
        subjectTable.append(newRow)
    },data.data.sort((a, b) => b.id - a.id))
})
}
subjectGet()


subjectTable.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('edit-btn-subjects')) {
        const row = target.closest('tr');
        const nameCell = row.querySelector('td:nth-child(2)'); 
        let editedValue = prompt('Tahrirlash :', nameCell.textContent.trim());
        const id = target.dataset.id; 
        editSubjects(id)
        if (editedValue !== null) {
            nameCell.textContent = editedValue;
        }
    }
    else if (target.classList.contains('delete-btn-subjects')) {
        const row = target.closest('tr');
        const id = target.dataset.id; 
        deleteSubjects(id);
        subjectTable.removeChild(row);
        window.location.reload()
    }
    
});

function deleteSubjects(id) {
    fetch(`http://localhost:9090/subject/delete/${id}`, {
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
function editSubjects(id) {
    fetch(`http://localhost:9090/subject/update/${id}`, {
    method: 'PUT', 
    headers: {
        'Content-Type' : "application/json"
    },
})
.then((res) => res.json())
.then((data) => {
    
    console.log(data.id)
})
}

const elSubjectForm = document.querySelector('.subjects__form') 
elSubjectForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    inputValue = fan_nomi.value.trim();
    subject(inputValue)
})