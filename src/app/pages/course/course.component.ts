import { CourseDoc } from './../../_models/document';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../_models/course';
import { CourseService } from '../../_services/course.service';
import { NgForm } from '@angular/forms';
import { AddThisService } from '../../_services/addthis.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy, AfterViewInit {

  sub: Subscription;
  routeSub: Subscription;
  addThisSub: Subscription;
  course: Course;
  courses: Course [];
  youtubeSrc;
  keywords;
  constructor(
    private _route: ActivatedRoute, 
    private _courseService: CourseService, 
    private _router: Router,
    private _addThis: AddThisService,
    private _meta: MetaService) {
    this._courseService.all(4, 'watched').subscribe(
      (coursedoc: CourseDoc) => {
        this.courses = coursedoc.docs;
      },
      (error) => {
        console.log('Something went wrong');
      }
    );

    this.keywords = '';
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
    });

    this.routeSub = this._route.data.subscribe(
      (data: Data) => {
        if (data.course) {
          this.course = data.course;
          this._courseService.quickClicked(this.course);
          this.youtubeSrc = 'https://www.youtube.com/embed/' + this.course.youtube_ref;
          this.course.tags = this.course.keywords.split(',');
          this._meta.setTitle(`Page for ${this.course.title}`);
          this._meta.setTag('og:image', `//img.youtube.com/vi/${this.course.youtube_ref}/sddefault.jpg`);
        }
      });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.addThisSub = this._addThis.initAddThis('ra-5a0dd7aa711366bd', false).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.routeSub.unsubscribe();
    this.addThisSub.unsubscribe();
    this._meta.removeTag('property="og:type"');
  }

  onSubmit(f: NgForm) {
    this._router.navigate(['/search', f.value.keywords]);
  }

  checkForScript() {
    let scriptOnPage = false;
    const selector = 'script[src*="addthis_widget.js"]';
    const matches = document.querySelectorAll(selector);
    if(matches.length > 0) {
        scriptOnPage = true;
    }
    return scriptOnPage;
  }

  addScript() {
    // if script is already on page, do nothing
    if (this.checkForScript()) {
      return;
    }

    const profileId = 'ra-5a0dd7aa711366bd';
    const baseUrl = '//s7.addthis.com/js/300/addthis_widget.js';
    const scriptInFooter = true;
    var url;

    if(profileId) {
        // preference the site's profile ID in the URL, if available
        url = baseUrl + '#pubid=' + profileId;
    } else {
        url = baseUrl;
    }

    // create SCRIPT element
    let script = document.createElement('script');
    script.src = url;

    // append SCRIPT element

    if(scriptInFooter !== true && typeof document.head === 'object') {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  };
};