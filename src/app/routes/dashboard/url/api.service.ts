import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSV() {
    return this.http.get<any>('https://61e25c593050a10017682154.mockapi.io/api/SV').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getSvbyId(id: number) {
    return this.http.get<any>(`https://61e25c593050a10017682154.mockapi.io/api/SV/${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  postSV(data: any) {
    return this.http.post<any>('https://61e25c593050a10017682154.mockapi.io/api/SV/', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  updateSV(data: any, id: number) {
    return this.http.put<any>(`https://61e25c593050a10017682154.mockapi.io/api/SV/${id}`, data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  deleteSV(id: number) {
    return this.http.delete<any>(`https://61e25c593050a10017682154.mockapi.io/api/SV/${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
