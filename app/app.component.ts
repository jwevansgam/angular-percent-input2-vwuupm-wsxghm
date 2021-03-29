import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public percentDecimals: number = 4;
  public decimalValue: number = 0.015;

  form = this.fb.group({
    feeRate: [this.decimalValue, Validators.required],
    feeRate2: [this.decimalValue, Validators.required]
  });

  constructor(private fb: FormBuilder) {
    // this.form.get("feeRate").valueChanges.subscribe(decimalValue => {
    //   console.log("feeRate ValueChange ", decimalValue);
    //   this.decimalValue = decimalValue;
    // });
  }
}
