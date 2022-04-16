import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllEmployees(){
    return this.http.get(`${this.baseUrl}/employees`);
  }

  deleteEmployee(id:number){
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  createEmployee(data:any){
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  getEmployeeByID(id:number){
    return this.http.get(`${this.baseUrl}/employees/${id}`);
  }

  updateEmployeeByID(id:number, data:any){
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }
}
