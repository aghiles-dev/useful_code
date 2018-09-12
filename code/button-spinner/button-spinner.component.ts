import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { isNullOrUndefined, isString } from "util";

@Component({
  selector: "app-button-spinner",
  templateUrl: "./button-spinner.component.html",
  styleUrls: ["./button-spinner.component.scss"]
})
export class ButtonSpinnerComponent implements OnInit, OnChanges {
  DEFAULT_BUTTON_TYPE = "btn-default";

  @Input() isDisabled?: boolean;
  inProgress: boolean;

  @Input() buttonLabel: string;
  @Input() buttonClass?: string;
  @Input() buttonType?: string;
  @Input() pictoBeforeButton?: string;
  @Input() pictoAfterButton?: string;

  @Input() boundFunction;
  @Input() boundFunctionParameters?: any[];
  @Input() functionContext;

  @Input() autoTrigger?: boolean;

  constructor() {}

  ngOnInit() {
    if (isNullOrUndefined(this.boundFunction)) {
      throw new Error("L'attribut 'boundFunction' est obligatoire");
    }
    if (isNullOrUndefined(this.functionContext)) {
      throw new Error("L'attribut 'functionContext' est obligatoire");
    }

    this.enableButtonSpinner();

    if (isNullOrUndefined(this.boundFunctionParameters)) {
      this.boundFunctionParameters = [];
    }
    if (isNullOrUndefined(this.buttonType)) {
      this.buttonType = this.DEFAULT_BUTTON_TYPE;
    }

    if (this.autoTrigger === true) {
      this.onButtonSpinnerClick();
    }
  }

  ngOnChanges(changes): void {
    if (
      !isNullOrUndefined(changes.autoTrigger) &&
      !changes.autoTrigger.firstChange &&
      changes.autoTrigger.currentValue
    ) {
      this.onButtonSpinnerClick();
    }
  }

  onButtonSpinnerClick(): Promise<any> {
    this.disableButtonSpinner();

    return Promise.resolve()
      .then(() =>
        this.boundFunction.apply(
          this.functionContext,
          this.boundFunctionParameters
        )
      )
      .then(() => {
        this.enableButtonSpinner();
        // sinon il existe des cas où le scope de la directive n'est pas refresh, et le spinner continue de tourner
      })
      .catch(() => {
        this.enableButtonSpinner();
      });
  }

  enableButtonSpinner() {
    this.inProgress = false;
  }

  disableButtonSpinner() {
    this.inProgress = true;
  }

  isButtonSpinnerDisabled(): boolean {
    return this.isDisabled === true || this.inProgress === true;
  }

  existPictoBeforeButton(): boolean {
    return (
      isString(this.pictoBeforeButton) &&
      !isNullOrUndefined(this.pictoBeforeButton) &&
      this.pictoBeforeButton.trim() !== ""
    );
  }

  existPictoAfterButton(): boolean {
    return (
      isString(this.pictoAfterButton) &&
      !isNullOrUndefined(this.pictoAfterButton) &&
      this.pictoAfterButton.trim() !== ""
    );
  }
}
