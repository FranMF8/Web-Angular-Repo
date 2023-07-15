import { Component, OnInit } from '@angular/core';
import { StudentModel } from "./models/student";
import { FormsModule, FormBuilder } from '@angular/forms';
import { StudentService } from './services/student.service';
import { HttpClient } from '@angular/common/http';
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
    console.log(response); // Muestra la respuesta en la consola para verificar su contenido
    this.getAll();
  }, error => {
    console.error(error); // Muestra el error en la consola para obtener más detalles
  });
}



addOrEdit() {
  this.submitStudent(this.selectedStudent);
  this.selectedStudent = new StudentModel();
}

openForEdit(student: StudentModel) {
  this.selectedStudent = student;
  if(this.selectedStudent != null) {

  }
}

delete() {
  if(confirm('Estas seguro de querer eliminar al estudiante?')) {
    this.studentArray = this.studentArray.filter(x => x != this.selectedStudent);
  this.selectedStudent = new StudentModel();
  }
}
}
