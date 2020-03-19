import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatDialog
} from '@angular/material';

import { BehaviorSubject } from 'rxjs';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';
import { DataDetailDialogComponent } from 'app/shared/data-detail-dialog/data-detail-dialog.component';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoreService {
  onToastNotification: BehaviorSubject<any>;
  ckEditorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'alignment',
      'strikethrough',
      'code',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      '|',
      'undo',
      'redo',
      '|',
      'fontSize',
      'fontFamily',
      'fontBackgroundColor',
      'fontColor'
    ],
    autoParagraph: false
  };
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private sidebarService: FuseSidebarService,
    private dialog: MatDialog,
    private titleService: Title,
    private http: HttpClient
  ) {
    this.onToastNotification = new BehaviorSubject({});
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  showSnackbar(
    message: string = '',
    actionName: string = '',
    panelClass: string = 'success',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    duration: number = 2000
  ): void {
    this.snackBar.open(message, actionName, {
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      panelClass:
        panelClass === 'success'
          ? 'app-snackbar-success'
          : 'app-snackbar-falure',
      duration: duration
    });
  }

  showDialog(title = 'Please Confirm', message = 'Are you sure?'): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef;
  }

  getUserById(id) {
    return this.http.get('User/get/' + id);
  }

  showDetailDataDialog(data): any {
    const dialogRef = this.dialog.open(DataDetailDialogComponent, {
      panelClass: 'detail-data-dialog-container',
      width: '700px',
      data
    });

    return dialogRef;
  }

  setTitle(title: string, prefix: string = 'Activ::'): void {
    this.titleService.setTitle(prefix + title);
  }

  public checkFiles(
    files: any,
    size: number,
    types: { image: boolean; pdf: boolean }
  ): boolean {
    let isError = false;
    const fileTypes = [];
    if (types.image) {
      fileTypes.push('image/png', 'image/jpeg', 'image/jpg', 'image/gif');
    }
    if (types.pdf) {
      fileTypes.push('application/pdf');
    }

    for (let index = 0; index < files.length; index++) {
      if (!isError) {
        const file = files[index];

        if (fileTypes.indexOf(file.type) === -1) {
          this.showSnackbar(
            'File type is not acceptable. Valid extensions : png,jpg,jpeg,jpe.',
            '',
            'fail'
          );
          isError = true;
          break;
        } else if (file.size > size) {
          this.showSnackbar('File size is too large.', '', 'fail');
          isError = true;
          break;
        }
      }
    }

    return isError;
  }

  showToast(message = 'Loading data...'): void {
    this.onToastNotification.next({ message: message, operation: 'show' });
  }

  hideToast(): void {
    this.onToastNotification.next({ operation: 'hide' });
  }

  toggleSidebar(key): void {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  getSortOrder(name, searchParameters, sidx, sord): string {
    return name === searchParameters[sidx]
      ? searchParameters[sord] === 'asc'
        ? 'desc'
        : searchParameters[sord] === 'desc'
        ? ''
        : 'asc'
      : 'asc';
  }

  markAsTouchedFormControls(form): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  deepCopy(value): any[] {
    return value ? JSON.parse(JSON.stringify(value)) : [];
  }
}
