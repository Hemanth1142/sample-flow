import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-data-detail-dialog',
  templateUrl: './data-detail-dialog.component.html',
  styleUrls: ['./data-detail-dialog.component.scss']
})
export class DataDetailDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
