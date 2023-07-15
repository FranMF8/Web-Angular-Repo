import { StudentModel } from '../models/student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL: string = 'https://localhost:7117/api/Student/';

  constructor(private http : HttpClient) {}

  getAllStudents() {
    return this.http.get(this.URL + "getAll")
  }

  addStudent(student: StudentModel) {
    return this.http.post<any>(this.URL + "add", student);
  }

  modifyStudent(student: StudentModel) {
    return this.http.post(this.URL + "modify", student)
  }

  deleteStudent(id: number) {
    return this.http.delete(this.URL + "deleteStudent/" + id);
  }
}
