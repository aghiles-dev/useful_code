import { Injectable } from '@angular/core';
import { ApiHttpService } from "../api/api.http.service";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class TranslatorHttpService {
  readonly BASE_URL: string = "/translations";
  private _translations: object;

  constructor(private apiHttpService: ApiHttpService) { }

  fetchTranslations(): Promise<any> {
    if (isNullOrUndefined(this._translations)) {
      return this.apiHttpService.get(this.BASE_URL).then(translations => {
        this._translations = translations;
        return this._translations
      });
    }
    return Promise.resolve(this._translations);
  }
}
