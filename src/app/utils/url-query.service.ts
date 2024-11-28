import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlQueryService {

  constructor() { }

  setUrlQuery(data: any) {
    let query = '';
    Object.keys(data).forEach(k => (data[k] === undefined ||  data[k] === null || data[k] === '') ? delete data[k] : '');
    Object.keys(data).forEach(k => {
      query = query + k + '=' + data[k] + '&';
    });
    return query;
  }
}
