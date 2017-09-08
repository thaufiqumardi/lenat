import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyRequestOptions } from './my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
    export class DpatService implements CanActivate{
        // serverDomain="http://localhost:4200/assets/api/";
        offset:number;
        local=[
            'http://localhost:4200/assets/api/getDpatList.json',
            'http://localhost:4200/assets/api/getDpatById.json'
        ];
        api=[
            'http://localhost:49162/api/dpat/',
            'http://localhost:49162/api/dpat/getDpatById/',
            'http://localhost:49162/api/dpat/getdpatno/'
        ]
         constructor(
             private http:Http
         ){
             
             console.log(':: Dpat Service is Runnin ::')
             this.offset=0;

         }
        
        getDpatList(){
            return this.http.get(this.api[0]).map(resp=>resp.json());
        }
        getDpatById(dpatId:number){
            const reqOpt = new MyRequestOptions({
                'dpatId':dpatId,
            })
            return this.http.get(this.api[0], reqOpt).map(resp=> resp.json());
        }
        getBapbList(){ 
            let bapbList = [
              { id: 1, text: "12345" },
              { id: 2, text: "67890" },
              { id: 3, text: "45678" }
            ];
            return bapbList;
          }
        canActivate() {
            console.log('dpatServices canActivated loaded');
            this.offset = 0;
            return true;
        }
    }
    export class Dpat{
        dpatId:number;
        noDpat:string;
        bapb:string;
        namaSupplier:string;
        status:string;
    }