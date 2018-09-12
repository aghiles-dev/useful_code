import { Injectable } from "@angular/core";

@Injectable()
export class TranslatorDictionaryService {
  private _dictionary = {
    fr: {
      SE_CONNECTER: "Se connecter",
      ETRANGER_EN_FRANCE: "Étrangers en France",
      ACCES_SITE_NON_AUTORISE: "Accès au site non autorisé",
      DIRECTION_GENERALE_ETRANGERS_FRANCE: "Direction Générale des étrangers en France",
      SE_DECONNECTER: "Se déconnecter"

    },
    en: {}
  };

  get dictionary() {
    return this._dictionary;
  }

  set dictionary(dictionary) {
    this._dictionary = dictionary;
  }
}
