import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [MatDialogModule, MatButtonModule],
  exports: [MatDialogModule, MatButtonModule],
})
export class MaterialModule {}
