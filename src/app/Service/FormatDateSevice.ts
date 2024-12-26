import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Cung cấp service ở cấp ứng dụng
})

export class FormatDateService {
  
    combineDateAndTime(date: string, time: string): Date | null {
        if (!date || !time) {
          console.error('Ngày hoặc giờ không được để trống');
          return null;
        }
    
        // Chuyển đổi ngày và giờ thành đối tượng Date
        const[timeValue, modifier] = time.split(' ');
        const [hour, minute] = timeValue.split(':').map(Number);

        const dateObject = new Date(date); // Tạo đối tượng Date từ chuỗi yyyy-mm-dd
        
        const Gio = this.convertFormat24Hour(hour, modifier);
        
        dateObject.setHours(Gio, minute, 0, 0); // Set giờ, phút
        
        console.log(dateObject);
        if (isNaN(dateObject.getTime())) {
          console.error('Ngày hoặc giờ không hợp lệ');
          return null;
        }
    
        return dateObject; // Trả về đối tượng Date
    }

    convertFormat24Hour(hour: number, modifier: string): number
    {
        if(modifier == 'PM' && hour < 12)
        {
          hour = hour + 12;
        }
        if(modifier == 'AM' && hour === 12)
          hour = 0;
        
        return hour;
    }
  }