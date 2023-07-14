import { Component } from '@angular/core';
import { Student } from "./models/student";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
studentArray: Student[] = [
  {id: 1, name: 'Francisco', dni: 42590936, email: "cejita678@gmail.com"},
  {id: 2, name: 'Ana', dni: 1234556, email: "anita@gmail.com"},
  {id: 3, name: 'Ivan', dni: 123456789, email: "ivanchoFortin@gmail.com"}
]
selectedStudent: Student = new Student();

addOrEdit() {

  if(this.selectedStudent.id === 0) {
    this.selectedStudent.id = this.studentArray.length + 1;
    this.studentArray.push(this.selectedStudent);
  }

  this.selectedStudent = new Student();
}

openForEdit(student: Student) {
  this.selectedStudent = student;
}

delete() {
  if(confirm('Estas seguro de querer eliminar al estudiante?')) {
    this.studentArray = this.studentArray.filter(x => x != this.selectedStudent);
  this.selectedStudent = new Student();
  }
}
}
