import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PaginationComponent } from "./pagination.component";
import { TranslatorModule } from "../translator/translator.module";

@NgModule({
  imports: [CommonModule, FormsModule, TranslatorModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule {}
