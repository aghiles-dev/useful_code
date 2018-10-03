import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TranslatorModule } from "../translator/translator.module";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./pagination.component";

describe("PaginationComponent", () => {
  let paginationComponent: PaginationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [CommonModule, TranslatorModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    paginationComponent = TestBed.createComponent(PaginationComponent)
      .componentInstance;
  });

  describe(".ngOnInit", () => {
    it("calls refreshPagerValues", () => {
      // Given
      const spy = spyOn(paginationComponent, "refreshPagerValues");

      // When
      paginationComponent.ngOnInit();

      // Then
      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe(".ngOnChanges", () => {
    it("calls refreshPagerValues", () => {
      // Given
      const spy = spyOn(paginationComponent, "refreshPagerValues");

      // When
      paginationComponent.ngOnChanges();

      // Then
      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe(".goToFirstPage()", () => {
    it("sets currentPage to 1", () => {
      // When
      paginationComponent.goToFirstPage();

      // Then
      expect(paginationComponent.currentPage).toEqual(1);
    });

    it("sets selectedPage", () => {
      // When
      paginationComponent.goToFirstPage();

      // Then
      expect(paginationComponent.selectedPage).toEqual(1);
    });

    it("calls onPaginationChange.emit", () => {
      // Given
      const spy = spyOn(paginationComponent.onPaginationChange, "emit");

      // When
      paginationComponent.goToFirstPage();

      // Then
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe(".goToPreviousPage()", () => {
    it("decrises currentPage", () => {
      // Given
      paginationComponent.currentPage = 2;

      // When
      paginationComponent.goToPreviousPage();

      // Then
      expect(paginationComponent.currentPage).toEqual(1);
    });

    it("sets selectedPage", () => {
      // Given
      paginationComponent.currentPage = 2;

      // When
      paginationComponent.goToPreviousPage();

      // Then
      expect(paginationComponent.selectedPage).toEqual(1);
    });

    it("calls onPaginationChange.emit", () => {
      // Given
      paginationComponent.currentPage = 2;
      const spy = spyOn(paginationComponent.onPaginationChange, "emit");

      // When
      paginationComponent.goToPreviousPage();

      // Then
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe(".goToSelectedPage(:selectedPage)", () => {
    it("decrises currentPage with the given value", () => {
      // When
      paginationComponent.goToSelectedPage(1);

      // Then
      expect(paginationComponent.currentPage).toEqual(1);
    });

    it("sets selectedPage", () => {
      // When
      paginationComponent.goToSelectedPage(1);

      // Then
      expect(paginationComponent.selectedPage).toEqual(1);
    });

    it("calls onPaginationChange.emit", () => {
      // Given
      const spy = spyOn(paginationComponent.onPaginationChange, "emit");

      // When
      paginationComponent.goToSelectedPage(1);

      // Then
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe(".goToNextPage()", () => {
    it("incrises currentPage", () => {
      // Given
      paginationComponent.currentPage = 2;

      // When
      paginationComponent.goToNextPage();

      // Then
      expect(paginationComponent.currentPage).toEqual(3);
    });

    it("sets selectedPage", () => {
      // Given
      paginationComponent.currentPage = 2;

      // When
      paginationComponent.goToNextPage();

      // Then
      expect(paginationComponent.selectedPage).toEqual(3);
    });

    it("calls onPaginationChange.emit", () => {
      // Given
      paginationComponent.currentPage = 2;
      const spy = spyOn(paginationComponent.onPaginationChange, "emit");

      // When
      paginationComponent.goToNextPage();

      // Then
      expect(spy).toHaveBeenCalledWith(3);
    });
  });

  describe(".goToLastPage()", () => {
    it("sets currentPage", () => {
      // Given
      paginationComponent.numberPages = 2;

      // When
      paginationComponent.goToLastPage();

      // Then
      expect(paginationComponent.currentPage).toEqual(2);
    });

    it("sets selectedPage", () => {
      // Given
      paginationComponent.numberPages = 2;

      // When
      paginationComponent.goToLastPage();

      // Then
      expect(paginationComponent.selectedPage).toEqual(2);
    });

    it("calls onPaginationChange.emit", () => {
      // Given
      paginationComponent.numberPages = 2;
      const spy = spyOn(paginationComponent.onPaginationChange, "emit");

      // When
      paginationComponent.goToLastPage();

      // Then
      expect(spy).toHaveBeenCalledWith(2);
    });
  });

  describe(".isFirstPage()", () => {
    describe("When currentPage is '1'", () => {
      it("returns true", () => {
        // Given
        paginationComponent.currentPage = 1;

        // When
        const result = paginationComponent.isFirstPage();

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When currentPage is not '1'", () => {
      it("returns false", () => {
        // Given
        paginationComponent.currentPage = 2;

        // When
        const result = paginationComponent.isFirstPage();

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe(".isLastPage()", () => {
    describe("When currentPage is superior to numberPages", () => {
      it("returns true", () => {
        // Given
        paginationComponent.currentPage = 2;
        paginationComponent.numberPages = 1;

        // When
        const result = paginationComponent.isLastPage();

        // Then
        expect(result).toEqual(true);
      });
    });
    describe("When currentPage is equal to numberPages", () => {
      it("returns true", () => {
        // Given
        paginationComponent.currentPage = 1;
        paginationComponent.numberPages = 1;

        // When
        const result = paginationComponent.isLastPage();

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When currentPage is inferior to numberPages", () => {
      it("returns false", () => {
        // Given
        paginationComponent.currentPage = 1;
        paginationComponent.numberPages = 2;

        // When
        const result = paginationComponent.isLastPage();

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe(".isMoreThanOnePage()", () => {
    describe("When totalItemList is superior to itemsPerPage", () => {
      it("returns true", () => {
        // Given
        paginationComponent.totalItemList = 15;
        paginationComponent.itemsPerPage = 5;

        // When
        const result = paginationComponent.isMoreThanOnePage();

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When totalItemList is superior to itemsPerPage", () => {
      it("returns false", () => {
        // Given
        paginationComponent.totalItemList = 5;
        paginationComponent.itemsPerPage = 15;

        // When
        const result = paginationComponent.isMoreThanOnePage();

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe(".refreshPagerValues()", () => {
    it("sets numberPages", () => {
      // Given
      paginationComponent.totalItemList = 5;
      paginationComponent.itemsPerPage = 15;

      // When
      paginationComponent.refreshPagerValues();

      // Then
      expect(paginationComponent.numberPages).toEqual(1);
    });
  });
});
