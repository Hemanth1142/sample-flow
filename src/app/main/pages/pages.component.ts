import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PagesService } from './pages.service';
import { APP_CONSTANTS } from 'app/app.constant';
import { CoreService } from 'app/core/core.service';

@Component({
  selector: 'app-pages-listing',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit {
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  rows = [];
  pageInfo: any = {
    count: 0,
    page: 1,
    pageSize: APP_CONSTANTS.DATA_TABLE.RECORDS_PER_PAGE
  };
  selected = [];
  selectedItem = [];
  pages: any;
  keyword: string;
  startDate = '';
  endDate = '';
  searchtxtControl = new FormControl();
  sortOption: any;

  constructor(
    private pageService: PagesService,
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
    this.pages = [];
    this.coreService.setTitle('Pages');
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
        this.selectedItem.push(selectedEle.id);
      });
    } else {
      this.selectedItem = [];
    }
  }

  setPage(pageInfo) {
    this.pageInfo.page = pageInfo.offset + 1;
    this.getData();
  }

  getData() {
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
    this.pageService.getPageList(data).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.selected = [];
          this.selectedItem = [];
          this.pages = res.data && res.data.result;
          this.pageInfo.count = res.data && res.data.total;
        }
      },
      error => {}
    );
  }

  onSort(event) {
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

  refreshList() {
    this.pageInfo.page = 1;
    this.getData();
  }
}
