import { Injectable } from "@angular/core";
import { TranslatorDictionaryService } from "./translator-dictionary.service";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class TranslatorService {
  readonly DEFAULT_LANGUAGE: string = "fr";
  readonly LANGUAGE_KEY_IN_COOKIE: string = "language";
  readonly NUMBER_OF_DAYS_IN_A_YEAR: number = 365;

  private _language: string;

  constructor(
    private translatorDictionary: TranslatorDictionaryService,
    private cookieService: CookieService
  ) {
    this._language =
      this.cookieService.get(this.LANGUAGE_KEY_IN_COOKIE) ||
      this.DEFAULT_LANGUAGE;
  }

  get dictionary() {
    return this.translatorDictionary.dictionary;
  }

  get language(): string {
    return this._language;
  }

  set language(newLanguage: string) {
    this._language = newLanguage;

    this.cookieService.set(
      this.LANGUAGE_KEY_IN_COOKIE,
      this.language,
      this.NUMBER_OF_DAYS_IN_A_YEAR
    );
  }

  translate(key): string {
    return this.dictionary[this.language][key];
  }
}
