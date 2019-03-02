import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatCardModule, 
  MatListModule, MatIconModule, MatToolbarModule,
  MatBadgeModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule, MatBadgeModule, MatInputModule
  ],
  //Make sure to do import AND export!
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule, MatBadgeModule, MatInputModule
  ]
})
export class MaterialModule { }
