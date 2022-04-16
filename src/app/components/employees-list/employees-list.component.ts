import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees?: any [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees()
  {
    this.employeeService.getAllEmployees().subscribe((response:any)=>{
      this.employees = response;
    }, (error:any)=>{
      console.log(error);
    });
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe((response:any)=>{
      this.loadEmployees();
    }, (error:any)=>{
      console.log(error);
    });
  }

}
