import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TranslatorService } from "./translator.service";

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.scss"]
})
export class LanguageComponent implements OnInit {
  languageKeyList: string[];
  languages: object;
  selectedLanguage: string;

  constructor(
    private cookieService: CookieService,
    private translatorService: TranslatorService
  ) {}

  ngOnInit() {
    this.languages = {
      FRANCAIS: "fr",
      ANGLAIS: "en"
    };

    this.languageKeyList = Object.keys(this.languages);

    if (
      !this.cookieService.check(this.translatorService.LANGUAGE_KEY_IN_COOKIE)
    ) {
      this.translatorService.language = this.translatorService.DEFAULT_LANGUAGE;
    }
    this.selectedLanguage = this.cookieService.get(
      this.translatorService.LANGUAGE_KEY_IN_COOKIE
    );
  }

  switchLanguage(): void {
    this.translatorService.language = this.selectedLanguage;
  }
}
