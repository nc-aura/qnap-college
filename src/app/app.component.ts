import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from './_services/modal.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, Inject, Injectable, Host } from '@angular/core';
import { CategoryService } from './_services/category.service';
import { Category } from './_models/category';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SearchService } from './_services/search.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';

import reframe from 'reframe.js';
import { NgxScreensizeService } from './modules/ngx-screensize/_services/ngx-screensize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private _ssService: NgxScreensizeService) {

  }
  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this._ssService.sizeClass());
  }

  ngOnDestroy() {}
}