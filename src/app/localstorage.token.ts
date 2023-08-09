import { InjectionToken } from "@angular/core";

export const localstoragetokken = new InjectionToken<any> ('local storage' , {
    providedIn:'root',
    factory() {
        return localStorage;
    },

})