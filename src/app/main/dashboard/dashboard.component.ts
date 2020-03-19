import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

import { UserService } from '../../auth/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
  dashboardWidgets: any[];
  user: any;
  constructor(
    public router: Router,
    private userService: UserService,
    private httpService: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardWidgets = [];
    this.user = this.userService.userInfo || null;
    this.httpService.get('dashboard').subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dashboardWidgets = [
            {
              icon: 'person',
              text: 'Users',
              count: res.data.userCount,
              link: '/user'
            },
            {
              icon: 'list',
              text: 'Categories',
              count: res.data.categoryCount,
              link: '/category'
            }
          ];
        }
      },
      error => {}
    );
  }
}
