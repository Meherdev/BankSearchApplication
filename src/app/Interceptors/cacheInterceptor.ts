import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { HttpCacheService } from '../cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // console.log("interceptor: " + req.url);
        console.log('hi im interceptor');
        
        const cacheResponse = this.cacheService[req.urlWithParams];
        if(cacheResponse){
            console.log('Response from cache');
            return Observable.of(cacheResponse);
        }

        return next.handle(req).do(event=>{
            if(event instanceof HttpResponse){
                this.cacheService[req.urlWithParams]=event;
            }
        })
    }
}