import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { DpatService, Dpat } from 'app/services/dpat.service';

@Component({
    templateUrl:'dpat-detail.component.html',
    styleUrls:['dpat-detail.component.css'],
})
export class DpatDetailComponent{
    dpat:Dpat;
    loading= true;

    constructor(
        private appService: AppService,
        private dpatService: DpatService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){}
    ngOnInit():void{
        this.loading=true;
        this.dpat = new Dpat();
        const id= this.activatedRoute.snapshot.params['id'];
        this.dpatService.getDpatById(id).subscribe(
            resp=>
            {
                // console.log(resp);
                if (resp.data.length === 0 || resp.data == '') {
                    this.appService.showAlert('danger', 'Data DPAT tidak ditemukan.');
                    window.history.back();
                    return;
                }
                this.dpat=resp.data;
                this.loading=false;
            },
            error=>{
                this.appService.showAlert('danger',error.statusText);
                window.history.back();
            }
        );
        // this.activatedRoute.paramMap
        //     .switchMap((params: ParamMap)=>this.dpatService.getDpatById(+params.get('id')))
        //     .subscribe(resp=>this.dpat=resp);
    }
}
