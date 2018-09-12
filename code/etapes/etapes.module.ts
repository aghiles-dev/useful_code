import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { EtapesComponent } from "./etapes.component";
import { TranslatorModule } from "../translator/translator.module";

@NgModule({
  declarations: [EtapesComponent],
  exports: [EtapesComponent],
  imports: [CommonModule, RouterModule, FormsModule, TranslatorModule]
})
export class EtapesModule {}
