import { TestBed } from "@angular/core/testing";

import { ButtonSpinnerComponent } from "./button-spinner.component";

describe("ButtonSpinnerComponent", () => {
  let component: ButtonSpinnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSpinnerComponent]
    });

    component = TestBed.createComponent(ButtonSpinnerComponent)
      .componentInstance;

    component.boundFunction = () => {};
    component.functionContext = {};
    component.ngOnInit();
  });

  describe(".ngOnInit()", () => {
    describe("When boundFunction is null", () => {
      it("throws an error", () => {
        // Given
        component.boundFunction = null;
        const expectedErrorMessage =
          "L'attribut 'boundFunction' est obligatoire";

        // When
        try {
          component.ngOnInit();
        } catch (error) {
          // Then
          expect(error.message).toEqual(expectedErrorMessage);
        }
      });
    });

    describe("When boundFunction is undefined", () => {
      it("throws an error", () => {
        // Given
        component.boundFunction = undefined;
        const expectedErrorMessage =
          "L'attribut 'boundFunction' est obligatoire";

        // When
        try {
          component.ngOnInit();
        } catch (error) {
          // Then
          expect(error.message).toEqual(expectedErrorMessage);
        }
      });
    });

    describe("When functionContext is null", () => {
      it("throws an error", () => {
        // Given
        component.functionContext = null;
        const expectedErrorMessage =
          "L'attribut 'functionContext' est obligatoire";

        // When
        try {
          component.ngOnInit();
        } catch (error) {
          // Then
          expect(error.message).toEqual(expectedErrorMessage);
        }
      });
    });

    describe("When functionContext is undefined", () => {
      it("throws an error", () => {
        // Given
        component.functionContext = undefined;
        const expectedErrorMessage =
          "L'attribut 'functionContext' est obligatoire";

        // When
        try {
          component.ngOnInit();
        } catch (error) {
          // Then
          expect(error.message).toEqual(expectedErrorMessage);
        }
      });
    });

    it("calls component.enableButtonSpinner()", () => {
      // Given
      const expected = spyOn(component, "enableButtonSpinner");

      // When
      component.ngOnInit();

      // Then
      expect(expected).toHaveBeenCalledWith();
    });

    describe("When boundFunctionParameters is null", () => {
      it("sets boundFunctionParameters to []", () => {
        // Given
        component.boundFunctionParameters = null;

        // When
        component.ngOnInit();

        // Then
        expect(component.boundFunctionParameters).toEqual([]);
      });
    });

    describe("When boundFunctionParameters is undefined", () => {
      it("sets boundFunctionParameters to []", () => {
        // Given
        component.boundFunctionParameters = undefined;

        // When
        component.ngOnInit();

        // Then
        expect(component.boundFunctionParameters).toEqual([]);
      });
    });

    describe("When buttonType is null", () => {
      it("sets buttonType to DEFAULT_BUTTON_TYPE", () => {
        // Given
        component.buttonType = null;

        // When
        component.ngOnInit();

        // Then
        expect(component.buttonType).toEqual(component.DEFAULT_BUTTON_TYPE);
      });
    });

    describe("When buttonType is undefined", () => {
      it("sets buttonType to DEFAULT_BUTTON_TYPE", () => {
        // Given
        component.buttonType = undefined;

        // When
        component.ngOnInit();

        // Then
        expect(component.buttonType).toEqual(component.DEFAULT_BUTTON_TYPE);
      });
    });

    describe("When autoTrigger is true", () => {
      it("calls onButtonSpinnerClick", () => {
        // Given
        component.autoTrigger = true;
        const expected = spyOn(component, "onButtonSpinnerClick");

        // When
        component.ngOnInit();

        // Then
        expect(expected).toHaveBeenCalledWith();
      });
    });
  });

  describe(".enableButtonSpinner()", () => {
    it("sets inProgress to false", () => {
      // Given

      // When
      component.enableButtonSpinner();

      // Then
      expect(component.inProgress).toEqual(false);
    });
  });

  describe(".disableButtonSpinner()", () => {
    it("sets inProgress to false", () => {
      // Given

      // When
      component.disableButtonSpinner();

      // Then
      expect(component.inProgress).toEqual(true);
    });
  });

  describe(".isButtonSpinnerDisabled()", () => {
    describe("When both readOnly and inProgress are false", () => {
      it("returns false", () => {
        // Given
        component.isDisabled = false;
        component.inProgress = false;

        // When
        const result = component.isButtonSpinnerDisabled();

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When readOnly is true", () => {
      it("returns false", () => {
        // Given
        component.isDisabled = true;
        component.inProgress = false;

        // When
        const result = component.isButtonSpinnerDisabled();

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When isProgres is true", () => {
      it("returns false", () => {
        // Given
        component.isDisabled = false;
        component.inProgress = true;

        // When
        const result = component.isButtonSpinnerDisabled();

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When both readOnly and inProgress are true", () => {
      it("returns false", () => {
        // Given
        component.isDisabled = true;
        component.inProgress = true;

        // When
        const result = component.isButtonSpinnerDisabled();

        // Then
        expect(result).toEqual(true);
      });
    });
  });

  describe(".existPictoBeforeButton()", () => {
    describe("When pictoBeforeButton is null", () => {
      it("returns false", () => {
        // Given
        component.pictoBeforeButton = null;

        // When
        const result = component.existPictoBeforeButton();

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When pictoBeforeButton is undefined", () => {
      it("returns false", () => {
        // Given
        component.pictoBeforeButton = undefined;

        // When
        const result = component.existPictoBeforeButton();

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When pictoBeforeButton is an empty string", () => {
      it("returns false", () => {
        // Given
        component.pictoBeforeButton = "";

        // When
        const result = component.existPictoBeforeButton();

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When pictoBeforeButton is string containing only white spaces", () => {
      it("returns false", () => {
        // Given
        component.pictoBeforeButton = "   ";

        // When
        const result = component.existPictoBeforeButton();

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When pictoBeforeButton is a non empty string", () => {
      it("returns true", () => {
        // Given
        component.pictoBeforeButton = "fakeClass";

        // When
        const result = component.existPictoBeforeButton();

        // Then
        expect(result).toEqual(true);
      });
    });
  });

  describe(".onButtonSpinnerClick()", () => {
    describe("When the Promise resolves", () => {
      it("calls apply on boundFunction", () => {
        // Given
        component.boundFunction = () => {};
        component.functionContext = {};
        component.boundFunctionParameters = [];
        const expected = spyOn(component.boundFunction, "apply");

        // When
        component.onButtonSpinnerClick().then(() => {
          // Then
          expect(expected).toHaveBeenCalledWith(
            component.functionContext,
            component.boundFunctionParameters
          );
        });
      });

      it("calls component.enableButtonSpinner()", () => {
        // Given
        const expected = spyOn(component, "enableButtonSpinner");

        // When
        component.onButtonSpinnerClick().then(() => {
          // Then
          expect(expected).toHaveBeenCalledWith();
        });
      });
    });
  });
});
