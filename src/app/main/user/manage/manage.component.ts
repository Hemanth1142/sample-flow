import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CoreService } from 'app/core/core.service';
import { APP_CONSTANTS } from 'app/app.constant';

@Component({
  selector: 'user-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit {
  userDetails: any;
  status: boolean;

  isEdit: boolean;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.isEdit = false;
    this.userDetails = {};
    this.status = false;
    this.route.data.subscribe((data: any) => {
      if (data && data.detail) {
        this.userDetails = data.detail;
        this.isEdit = true;
        this.status = this.userDetails.isActive;
      }
    });
  }

  updateUser(status): void {
    if (this.userDetails.isActive != this.status) {
      this.status = !this.status;
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
              Ids: [this.userDetails.userId],
              Status: status
            };
            this.userService.updateStatus(clones).subscribe(
              (res: any) => {
                if (res && res.status) {
                  this.userDetails.isActive = status;
                  this.coreService.showSnackbar(res.message);
                  this.status = status;
                }
              },
              (error: any) => {}
            );
          } else {
          }
        });
    }
  }
}
