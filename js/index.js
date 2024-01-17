const elSubjectLength = document.querySelector('.subject-length')
const elTeacherLength = document.querySelector('.teacher-length')
const elGroupLength = document.querySelector('.group-length')
const elStudentLength = document.querySelector('.student-length')

function subjectAll() {
    fetch('http://localhost:9090/all-subject/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    elSubjectLength.textContent = data.data.length
})
}
subjectAll()

function teacherAll() {
    fetch('http://localhost:9090/all-teacher/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    elTeacherLength.textContent = data.data.length
})
}
teacherAll()

function groupAll() {
    fetch('http://localhost:9090/all-group/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    elGroupLength.textContent = data.data.length
})
}
groupAll()

function studentAll() {
    fetch('http://localhost:9090/all-student/', {
    method:'GET',
})
.then((res) => res.json())
.then((data) => {
    elStudentLength.textContent = data.data.length
})
}
studentAll()

