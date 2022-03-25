import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
})
export class LessonComponent implements OnInit {
  @Input() lesson!: Lesson;
  videoUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url = `https://www.youtube.com/embed/${this.lesson.videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
