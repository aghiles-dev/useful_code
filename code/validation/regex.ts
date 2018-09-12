import { ErrorTypes } from "./error-types";

interface RegexKeys {
  DATE: number;
  DATE_ISO_8601: number;
  NUMBER: number;
  NUMBER_4: number;
  NUMBER_5: number;
  NUMBER_6: number;
  NUMBER_14: number;
  UPPER_ALPHA_3: number;
  PATRONYME: number;
  EMAIL: number;
}

export class Regex {
  static types: RegexKeys = {
    DATE: 1,
    DATE_ISO_8601: 2,
    NUMBER: 3,
    NUMBER_4: 4,
    NUMBER_5: 5,
    NUMBER_6: 6,
    NUMBER_14: 7,
    UPPER_ALPHA_3: 8,
    PATRONYME: 9,
    EMAIL: 10
  };

  static matcher: object = {
    [Regex.types["DATE"]]: {
      valueToMatch: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
      errorMessage: ErrorTypes.DATE_INVALIDE
    },
    [Regex.types["DATE_ISO_8601"]]: {
      valueToMatch: /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/,
      errorMessage: ErrorTypes.DATE_INVALIDE
    },
    [Regex.types["NUMBER"]]: {
      valueToMatch: /^[0-9]+$/,
      errorMessage: ErrorTypes.CHIFFRES_INVALIDES
    },
    [Regex.types["NUMBER_4"]]: {
      valueToMatch: /^[0-9]{4}$/,
      errorMessage: ErrorTypes.CHIFFRES_INVALIDE_4
    },
    [Regex.types["NUMBER_5"]]: {
      valueToMatch: /^[0-9]{5}$/,
      errorMessage: ErrorTypes.CHIFFRES_INVALIDE_5
    },
    [Regex.types["NUMBER_6"]]: {
      valueToMatch: /^[0-9]{6}$/,
      errorMessage: ErrorTypes.CHIFFRES_INVALIDE_6
    },
    [Regex.types["NUMBER_14"]]: {
      valueToMatch: /^[0-9]{14}$/,
      errorMessage: ErrorTypes.CHIFFRES_INVALIDE_14
    },
    [Regex.types["UPPER_ALPHA_3"]]: {
      valueToMatch: /^[A-Z]{3}$/,
      errorMessage: ErrorTypes.CHARACTERES_MAJUSCULE_3_INVALIDE
    },
    [Regex.types["PATRONYME"]]: {
      // tslint:disable-next-line:max-line-length
      valueToMatch: /^[A-ZÁÀÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖÕØŒŠÚÙÛÜÝŸŽ]{1}[ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖÕØŒŠÚÙÛÜÝŸŽabcdefghijklmnopqrstuvwxyzáàâäåãæçéèêëíìîïñóòôöõøœšúùûüýÿž\s-]*[ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖÕØŒŠÚÙÛÜÝŸŽabcdefghijklmnopqrstuvwxyzáàâäåãæçéèêëíìîïñóòôöõøœšúùûüýÿž]$/,
      errorMessage: ErrorTypes.PATRONYME_ERREUR
    },
    [Regex.types["EMAIL"]]: {
      valueToMatch: /^[^\W][\w]+[\w.+\-?!*]*\@([\w]+\.)+[a-zA-Z]{2,4}$/,
      errorMessage: ErrorTypes.EMAIL_ERREUR
    }
  };

  static isValid(data, valueToMatch): boolean {
    return valueToMatch.test(data);
  }
}
