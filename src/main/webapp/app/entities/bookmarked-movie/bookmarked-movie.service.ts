import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BookmarkedMovie } from './bookmarked-movie.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BookmarkedMovie>;

@Injectable()
export class BookmarkedMovieService {

    private resourceUrl =  SERVER_API_URL + 'api/bookmarked-movies';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bookmarkedMovie: BookmarkedMovie): Observable<EntityResponseType> {
        const copy = this.convert(bookmarkedMovie);
        return this.http.post<BookmarkedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bookmarkedMovie: BookmarkedMovie): Observable<EntityResponseType> {
        const copy = this.convert(bookmarkedMovie);
        return this.http.put<BookmarkedMovie>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BookmarkedMovie>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BookmarkedMovie[]>> {
        const options = createRequestOption(req);
        return this.http.get<BookmarkedMovie[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BookmarkedMovie[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BookmarkedMovie = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BookmarkedMovie[]>): HttpResponse<BookmarkedMovie[]> {
        const jsonResponse: BookmarkedMovie[] = res.body;
        const body: BookmarkedMovie[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BookmarkedMovie.
     */
    private convertItemFromServer(bookmarkedMovie: BookmarkedMovie): BookmarkedMovie {
        const copy: BookmarkedMovie = Object.assign({}, bookmarkedMovie);
        copy.createdOn = this.dateUtils
            .convertDateTimeFromServer(bookmarkedMovie.createdOn);
        return copy;
    }

    /**
     * Convert a BookmarkedMovie to a JSON which can be sent to the server.
     */
    private convert(bookmarkedMovie: BookmarkedMovie): BookmarkedMovie {
        const copy: BookmarkedMovie = Object.assign({}, bookmarkedMovie);

        copy.createdOn = this.dateUtils.toDate(bookmarkedMovie.createdOn);
        return copy;
    }
}
