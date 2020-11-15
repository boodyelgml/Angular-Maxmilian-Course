import { AuthService } from './auth.services';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class authInterceptorService implements HttpInterceptor{
    
    constructor(private AuthService:AuthService) {}
    
    intercept(req : HttpRequest<any> , next : HttpHandler){
        const modifiedReq = req.clone({params: new HttpParams().set('auth' , this.AuthService.token)});
        return next.handle(modifiedReq);
    }
}