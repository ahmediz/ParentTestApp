import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'parentTestApp';
  loading = false;
  loadingSubscription: Subscription;

  constructor(private uiService: UiService) {}
  ngOnInit() {
    this.loadingSubscription = this.uiService.isLoading.subscribe(
      loading => (this.loading = loading)
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
