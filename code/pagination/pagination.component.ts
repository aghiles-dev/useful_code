import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Output() onPaginationChange: EventEmitter<number> = new EventEmitter();

  @Input() totalItemList: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;

  selectedPage: number = 1;
  numberPages: number;
  arrayOfPages: number[] = [];

  constructor() {}

  ngOnInit() {
    this.refreshPagerValues();
  }

  ngOnChanges() {
    this.refreshPagerValues();
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.selectedPage = this.currentPage;
    this.onPaginationChange.emit(this.currentPage);
  }

  goToPreviousPage() {
    this.currentPage--;
    this.selectedPage = this.currentPage;
    this.onPaginationChange.emit(this.currentPage);
  }

  goToSelectedPage(selectedPage) {
    this.currentPage = selectedPage;
    this.selectedPage = this.currentPage;
    this.onPaginationChange.emit(this.currentPage);
  }

  goToNextPage() {
    this.currentPage++;
    this.selectedPage = this.currentPage;
    this.onPaginationChange.emit(this.currentPage);
  }

  goToLastPage() {
    this.currentPage = this.numberPages;
    this.selectedPage = this.currentPage;
    this.onPaginationChange.emit(this.currentPage);
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    return this.currentPage >= this.numberPages;
  }

  isMoreThanOnePage(): boolean {
    return this.totalItemList > this.itemsPerPage;
  }

  refreshPagerValues(): void {
    this.numberPages = Math.ceil(this.totalItemList / this.itemsPerPage);
    this.constructArrayOfPages();
  }

  private constructArrayOfPages(): void {
    this.arrayOfPages = [];
    for (let i = 1; i <= this.numberPages; i++) {
      this.arrayOfPages.push(i);
    }
  }
}
