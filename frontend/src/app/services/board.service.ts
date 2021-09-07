import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  saveTask(board: any) {
    return this._http.post<any>(this.env + 'board/saveTask', board);
  }

  saveTaskImg(board: any) {
    return this._http.post<any>(this.env + 'board/saveTaskImg', board);
  }

  listTask() {
    return this._http.get<any>(this.env + 'board/listTask');
  }

  updateTask(board: any) {
    return this._http.put<any>(this.env + 'board/updateTask', board);
  }

  deleteTask(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteTask/' + board._id);
  }
}
