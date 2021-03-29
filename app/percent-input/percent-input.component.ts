import { Component, forwardRef, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NumericTextBoxComponent } from "@progress/kendo-angular-inputs";

@Component({
  selector: "percent-input",
  styleUrls: ["./percent-input.component.css"],
  template: `
    <kendo-numerictextbox
      format="#.####\\%"
      [value]="percentValue"
      [min]="0"
      [max]="100"
      [decimals]="percentDecimals"
      (valueChange)="onPercentValueChange($event)"
    >
    </kendo-numerictextbox>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PercentInputComponent),
      multi: true
    }
  ]
})
export class PercentInputComponent implements ControlValueAccessor {
  private _percentDecimals: number = 0;

  public percentValue: number | null;

  @ViewChild(NumericTextBoxComponent) child: NumericTextBoxComponent;

  @Input()
  set percentDecimals(value: number) {
    if (this._percentDecimals >= 0) {
      this._percentDecimals = value;
    }
  }

  get percentDecimals(): number {
    return this._percentDecimals;
  }

  onChange = (decimalValue: number | null) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(decimalValue: number | null) {
    // we have a new decimal value comming in from the parent
    console.log("writeValue", decimalValue);
    // convert the value to a percent value
    // this will pass the new percent value to the kendo numeric control using property binding
    this.percentValue = this.toPercentValue(
      decimalValue,
      this._percentDecimals
    );
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onPercentValueChange(percentValue: number | null): void {
    // the percent value has been changed by the user
    console.log("onPercentValueChange", percentValue);
    // convert this percent value into a decimal value
    const decimalValue = this.toDecimalValue(
      percentValue,
      this._percentDecimals + 2
    );
    // notify the parent control of the new decimal value
    this.onChange(decimalValue);
  }

  round = (value: number, decimalPlaces: number) => {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(value * factorOfTen) / factorOfTen;
  };

  toDecimalValue = (
    percentValue: number | null,
    decimalPlaces: number
  ): number | null => {
    if (percentValue == null) {
      return null;
    }

    if (percentValue === 0) {
      return 0;
    }

    return this.round(percentValue / 100, decimalPlaces);
  };

  toPercentValue = (
    decimalValue: number | null,
    decimalPlaces: number
  ): number | null => {
    if (decimalValue == null) {
      return null;
    }

    return this.round(decimalValue * 100, decimalPlaces);
  };
}
