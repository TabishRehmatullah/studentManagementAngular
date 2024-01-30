import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl= "http://localhost:5110/api/Students"

  constructor(private http: HttpClient) { }

  getStudents=():Observable<student[]>=> this.http.get<student[]>(this.apiUrl);

  addStudents= (data: student)=>this.http.post(this.apiUrl, data);

  getStudent=(id:number):Observable<student>=>this.http.get<student>(this.apiUrl+'/id: int?id='+id);

  deleteStudent=(id:number)=> this.http.delete(this.apiUrl+'/id: int?id='+id);
}
