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
dniFindActive: boolean = false;
buttonText: string = "🔍︎";
listButtonText: string = "▲";
toFindStudent: StudentModel = new StudentModel();
foundStudent: StudentModel | undefined;
found: boolean = false;
listVisible: boolean = false;

ngOnInit(): void {
  this.getAll();
}

getAll() {
  this.loginService.getAllStudents().subscribe( response => {
    this.studentArray = response as StudentModel[];
  })
}

submitStudent(toAddStudent: StudentModel) {

  if((toAddStudent.name != null || toAddStudent.name === "") && (toAddStudent.dni != null || toAddStudent.dni === 0) && (toAddStudent.email != null || toAddStudent.email === ""))
  {
    this.loginService.addStudent(toAddStudent).subscribe(response => {
      console.log(response);
      this.getAll();
    }, error => {
    console.error(error);
    });
  } else {
    confirm('Datos invalidos')
  }

}

changeStudent(toModifyStudent: StudentModel) {
  if(toModifyStudent != null && (toModifyStudent.name != null || toModifyStudent.name === "") && (toModifyStudent.dni != null || toModifyStudent.dni === 0) && (toModifyStudent.email != null || toModifyStudent.email === ""))
  {
    this.loginService.modifyStudent(toModifyStudent).subscribe(response => {
      console.log(response);
      this.getAll();
    }, error => {
      console.error(error.error);
    });
  }  else {
    confirm('Datos invalidos')
  }

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

deselectChoose(toDeselectStudent: StudentModel) {
  toDeselectStudent = new StudentModel();
}

selectStudent(student: StudentModel) {
  this.selectedStudent = student;
}

deleteFromForm() {
  if(confirm('Estas seguro de querer eliminar al estudiante?')) {
    this.deleteRequest(this.selectedStudent.id);
  this.deselect();
  }
}

findByDNIActivate() {
  if(!this.dniFindActive) {
    this.buttonText = "+"
  }
  else {
    this.buttonText = "🔍︎"
  }
  this.dniFindActive = !this.dniFindActive;
}

findByDNI() {
  this.foundStudent = this.studentArray.find(student => student.dni == this.toFindStudent.dni)
  if (this.foundStudent?.name && this.foundStudent !== null) {
    this.deselectChoose(this.foundStudent);
    this.found = true;
  } else {
    this.found = false;
    confirm('Estudiante no encontrado')
  }
}

showList() {

  if(this.listVisible) {
    this.listButtonText = "▲";
    this.listVisible = false;
  }
  else if(!this.listVisible) {
    this.listButtonText = "▼";
    this.listVisible = true;
  }
}

}
