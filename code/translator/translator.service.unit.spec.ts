import { TranslatorService } from "./translator.service";
import { TestBed } from "@angular/core/testing";
import { CookieService } from "ngx-cookie-service";
import { TranslatorDictionaryService } from "./translator-dictionary.service";
import { TranslatorDictionaryServiceStub } from "../tests.fixtures";

describe("TranslatorService", () => {
  let translatorService: TranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslatorService,
        CookieService,
        {
          provide: TranslatorDictionaryService,
          useClass: TranslatorDictionaryServiceStub
        }
      ]
    });

    translatorService = TestBed.get(TranslatorService);
  });

  describe("set language(:newLanguage)", () => {
    it("calls cookieService.set", () => {
      // Given
      const newLanguage = "en";
      const spy = spyOn(TestBed.get(CookieService), "set").and.returnValue(
        true
      );

      // When
      translatorService.language = newLanguage;

      // Then
      expect(spy).toHaveBeenCalledWith(
        translatorService.LANGUAGE_KEY_IN_COOKIE,
        newLanguage,
        translatorService.NUMBER_OF_DAYS_IN_A_YEAR
      );
    });
  });
});
