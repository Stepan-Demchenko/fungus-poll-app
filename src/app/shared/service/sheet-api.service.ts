import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetApiService {

  constructor(private readonly http: HttpClient) { }

  save(data: any): Observable<unknown> {
    const d = new Date();
    const date = d.toISOString().slice(0, 10).replace('-', '.').toString();
    const time = `${d.getHours()} : ${d.getMinutes()}`;
    return this.http.post('https://sheetdb.io/api/v1/ll84t3gv93soa', {
      date,
      time,
      ...data
    });
  }
}
