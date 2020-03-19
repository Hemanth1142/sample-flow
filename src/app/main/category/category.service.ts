import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpService: HttpClient) {}

  createCategory(data) {
    return this.httpService.post('Category/Save', data);
  }
  getCategoryList(filterObj) {
    return this.httpService.post('Category/GetList', filterObj);
  }

  getCategoryByID(id): Observable<any> {
    return this.httpService.get('Category/get/' + id);
  }

  updateCategory(data): Observable<any> {
    return this.httpService.post('Category/Save', data);
  }

  deleteCategory(data): Observable<any> {
    return this.httpService.post('Category/Delete', data);
  }

  updateCategoryStatus(data): Observable<any> {
    return this.httpService.post('Category/UpdateStatus', data);
  }
}
