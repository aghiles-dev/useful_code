import { Pipe, PipeTransform } from "@angular/core";
import { TranslatorService } from "./translator.service";
import { isNullOrUndefined } from "util";
import { TranslatorDictionaryService } from "./translator-dictionary.service";
import { equals } from "../gaip-utils";

@Pipe({
  name: "translate",
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private translation: string;
  private currentTranslationWord: string;
  private lastTranslationLanguage: string;
  private lastTranslationDictionary: object;
  private hasNeverBeenTranslated: boolean = true;

  constructor(
    private translatorService: TranslatorService,
    private translatorDictionaryService: TranslatorDictionaryService
  ) {}

  transform(word: string, wordsToReplace: object = {}): string {
    if (this.isNumber(word)) {
      return word;
    }

    if (this.isTranslationToBeUpdated(word)) {
      this.translation = this.getTranslationValue(word, wordsToReplace);
    }

    return this.translation;
  }

  private getTranslationValue(word: string, replacements: object): string {
    this.currentTranslationWord = word;
    this.lastTranslationLanguage = this.translatorService.language;
    this.lastTranslationDictionary = this.translatorDictionaryService.dictionary;

    let translation = this.translatorService.translate(word);

    if (
      isNullOrUndefined(translation) &&
      !isNullOrUndefined(word) &&
      word.toString().trim() !== ""
    ) {
      translation = `********* ${word} *********`;
    }

    if (!isNullOrUndefined(word)) {
      this.hasNeverBeenTranslated = false;
    }

    for (let key in replacements) {
      translation = translation.replace(`{${key}}`, replacements[key]);
    }

    return translation;
  }

  isTranslationToBeUpdated(word): boolean {
    return (
      word !== this.currentTranslationWord ||
      this.hasNeverBeenTranslated ||
      isNullOrUndefined(this.lastTranslationLanguage) ||
      this.lastTranslationLanguage !== this.translatorService.language ||
      !equals(
        this.lastTranslationDictionary,
        this.translatorDictionaryService.dictionary
      )
    );
  }

  private isNumber(word: string) {
    return /^\d+$/.test(word);
  }
}
