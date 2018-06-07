import { Injectable } from '@angular/core';

import { ApiHelperService } from './api-helper.service';
import { ApiService } from './api.service';

@Injectable()
export class AdminApiService {

  constructor(private apiService: ApiService) {
  }

  getNews(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('news/top-headlines');
    return this.apiService.get(apiUrl, params);
  }

}
