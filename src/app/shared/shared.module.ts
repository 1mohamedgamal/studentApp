import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { MaterialModule } from './matriel/matriel.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [SharedComponent],
  exports: [MaterialModule],
})
export class SharedModule {}
