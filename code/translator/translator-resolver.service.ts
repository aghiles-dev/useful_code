import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { TranslatorDictionaryService } from "./translator-dictionary.service";
import { TranslatorHttpService } from "./translator-http.service";

@Injectable({
  providedIn: "root"
})
export class TranslatorResolver implements Resolve<any> {
  constructor(
    private translatorHttpService: TranslatorHttpService,
    private translatorDictionaryService: TranslatorDictionaryService
  ) {}

  isTranslatorDictionaryLoading: boolean = false;

  resolve(): Promise<any> {
    this.isTranslatorDictionaryLoading = true;
    return this.translatorHttpService
      .fetchTranslations()
      .then(translatorDictionnay => {
        this.translatorDictionaryService.dictionary = translatorDictionnay;
        this.isTranslatorDictionaryLoading = false;
      });
  }
}
