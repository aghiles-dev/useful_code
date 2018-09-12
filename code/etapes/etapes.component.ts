import { Component, Input, OnInit } from "@angular/core";
import { Etapes } from "./etapes";

@Component({
  selector: "app-etapes",
  templateUrl: "./etapes.component.html",
  styleUrls: ["./etapes.component.scss"]
})
export class EtapesComponent implements OnInit {
  readonly FULL_WIDTH: number = 100;

  @Input() currentEtapeIndex: number;
  @Input() etapes: Etapes[] = [];

  etapeWidth: number;

  constructor() {}

  ngOnInit() {
    this.etapeWidth = this.etapes.length
      ? this.FULL_WIDTH / this.etapes.length
      : this.FULL_WIDTH;
  }

  getEtapeWidth(): number {
    return this.etapes.length
      ? this.FULL_WIDTH / this.etapes.length
      : this.FULL_WIDTH;
  }

  getEtapeStatus(etapeIndex: number): string {
    if (this.currentEtapeIndex === etapeIndex) {
      return "current";
    }
    if (this.isEtapePrevious(etapeIndex)) {
      return "previous";
    }
    return "next";
  }

  isEtapePrevious(etapeIndex: number): boolean {
    return etapeIndex < this.currentEtapeIndex;
  }
}
