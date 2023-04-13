import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { UserServiceService } from '../user-service.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  users: any;
  user: any;

  displayedColumns: string[] =
    ['id',
      'name',
      'domain',
      'gender',
      'dob',
      'pn',
      'location'];



  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private matDialog: MatDialog, private _userService: UserServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  openPopUp() {
    const dialogRef = this.matDialog.open(FormComponent);
   dialogRef.afterClosed().subscribe({
     next: (val) => {
       if(val) {
         this.getUsers();
       }
     },
   });
  }

  getUsers() {
    this._userService.getUsers().subscribe((data) => {
      this.users = data;
      this.user = this.users.find((user: { id: number; }) => user.id === 1);
    })
  }
 
  UpdateUser(data:any) {
   const dialogRef = this.matDialog.open(FormComponent, {
     data,
   });

   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getUsers();
      }
    },
  });
  
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  

}
