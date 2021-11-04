import { DefaultGlobalConfig, ToastrService } from 'ngx-toastr';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector, private ngZone: NgZone) {}

  handleError(error: any): void {
    if (
      error.error instanceof HttpErrorResponse ||
      (error['rejection'] && error['rejection'] instanceof HttpErrorResponse)
    ) {
      const httpError: HttpErrorResponse = error['rejection']
        ? error['rejection']
        : error;
      if (!navigator.onLine) {
        // Handle offline error
        // this.router.navigate(['noInternet']);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.log(httpError);

        this.showToastr(httpError);
      }
    }

    console.error(error);
  }

  showToastr(error: any) {
    this.ngZone.run(() => {
      const toastr = this.injector.get(ToastrService);
      const message = error.error.message;
      toastr.error(message, '', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        closeButton: true,
        easing: 'ease-in',
      });
    });
  }
}
