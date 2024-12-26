import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../Service/DataService';

@Component({
  selector: 'app-drop-down-list',
  imports: [CommonModule],
  templateUrl: './DropDownList.component.html',
  styleUrl: './DropDownList.component.css'
})
export class DropDownListComponent implements OnInit {

  constructor(   private dataService :DataService ){}

  selectOption: any;

  defaultOption: any;
  option = [
    {name: 'Trạng thái', value: 'none'},
    {name: 'Đã duyệt', value: 1},
    {name: 'Chờ duyệt', value: 0},
    {name: 'Từ chối', value: -1}
  ];

  ngOnInit(): void {
    this.defaultOption = this.option[0];
    this.selectOption = this.defaultOption;
  }

  chooseItem(item: any)
  {
    this.dataService.setData({selectOption: item.value});

    this.selectOption = item;
   // console.log(item.value);
  }

  removeSelect(): void {
    //this.selectOption = this.defaultOption;
    this.chooseItem(this.defaultOption)
  }
  
}
