import { TestBed } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { EtapesComponent } from "./etapes.component";
import { TranslatorServiceStub } from "../tests.fixtures";
import { TranslatorService } from "../translator/translator.service";
import { IntroductionTiersDataService } from "../../portal/gaip/introduction-tiers/introduction-tiers-data.service";
import { TranslatorModule } from "../translator/translator.module";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("EtapesComponent", () => {
  let etapesComponent: EtapesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtapesComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        TranslatorModule
      ],
      providers: [
        IntroductionTiersDataService,
        {
          provide: TranslatorService,
          useClass: TranslatorServiceStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    etapesComponent = TestBed.createComponent(EtapesComponent)
      .componentInstance;
    etapesComponent.ngOnInit();
  });

  describe(".ngOnInit()", () => {
    describe("When etapes has no elements", () => {
      it("sets the width of an etape to etapesComponent.FULL_WIDTH", () => {
        // Given
        etapesComponent.etapes = [];

        // When
        etapesComponent.ngOnInit();

        // Then
        expect(etapesComponent.etapeWidth).toEqual(etapesComponent.FULL_WIDTH);
      });
    });

    describe("otherwise", () => {
      it("sets the width of an etape to etapesComponent.FULL_WIDTH / number of etapes", () => {
        // Given
        etapesComponent.etapes = [
          {
            index: 1,
            label: "fake 1"
          },
          {
            index: 2,
            label: "fake 2"
          }
        ];
        const expected = etapesComponent.FULL_WIDTH / 2;

        // When
        etapesComponent.ngOnInit();

        // Then
        expect(etapesComponent.etapeWidth).toEqual(expected);
      });
    });
  });

  describe(".getEtapeStatus(:etape)", () => {
    describe("When `etape` is the current etape", () => {
      it("returns current", () => {
        // Given
        const expected = "current";
        etapesComponent.currentEtapeIndex = 1;

        // When
        const result = etapesComponent.getEtapeStatus(1);

        // Then
        expect(result).toBe(expected);
      });
    });

    describe("When `etape` is one of the next", () => {
      it("returns next", () => {
        // Given
        const expected = "next";
        etapesComponent.currentEtapeIndex = 1;

        // When
        const result = etapesComponent.getEtapeStatus(2);

        // Then
        expect(result).toEqual(expected);
      });
    });

    describe("When `etape` is one of the previous etape", () => {
      it("returns previous", () => {
        // Given
        const expected = "previous";
        etapesComponent.currentEtapeIndex = 3;

        // When
        const result = etapesComponent.getEtapeStatus(1);

        // Then
        expect(result).toEqual(expected);
      });
    });
  });

  describe(".isEtapePrevious(:currentEtapeIndex)", () => {
    describe("When the etape before the current etape", () => {
      it("returns true", () => {
        // Given
        const etapeIndex: number = 2;
        etapesComponent.currentEtapeIndex = 3;

        // When
        const result = etapesComponent.isEtapePrevious(etapeIndex);

        // Then
        expect(result).toEqual(true);
      });
    });
  });
});
