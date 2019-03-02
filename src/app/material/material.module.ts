import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatIconModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatIconModule
  ],
  //Make sure to do import AND export!
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatIconModule
  ]
})
export class MaterialModule { }
