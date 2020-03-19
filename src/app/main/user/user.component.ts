import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from './user.service';
import { CoreService } from 'app/core/core.service';
import { APP_CONSTANTS } from 'app/app.constant';

@Component({
  selector: 'app-users-listing',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
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
  users: any;
  keyword: string;
  startDate = '';
  endDate = '';
  searchtxtControl = new FormControl();
  sortOption: any;

  constructor(
    private userService: UserService,
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
    this.users = [];
    this.coreService.setTitle('Users');
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
        this.selectedItem.push(selectedEle.userId);
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
    this.userService.userList(data).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.selected = [];
          this.selectedItem = [];
          this.users = res.data && res.data.result;
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
            this.userService.updateStatus(clones).subscribe(
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
            this.userService.deleteUser(clones).subscribe(
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
