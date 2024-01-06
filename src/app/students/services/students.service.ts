import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}

  getStudents(): Observable<any> {
    return this._HttpClient.get('Student/Get');
  }

  // onDelete(id: any): Observable<any> {
  //   return this._HttpClient.delete(`Student/Delete/${id}`);
  // }
  addStudent(data: any): Observable<any> {
    return this._HttpClient.post('Student/Post', data);
  }
  getStudentById(ID: any): Observable<any> {
    return this._HttpClient.get(`Student/GetEditableByID?id=${ID}`);
  }

  updateStudent(Data: any): Observable<any> {
    return this._HttpClient.put(`Student/PUT`, Data);
  }
  onDelete(id: any): Observable<any> {
    return this._HttpClient.delete(`Student/Delete?id=` + id);
  }
}
