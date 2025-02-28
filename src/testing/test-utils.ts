import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
    }),
  ],
  exports: [TranslateModule],
})
export class TestTranslateModule {}
