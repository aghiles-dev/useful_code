import { Component, OnInit } from "@angular/core";
import { ViewHandlerService } from "../../shared/view-handler/view-handler.service";
import { WindowService } from "../../shared/window/window.service";

@Component({
  selector: "app-scroll-top-arrow",
  templateUrl: "./scroll-top-arrow.component.html",
  styleUrls: ["./scroll-top-arrow.component.scss"]
})
export class ScrollTopArrowComponent implements OnInit {
  VERTICAL_OFFSET = 100;

  scrollValue: number;

  constructor(
    private viewHandlerService: ViewHandlerService,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.windowService.window.addEventListener(
      "scroll",
      () => {
        this.scrollValue = this.windowService.window.scrollY;
      },
      true
    );
  }

  get isScrollActivated() {
    return this.scrollValue > this.VERTICAL_OFFSET;
  }

  scrollToTop(): void {
    this.viewHandlerService.scrollWindowToTop();
  }
}
