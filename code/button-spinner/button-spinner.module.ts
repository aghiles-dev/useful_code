import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonSpinnerComponent } from "./button-spinner.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ButtonSpinnerComponent],
  exports: [ButtonSpinnerComponent]
})
export class ButtonSpinnerModule {}
