import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollTopArrowComponent } from "./scroll-top-arrow.component";
import { ViewHandlerModule } from "../../shared/view-handler/view-handler.module";
import { WindowModule } from "../../shared/window/window.module";

@NgModule({
  imports: [CommonModule, ViewHandlerModule, WindowModule],
  declarations: [ScrollTopArrowComponent],
  exports: [ScrollTopArrowComponent]
})
export class ScrollTopArrowModule {}
