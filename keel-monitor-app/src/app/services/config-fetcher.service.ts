import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payload } from '../factory/instruments-factory';

@Injectable({
    providedIn: 'root'
})
export class ConfigFetcherService {

    constructor(private http: HttpClient) { }

    fetchInstrumentsConfig(): Observable<Payload> {
        return this.http.get<Payload>('assets/instruments.json');
    }
}
