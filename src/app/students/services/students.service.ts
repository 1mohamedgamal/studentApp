import { HttpClient } from '@angular/common/http';
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

  onDelete(id: any): Observable<any> {
    return this._HttpClient.delete(`/Student/delete/${id}`);
  }
  addStudent(data : any): Observable<any> {
    return this._HttpClient.post('Student/Post', data);
  }
}
