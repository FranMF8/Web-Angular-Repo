import { Component, OnInit, Renderer2 } from '@angular/core';
import { StudentModel } from "./models/student";
import { StudentService } from './services/student.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: StudentService, private renderer: Renderer2) {}

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
  if((toModifyStudent.dni !== 0 && toModifyStudent.dni != null) && (toModifyStudent.name !== "" && toModifyStudent.name != null) && (toModifyStudent.email !== "" && toModifyStudent.email != null))
  {
    this.loginService.modifyStudent(toModifyStudent).subscribe(response => {
      console.log(response);
      this.getAll();
    }, error => {
      console.error(error.error);
    });
  }  else {
    this.getAll()
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
  this.found = false;
}

deselectChoose(toDeselectStudent: StudentModel | undefined) {
  toDeselectStudent = new StudentModel();
  this.found = false;
}

selectStudent(student: StudentModel) {
  if(student !== this.selectedStudent) {
    this.selectedStudent = student;
    this.foundStudent = student;
    this.found = true;
  } else {
    this.deselect()
  }

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

changeFound() {
  if(this.found) {
    this.found = false;
    this.foundStudent = new StudentModel();
    this.deselect();
  } else {
    this.found = true;
  }
}

findByDNI() {
  this.foundStudent = this.studentArray.find(student => student.dni == this.toFindStudent.dni)
  if (this.foundStudent?.name && this.foundStudent !== null) {
    this.deselectChoose(this.foundStudent);
    this.found = true
  } else {
    this.found = false
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

copyDataToClipboard(student: StudentModel | undefined) {
  const clipboardData = `Nombre: ${student?.name}\nDNI: ${student?.dni}\nEmail: ${student?.email}`;

  const tempTextarea = this.renderer.createElement('textarea');
  this.renderer.setAttribute(tempTextarea, 'style', 'position: absolute; top: -9999px');
  this.renderer.appendChild(document.body, tempTextarea);

  tempTextarea.value = clipboardData;
  tempTextarea.select();
  document.execCommand('copy');

  this.renderer.removeChild(document.body, tempTextarea);

  confirm('Texto copiado');
}

copyEmails() {
  var emailsChain = "";
  this.studentArray.forEach(element => {
    if(emailsChain === "") {
      emailsChain = element.email;
    } else {
      emailsChain = emailsChain + ", " + element.email;
    }
  });
  const tempTextarea = this.renderer.createElement('textarea');
  this.renderer.setAttribute(tempTextarea, 'style', 'position: absolute; top: -9999px');
  this.renderer.appendChild(document.body, tempTextarea);

  tempTextarea.value = emailsChain;
  tempTextarea.select();
  document.execCommand('copy');

  this.renderer.removeChild(document.body, tempTextarea);

  confirm('Texto copiado');
}

}
