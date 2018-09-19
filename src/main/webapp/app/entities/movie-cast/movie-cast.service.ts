import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MovieCast } from './movie-cast.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MovieCast>;

@Injectable()
export class MovieCastService {

    private resourceUrl =  SERVER_API_URL + 'api/movie-casts';

    constructor(private http: HttpClient) { }

    create(movieCast: MovieCast): Observable<EntityResponseType> {
        const copy = this.convert(movieCast);
        return this.http.post<MovieCast>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(movieCast: MovieCast): Observable<EntityResponseType> {
        const copy = this.convert(movieCast);
        return this.http.put<MovieCast>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MovieCast>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MovieCast[]>> {
        const options = createRequestOption(req);
        return this.http.get<MovieCast[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MovieCast[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MovieCast = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MovieCast[]>): HttpResponse<MovieCast[]> {
        const jsonResponse: MovieCast[] = res.body;
        const body: MovieCast[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MovieCast.
     */
    private convertItemFromServer(movieCast: MovieCast): MovieCast {
        const copy: MovieCast = Object.assign({}, movieCast);
        return copy;
    }

    /**
     * Convert a MovieCast to a JSON which can be sent to the server.
     */
    private convert(movieCast: MovieCast): MovieCast {
        const copy: MovieCast = Object.assign({}, movieCast);
        return copy;
    }
}
