import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CategoryService } from './category.service';
import { APP_CONSTANTS } from 'app/app.constant';
import { CoreService } from 'app/core/core.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  pageInfo: any = {
    count: 0,
    page: 1,
    pageSize: APP_CONSTANTS.DATA_TABLE.RECORDS_PER_PAGE
  };
  selected = [];
  selectedItem = [];
  categories: any[];
  keyword: string;
  startDate = '';
  endDate = '';
  searchtxtControl = new FormControl();
  sortOption: any;

  constructor(
    private categoryService: CategoryService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.canAdd = true;
    this.canUpdate = true;
    this.canDelete = true;
    this.sortOption = {
      key: 'createdDate',
      value: 'desc'
    };
    this.categories = [];
    this.coreService.setTitle('Categories');
    this.getData();
    this.searchtxtControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((value: any) => {
        this.keyword = value;
        this.pageInfo.page = 1;
        this.getData();
      });
  }

  onSelect({ selected }) {
    if (selected && selected.length > 0) {
      this.selectedItem = [];
      selected.forEach(selectedEle => {
        this.selectedItem.push(selectedEle.categoryId);
      });
    } else {
      this.selectedItem = [];
    }
  }

  setPage(pageInfo): void {
    this.pageInfo.page = pageInfo.offset + 1;
    this.getData();
  }

  getData(): void {
    const data = {};
    data['pageNo'] = this.pageInfo.page;
    data['pageSize'] = this.pageInfo.pageSize;
    data['sortField'] =
      this.sortOption && this.sortOption.key ? this.sortOption.key : '';
    data['sortOrder'] =
      this.sortOption && this.sortOption.value ? this.sortOption.value : '';
    if (this.keyword) {
      data['keyword'] = this.keyword;
    }
    if (this.startDate) {
      data['startDate'] = this.startDate;
    }
    if (this.endDate) {
      data['endDate'] = this.endDate;
    }
    this.categoryService.getCategoryList(data).subscribe(
      (res: any) => {
        if (res && res.status) {
          if (
            res.data.total > 0 &&
            res.data.result.length == 0 &&
            this.pageInfo.page > 1
          ) {
            this.pageInfo.page--;
            this.getData();
          }
          this.selected = [];
          this.selectedItem = [];
          this.categories = res.data && res.data.result;
          this.pageInfo.count = res.data && res.data.total;
        }
      },
      error => {}
    );
  }

  onSort(event): void {
    this.pageInfo.page = 1;
    this.sortOption = {};
    this.sortOption['key'] = event.sorts[0].prop;
    this.sortOption['value'] = event.sorts[0].dir;
    this.getData();
  }

  onPaginate(e) {
    this.pageInfo.page = e.page;
    this.getData();
  }

  changeStatus(status): void {
    if (this.selectedItem && this.selectedItem.length) {
      this.coreService
        .showDialog(
          status ? 'Active' : 'Inactive',
          status
            ? APP_CONSTANTS.MESSAGES.ACTIVE
            : APP_CONSTANTS.MESSAGES.IN_ACTIVE
        )
        .afterClosed()
        .subscribe(result => {
          if (result) {
            const clones = {
              Ids: this.selectedItem,
              Status: status
            };
            this.categoryService.updateCategoryStatus(clones).subscribe(
              (res: any) => {
                if (res && res.status) {
                  this.coreService.showSnackbar(res.message);
                  this.getData();
                }
              },
              (error: any) => {}
            );
          } else {
            this.selected = [];
            this.selectedItem = [];
          }
        });
    } else {
      this.coreService.showSnackbar(
        APP_CONSTANTS.MESSAGES.SELECTED_NONE,
        '',
        'fail'
      );
    }
  }

  delete() {
    if (this.selectedItem && this.selectedItem.length) {
      this.coreService
        .showDialog('Delete', APP_CONSTANTS.MESSAGES.DELETE)
        .afterClosed()
        .subscribe(result => {
          if (result) {
            const clones = {
              Ids: this.selectedItem
            };
            this.categoryService.deleteCategory(clones).subscribe(
              (res: any) => {
                if (res && res.status) {
                  this.coreService.showSnackbar(res.message);
                  this.getData();
                }
              },
              (error: any) => {}
            );
          } else {
            this.selected = [];
            this.selectedItem = [];
          }
        });
    } else {
      this.coreService.showSnackbar(
        APP_CONSTANTS.MESSAGES.SELECTED_NONE,
        '',
        'fail'
      );
    }
  }
  refreshList() {
    this.pageInfo.page = 1;
    this.getData();
  }
}
