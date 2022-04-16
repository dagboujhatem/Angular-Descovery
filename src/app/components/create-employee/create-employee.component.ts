import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  submitted = false;
  employeeForm?:FormGroup;
  constructor(private employeeService: EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      salary: new FormControl('', [Validators.required]),
    });
  }

  createEmployee()
  {
    this.submitted = true;
    if(this.employeeForm?.invalid){
      return;
    }
    // Add employee
    this.employeeService.createEmployee(this.employeeForm?.value).subscribe((response:any)=>{
      this.router.navigateByUrl('/list');
    }, (error:any)=>{
      console.log(error);
    });
  }

}
