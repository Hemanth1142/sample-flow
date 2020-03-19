import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private http: HttpClient) {}

  getPageList(filterObj) {
    return this.http.post('CMSPage/GetList', filterObj);
  }

  getPageById(id) {
    return this.http.get('CMSPage/Get/' + id);
  }

  updatePage(data) {
    return this.http.post('CMSPage/Save', data);
  }
}
