import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
