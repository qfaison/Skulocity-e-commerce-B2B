import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    private loader : Subject<any> = new Subject();
    loaderObject = this.loader.asObservable();

    showLoader():void{
        this.loader.next(true);
    }

    hideLoader():void{
        this.loader.next(false);
    }


}