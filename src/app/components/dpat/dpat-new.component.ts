import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AppAuthService } from 'app/services/app-auth.service';
import { DpatService } from 'app/services/dpat.service';
@Component({
    templateUrl:'./dpat-new.component.html'
})
export class DpatNewComponent implements OnInit{
    subTitle = 'Tambah Baru';
    prosessing = false;
    formDpat : FormGroup;
    constructor(
        private location: Location,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private appAuthService: AppAuthService,
        private dpatService: DpatService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){
        this.initForm();
    }
    ngOnInit(): void {
        this.prosessing=true;
        this.dpatService
    }
    initForm(){
        this.formDpat=this.formBuilder.group({
            noDpat:'DPAT/GL/XI/2017	',
            bapb:'',
            tanggalPerolehan:'',
            namaSupplier:'',
            mataAnggaran:''
        });

    }
}