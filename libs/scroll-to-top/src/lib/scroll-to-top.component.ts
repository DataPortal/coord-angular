import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { scrollFabAnimation } from '@coord-angular/animations';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { map, tap, distinctUntilChanged, throttleTime, takeUntil, share } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

enum ShowStatus {
  show = 'show',
  hide = 'hide'
}

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [scrollFabAnimation],
})
export class ScrollToTopComponent implements AfterViewInit, OnDestroy {
  private _destroyed$ = new Subject<void>();

  private _stateSubject = new BehaviorSubject<string>(ShowStatus.hide);
  state$ = this._stateSubject.asObservable();

  pageScrollInstance: PageScrollInstance;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
  }

  ngAfterViewInit() {
    this.pageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#top');
    const scroll$ = fromEvent(window, 'scroll').pipe(
      takeUntil(this._destroyed$),
      throttleTime(10),
      map(() => window.pageYOffset),
      map(y => {
        if (y > 100) {
          return ShowStatus.show;
        } else {
          return ShowStatus.hide;
        }
      }),
      distinctUntilChanged(),
      share(),
      tap(state => this._stateSubject.next(state)),
    );
    scroll$.subscribe();
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  scrollToTop() {
    this.pageScrollService.start(this.pageScrollInstance);
    // //use if PageScrollService not installed.
    // (function smoothscroll() {
    //   const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //   if (currentScroll > 0) {
    //     window.requestAnimationFrame(smoothscroll);
    //     window.scrollTo(0, currentScroll - currentScroll / 20);
    //   }
    // })();
  }
}
