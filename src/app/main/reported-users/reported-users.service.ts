import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportedUsersService {
  constructor(private httpService: HttpClient) {}

  getReportedUsers(filterObj): Observable<any> {
    return this.httpService.post('Complaint/GetUserComplaintList', filterObj);
  }

  getComplaintById(id): Observable<any> {
    return this.httpService.get('Complaint/get/' + id);
  }

  deleteComplaint(data): Observable<any> {
    return this.httpService.post('Complaint/Delete', data);
  }
}
