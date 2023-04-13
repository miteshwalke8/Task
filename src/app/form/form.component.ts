import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  form: FormGroup;

  constructor(private fb: FormBuilder, private _userService: UserServiceService, private _dialogeRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name: '',
      domain: '',
      gender: '',
      dob: '',
      pn: '',
      location: ''
    });
  }

  ngOnInit(): void{
    this.form.patchValue(this.data);

  }
  onSubmit() {
    if (this.form.valid) {
      if (this.data) {
        this._userService.UpdateUser(this.data.id, this.form.value).subscribe({
          next: (val: any) => {
            alert('User Updated successfully');
            this._dialogeRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })

      } else {
        this._userService.addUsers(this.form.value).subscribe({
          next: (val: any) => {
            alert('user added successfully');
            this._dialogeRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }

    }
  }
}
