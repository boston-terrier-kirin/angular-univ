import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'virtual-scrolling',
  templateUrl: 'virtual-scrolling.component.html',
  styleUrls: ['virtual-scrolling.component.css'],
})
export class VirtualScrollingComponent implements OnInit {
  items = Array.from({ length: 120000 }).map((value, i) => `Item #${i}`);

  ngOnInit() {}
}
