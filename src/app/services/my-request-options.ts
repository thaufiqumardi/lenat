import { Headers } from '@angular/http';

export class MyRequestOptions {
  headers: Headers;
  params: any;

  /**
   * Create a RequestOptionsArgs, that automatically set 'Authorization' in headers.
   * @param params If params is empty, method still return headers.
   */
  constructor(params?: any) {
    this.headers = new Headers({
      'Authorization': localStorage.getItem('Authorization'),
      'Content-Type': 'application/json'
    });
    this.params = params;
  }
}
