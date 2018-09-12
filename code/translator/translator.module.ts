import { NgModule } from "@angular/core";
import { TranslatorService } from "./translator.service";
import { TranslatorDictionaryService } from "./translator-dictionary.service";
import { TranslatePipe } from "./translate.pipe";
import { CookieService } from "ngx-cookie-service";
import { LanguageComponent } from "./language.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { WindowModule } from "../window/window.module";
import { ApiModule } from "../api/api.module";

@NgModule({
  imports: [CommonModule, FormsModule, WindowModule, ApiModule],
  declarations: [TranslatePipe, LanguageComponent],
  exports: [TranslatePipe, LanguageComponent],
  providers: [TranslatorService, TranslatorDictionaryService, CookieService]
})
export class TranslatorModule {}
