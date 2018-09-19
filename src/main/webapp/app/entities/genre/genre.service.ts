import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Genre } from './genre.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Genre>;

@Injectable()
export class GenreService {

    private resourceUrl =  SERVER_API_URL + 'api/genres';

    constructor(private http: HttpClient) { }

    create(genre: Genre): Observable<EntityResponseType> {
        const copy = this.convert(genre);
        return this.http.post<Genre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(genre: Genre): Observable<EntityResponseType> {
        const copy = this.convert(genre);
        return this.http.put<Genre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Genre>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Genre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Genre[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Genre[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Genre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Genre[]>): HttpResponse<Genre[]> {
        const jsonResponse: Genre[] = res.body;
        const body: Genre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Genre.
     */
    private convertItemFromServer(genre: Genre): Genre {
        const copy: Genre = Object.assign({}, genre);
        return copy;
    }

    /**
     * Convert a Genre to a JSON which can be sent to the server.
     */
    private convert(genre: Genre): Genre {
        const copy: Genre = Object.assign({}, genre);
        return copy;
    }
}
