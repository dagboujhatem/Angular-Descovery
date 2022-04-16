import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  submitted = false;
  employeeForm?:FormGroup;
  id?:any;
  constructor(private employeeService: EmployeeService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadEmployeeData();
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      salary: new FormControl('', [Validators.required]),
    });
  }

  loadEmployeeData()
  {
    this.employeeService.getEmployeeByID(this.id).subscribe((response:any)=>{
      this.employeeForm?.patchValue(response);
    }, (error:any)=>{
      console.log(error);
    });
  }

  updateEmployee()
  {
    this.submitted = true;
    if(this.employeeForm?.invalid){
      return;
    }
    // update employee
    this.employeeService.updateEmployeeByID(this.id, this.employeeForm?.value).subscribe((response:any)=>{
      this.router.navigateByUrl('/list');
    }, (error:any)=>{
      console.log(error);
    });
  }

}
