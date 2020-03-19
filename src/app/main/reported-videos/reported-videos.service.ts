import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportedVideosService {
  constructor(private httpService: HttpClient) {}

  getReportedVideos(filterObj): Observable<any> {
    return this.httpService.post('Complaint/GetVideoComplaintList', filterObj);
  }

  getComplaintById(id): Observable<any> {
    return this.httpService.get('Complaint/get/' + id);
  }

  deleteComplaint(data): Observable<any> {
    return this.httpService.post('Complaint/Delete', data);
  }
}
