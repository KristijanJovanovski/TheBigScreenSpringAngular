import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Movie } from './movie.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Movie>;

@Injectable()
export class MovieService {

    private resourceUrl =  SERVER_API_URL + 'api/movies';

    constructor(private http: HttpClient) { }

    create(movie: Movie): Observable<EntityResponseType> {
        const copy = this.convert(movie);
        return this.http.post<Movie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(movie: Movie): Observable<EntityResponseType> {
        const copy = this.convert(movie);
        return this.http.put<Movie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Movie>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Movie[]>> {
        const options = createRequestOption(req);
        return this.http.get<Movie[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Movie[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Movie = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Movie[]>): HttpResponse<Movie[]> {
        const jsonResponse: Movie[] = res.body;
        const body: Movie[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Movie.
     */
    private convertItemFromServer(movie: Movie): Movie {
        const copy: Movie = Object.assign({}, movie);
        return copy;
    }

    /**
     * Convert a Movie to a JSON which can be sent to the server.
     */
    private convert(movie: Movie): Movie {
        const copy: Movie = Object.assign({}, movie);
        return copy;
    }
}
