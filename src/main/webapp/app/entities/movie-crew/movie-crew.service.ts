import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MovieCrew } from './movie-crew.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MovieCrew>;

@Injectable()
export class MovieCrewService {

    private resourceUrl =  SERVER_API_URL + 'api/movie-crews';

    constructor(private http: HttpClient) { }

    create(movieCrew: MovieCrew): Observable<EntityResponseType> {
        const copy = this.convert(movieCrew);
        return this.http.post<MovieCrew>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(movieCrew: MovieCrew): Observable<EntityResponseType> {
        const copy = this.convert(movieCrew);
        return this.http.put<MovieCrew>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MovieCrew>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MovieCrew[]>> {
        const options = createRequestOption(req);
        return this.http.get<MovieCrew[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MovieCrew[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MovieCrew = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MovieCrew[]>): HttpResponse<MovieCrew[]> {
        const jsonResponse: MovieCrew[] = res.body;
        const body: MovieCrew[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MovieCrew.
     */
    private convertItemFromServer(movieCrew: MovieCrew): MovieCrew {
        const copy: MovieCrew = Object.assign({}, movieCrew);
        return copy;
    }

    /**
     * Convert a MovieCrew to a JSON which can be sent to the server.
     */
    private convert(movieCrew: MovieCrew): MovieCrew {
        const copy: MovieCrew = Object.assign({}, movieCrew);
        return copy;
    }
}
