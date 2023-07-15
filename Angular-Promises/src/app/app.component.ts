import { Component, OnInit } from '@angular/core';
import { StudentModel } from "./models/student";
import { FormsModule, FormBuilder } from '@angular/forms';
import { StudentService } from './services/student.service';
import { HttpClient } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: StudentService, private fb: FormBuilder)
   {

   }

studentArray!: StudentModel[]
selectedStudent: StudentModel = new StudentModel();

ngOnInit(): void {
  this.getAll();
}

getAll() {
  this.loginService.getAllStudents().subscribe( response => {
    this.studentArray = response as StudentModel[];
  })
}

submitStudent(toAddStudent: StudentModel) {
  this.loginService.addStudent(toAddStudent).subscribe(response => {
    console.log(response);
    this.getAll();
  }, error => {
    console.error(error);
  });
}

changeStudent(toModifyStudent: StudentModel) {
  this.loginService.modifyStudent(toModifyStudent).subscribe(response => {
    console.log(response);
    this.getAll();
  }, error => {
    console.error(error.error);
  });
}

deleteRequest(toDeleteId: number) {
  this.loginService.deleteStudent(toDeleteId).subscribe(response => {
    console.log(response);
    this.getAll();
  }, error => {
    console.error(error);
  });
}

add() {
  this.submitStudent(this.selectedStudent);
  this.deselect();
}

edit() {
  this.changeStudent(this.selectedStudent)
  this.deselect();
}

deselect() {
  this.selectedStudent = new StudentModel();
}

openForEdit(student: StudentModel) {
  this.selectedStudent = student;
}

deleteFromForm() {
  if(confirm('Estas seguro de querer eliminar al estudiante?')) {
    this.deleteRequest(this.selectedStudent.id);
  this.deselect();
  }
}
}
