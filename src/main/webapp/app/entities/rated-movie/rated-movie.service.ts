import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RatedMovie } from './rated-movie.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RatedMovie>;

@Injectable()
export class RatedMovieService {

    private resourceUrl =  SERVER_API_URL + 'api/rated-movies';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ratedMovie: RatedMovie): Observable<EntityResponseType> {
        const copy = this.convert(ratedMovie);
        return this.http.post<RatedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ratedMovie: RatedMovie): Observable<EntityResponseType> {
        const copy = this.convert(ratedMovie);
        return this.http.put<RatedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RatedMovie>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RatedMovie[]>> {
        const options = createRequestOption(req);
        return this.http.get<RatedMovie[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RatedMovie[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RatedMovie = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RatedMovie[]>): HttpResponse<RatedMovie[]> {
        const jsonResponse: RatedMovie[] = res.body;
        const body: RatedMovie[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RatedMovie.
     */
    private convertItemFromServer(ratedMovie: RatedMovie): RatedMovie {
        const copy: RatedMovie = Object.assign({}, ratedMovie);
        copy.createdOn = this.dateUtils
            .convertDateTimeFromServer(ratedMovie.createdOn);
        return copy;
    }

    /**
     * Convert a RatedMovie to a JSON which can be sent to the server.
     */
    private convert(ratedMovie: RatedMovie): RatedMovie {
        const copy: RatedMovie = Object.assign({}, ratedMovie);

        copy.createdOn = this.dateUtils.toDate(ratedMovie.createdOn);
        return copy;
    }
}
