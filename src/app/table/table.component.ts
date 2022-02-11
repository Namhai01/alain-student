import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../routes/dashboard/url/api.service';
import { SVModel } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  formValue!: FormGroup;
  SVmodelObj: SVModel = new SVModel();
  SV: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Id: [''],
      Firstname: [''],
      Lastname: [''],
      Dob: [''],
      Address: [''],
      sex: [''],
      Phone: ['']
    });
    this.viewAll();
  }
  viewAll() {
    this.api.getSV().subscribe(response => {
      this.SV = response;
    });
  }
  themSV() {
    this.SVmodelObj.Firstname = this.formValue.value.Firstname;
    this.SVmodelObj.Lastname = this.formValue.value.Lastname;
    this.SVmodelObj.Dob = this.formValue.value.Dob;
    this.SVmodelObj.Address = this.formValue.value.Address;
    this.SVmodelObj.sex = this.formValue.value.sex;
    this.SVmodelObj.Phone = this.formValue.value.Phone;
    this.api.postSV(this.SVmodelObj).subscribe(
      response => {
        alert('OK!!');
        let cls = document.getElementById('btn-cancel');
        cls?.click();
        this.formValue.reset();
        this.viewAll();
      },
      err => alert('Có lỗi')
    );
  }
  btnAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  xoaSV(row: any) {
    this.api.deleteSV(row.Id).subscribe(response => {
      alert('Bạn chắc chắn muốn xóa không');
      this.viewAll();
    });
  }

  suaSV(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.SVmodelObj.Id = row.Id;
    this.formValue.controls['Firstname'].setValue(row.Firstname);
    this.formValue.controls['Lastname'].setValue(row.Lastname);
    this.formValue.controls['Dob'].setValue(row.Dob);
    this.formValue.controls['Address'].setValue(row.Address);
    this.formValue.controls['sex'].setValue(row.sex);
    this.formValue.controls['Phone'].setValue(row.Phone);
  }
  updateSV() {
    this.SVmodelObj.Firstname = this.formValue.value.Firstname;
    this.SVmodelObj.Lastname = this.formValue.value.Lastname;
    this.SVmodelObj.Dob = this.formValue.value.Dob;
    this.SVmodelObj.Address = this.formValue.value.Address;
    this.SVmodelObj.sex = this.formValue.value.sex;
    this.SVmodelObj.Phone = this.formValue.value.Phone;

    this.api.updateSV(this.SVmodelObj, this.SVmodelObj.Id).subscribe(
      response => {
        alert('OK !!');
        let cls = document.getElementById('btn-cancel');
        cls?.click();
        this.formValue.reset();
        this.viewAll();
      },
      err => alert('Có lỗi')
    );
  }
}
