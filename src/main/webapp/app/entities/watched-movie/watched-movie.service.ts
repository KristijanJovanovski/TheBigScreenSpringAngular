import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WatchedMovie } from './watched-movie.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WatchedMovie>;

@Injectable()
export class WatchedMovieService {

    private resourceUrl =  SERVER_API_URL + 'api/watched-movies';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(watchedMovie: WatchedMovie): Observable<EntityResponseType> {
        const copy = this.convert(watchedMovie);
        return this.http.post<WatchedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(watchedMovie: WatchedMovie): Observable<EntityResponseType> {
        const copy = this.convert(watchedMovie);
        return this.http.put<WatchedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WatchedMovie>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WatchedMovie[]>> {
        const options = createRequestOption(req);
        return this.http.get<WatchedMovie[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WatchedMovie[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WatchedMovie = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WatchedMovie[]>): HttpResponse<WatchedMovie[]> {
        const jsonResponse: WatchedMovie[] = res.body;
        const body: WatchedMovie[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WatchedMovie.
     */
    private convertItemFromServer(watchedMovie: WatchedMovie): WatchedMovie {
        const copy: WatchedMovie = Object.assign({}, watchedMovie);
        copy.createdOn = this.dateUtils
            .convertDateTimeFromServer(watchedMovie.createdOn);
        return copy;
    }

    /**
     * Convert a WatchedMovie to a JSON which can be sent to the server.
     */
    private convert(watchedMovie: WatchedMovie): WatchedMovie {
        const copy: WatchedMovie = Object.assign({}, watchedMovie);

        copy.createdOn = this.dateUtils.toDate(watchedMovie.createdOn);
        return copy;
    }
}
