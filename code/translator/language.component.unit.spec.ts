import { TestBed } from "@angular/core/testing";

import { LanguageComponent } from "./language.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { TranslatorService } from "./translator.service";
import { TranslatePipe } from "./translate.pipe";
import { TranslatorServiceStub } from "../tests.fixtures";

describe("LanguageComponent", () => {
  let languageComponent: LanguageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [LanguageComponent, TranslatePipe],
      providers: [
        CookieService,
        {
          provide: TranslatorService,
          useClass: TranslatorServiceStub
        }
      ]
    });

    languageComponent = TestBed.createComponent(LanguageComponent)
      .componentInstance;
  });

  describe(".ngOniInit()", () => {
    it("sets languages with an object", () => {
      // Given
      const expected = {
        FRANCAIS: "fr",
        ANGLAIS: "en"
      };

      // When
      languageComponent.ngOnInit();

      // Then
      expect(languageComponent.languages).toEqual(expected);
    });

    it("sets languageKeyList with the keys of component.languages", () => {
      // Given
      const expected = ["FRANCAIS", "ANGLAIS"];

      // When
      languageComponent.ngOnInit();

      // Then
      expect(languageComponent.languageKeyList).toEqual(expected);
    });

    describe("When the cookie does not exist", () => {
      it("calls set of CookieService", () => {
        // Given
        const translatorService = TestBed.get(TranslatorService);
        const cookieService = TestBed.get(CookieService);
        spyOn(cookieService, "check").and.returnValue(false);

        // When
        languageComponent.ngOnInit();

        // Then
        expect(translatorService.language).toEqual(
          translatorService.DEFAULT_LANGUAGE
        );
      });
    });

    it("sets this.selectedLanguage to the value stored in the cookie", () => {
      // Given
      const expectedLanguage = "fr";
      const cookieService = TestBed.get(CookieService);
      spyOn(cookieService, "get").and.returnValue(expectedLanguage);

      // When
      languageComponent.ngOnInit();

      // Then
      expect(languageComponent.selectedLanguage).toEqual(expectedLanguage);
    });
  });

  describe(".switchLanguage()", () => {
    it("sets translatorService.language to this.selectedLanguage", () => {
      // Given
      const translatorService = TestBed.get(TranslatorService);
      languageComponent.selectedLanguage = "fr";

      // When
      languageComponent.switchLanguage();

      // Then
      expect(translatorService.language).toEqual("fr");
    });
  });
});
