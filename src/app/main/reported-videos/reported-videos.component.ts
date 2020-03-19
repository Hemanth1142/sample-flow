import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { APP_CONSTANTS } from 'app/app.constant';
import { FormControl } from '@angular/forms';
import { CoreService } from 'app/core/core.service';
import { debounceTime } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ReportedVideosService } from './reported-videos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reported-videos',
  templateUrl: './reported-videos.component.html',
  styleUrls: ['./reported-videos.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ReportedVideosComponent implements OnInit {
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
  reportedVideos: any[];
  keyword: string;
  startDate = '';
  endDate = '';
  searchtxtControl = new FormControl();
  sortOption: any;
  pipe = new DatePipe('en-US');

  constructor(
    private coreService: CoreService,
    private repoetedVideosService: ReportedVideosService
  ) {}

  ngOnInit() {
    this.canAdd = true;
    this.canUpdate = true;
    this.canDelete = true;
    this.sortOption = {
      key: 'createdDate',
      value: 'desc'
    };
    this.reportedVideos = [];
    this.coreService.setTitle('Reported Videos');
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
        this.selectedItem.push(selectedEle.complaintId);
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
    this.repoetedVideosService.getReportedVideos(data).subscribe(
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
          this.reportedVideos = res.data && res.data.result;
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
            this.repoetedVideosService.deleteComplaint(clones).subscribe(
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

  showUserInfo(id) {
    this.coreService.getUserById(id).subscribe((res: any) => {
      if (res.status) {
        const claims = {
          header: 'Reported By',
          statusChange: {
            show: true,
            value: res.data.isActive,
            disable: true
          },
          image: {
            lable: 'Profile Image',
            src: res.data.image,
            alt: res.data.userName
          },
          data: [
            {
              lable: 'Username',
              value: res.data.userName
            },
            {
              lable: 'Email',
              value: res.data.email
            },
            {
              lable: 'Phone Number',
              value: res.data.mobileNumber
            },
            {
              lable: 'Verified User',
              value: res.data.isVerified ? 'Yes' : 'No'
            },
            {
              lable: 'Bio Description',
              value: res.data.bioDescription
            }
          ]
        };

        this.coreService
          .showDetailDataDialog(claims)
          .afterClosed()
          .subscribe(result => {});
      } else {
        this.coreService.showSnackbar(res.message, '', 'fail');
      }
    });
  }

  showReportInfo(id) {
    this.repoetedVideosService.getComplaintById(id).subscribe((res: any) => {
      if (res.status) {
        const claims = {
          header: 'Reported Videos',
          statusChange: {
            show: false,
            value: true
          },
          image: false,
          data: [
            {
              lable: 'Title',
              value: res.data.title
            },
            {
              lable: 'Reported By',
              value: res.data.reportedByUser
            },
            {
              lable: 'Reason',
              value: res.data.reason
            },
            {
              lable: 'Message',
              value: res.data.message
            },
            {
              lable: 'Reported On',
              value: this.pipe.transform(
                res.data.createdDate,
                'd MMM, y,  hh:mm a'
              )
            }
          ]
        };
        this.coreService
          .showDetailDataDialog(claims)
          .afterClosed()
          .subscribe(result => {});
      } else {
        this.coreService.showSnackbar(res.message, '', 'fail');
      }
    });
  }
}
