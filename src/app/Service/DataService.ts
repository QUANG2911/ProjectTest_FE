import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Để service có phạm vi toàn cục
})
export class DataService {
  private sharedData = new BehaviorSubject<any>(null);

  setData(data: any): void {
    this.sharedData.next(data);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('sharedData', JSON.stringify(data));
    }    
  }

  getData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('sharedData');
      if (storedData) {
        this.sharedData.next(JSON.parse(storedData));
      } else {
        console.warn('No data found in localStorage');
      }
    }
  }
  currentData = this.sharedData.asObservable();



  private userId: string | null = null; // Biến lưu trữ ID người dùng
  private userIdKey = 'userId'; // Khóa để lưu trữ trong localStorage

  // Phương thức để set ID người dùng
  setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem(this.userIdKey, id); // Lưu vào localStorage
  }

  // Phương thức để lấy ID người dùng
  getUserId(): any  {
    if (!this.userId) {
      this.userId = localStorage.getItem(this.userIdKey); // Lấy từ localStorage nếu chưa có trong biến
    }
    return this.userId;
  }
}
