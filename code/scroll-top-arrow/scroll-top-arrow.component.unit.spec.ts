import { TestBed } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { ViewHandlerModule } from "../../shared/view-handler/view-handler.module";
import { ScrollTopArrowComponent } from "./scroll-top-arrow.component";
import { ViewHandlerService } from "../../shared/view-handler/view-handler.service";
import { WindowModule } from "../../shared/window/window.module";
import { WindowService } from "../../shared/window/window.service";

describe("ScrollTopArrowComponent", () => {
  let scrollTopArrowComponent: ScrollTopArrowComponent;
  let windowService: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ViewHandlerModule, WindowModule],
      declarations: [ScrollTopArrowComponent]
    });
    scrollTopArrowComponent = TestBed.createComponent(ScrollTopArrowComponent)
      .componentInstance;
    windowService = TestBed.get(WindowService);
  });

  describe(".ngOnInit()", () => {
    it("calls window.addEventListener", () => {
      // Given
      const windowSpy = spyOn(windowService.window, "addEventListener");

      // When
      scrollTopArrowComponent.ngOnInit();

      // Then
      expect(windowSpy).toHaveBeenCalled();
    });
  });

  describe(".isScrollActivated()", () => {
    describe("When scrollTopArrowComponent.scrollValue > VERTICAL_OFFSET", () => {
      it("returns true", () => {
        // Given
        scrollTopArrowComponent.scrollValue = 150;

        // When
        const result = scrollTopArrowComponent.isScrollActivated;

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When scrollTopArrowComponent.scrollValue = VERTICAL_OFFSET", () => {
      it("returns false", () => {
        // Given
        scrollTopArrowComponent.scrollValue = 100;

        // When
        const result = scrollTopArrowComponent.isScrollActivated;

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When scrollTopArrowComponent.scrollValue < VERTICAL_OFFSET", () => {
      it("returns false", () => {
        // Given
        scrollTopArrowComponent.scrollValue = 10;

        // When
        const result = scrollTopArrowComponent.isScrollActivated;

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe(".scrollToTop()", () => {
    it("calls viewHandlerService.scrollWindowToTop()", () => {
      // Given
      const viewHandlerServiceSpy = spyOn(
        TestBed.get(ViewHandlerService),
        "scrollWindowToTop"
      );

      // When
      scrollTopArrowComponent.scrollToTop();

      // Then
      expect(viewHandlerServiceSpy).toHaveBeenCalledWith();
    });
  });
});
