import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatCardModule, 
  MatListModule, MatIconModule, MatToolbarModule,
  MatBadgeModule, MatInputModule, MatDividerModule,
  MatSnackBarModule, MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, 
    MatIconModule, MatToolbarModule, MatBadgeModule, MatInputModule,
    MatDividerModule, MatSnackBarModule, MatDialogModule
  ],
  //Make sure to do import AND export!
  exports: [
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, 
    MatIconModule, MatToolbarModule, MatBadgeModule, MatInputModule,
    MatDividerModule, MatSnackBarModule, MatDialogModule
  ]
})
export class MaterialModule { }
