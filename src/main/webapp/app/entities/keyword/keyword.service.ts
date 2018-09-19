import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Keyword } from './keyword.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Keyword>;

@Injectable()
export class KeywordService {

    private resourceUrl =  SERVER_API_URL + 'api/keywords';

    constructor(private http: HttpClient) { }

    create(keyword: Keyword): Observable<EntityResponseType> {
        const copy = this.convert(keyword);
        return this.http.post<Keyword>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keyword: Keyword): Observable<EntityResponseType> {
        const copy = this.convert(keyword);
        return this.http.put<Keyword>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Keyword>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Keyword[]>> {
        const options = createRequestOption(req);
        return this.http.get<Keyword[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Keyword[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Keyword = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Keyword[]>): HttpResponse<Keyword[]> {
        const jsonResponse: Keyword[] = res.body;
        const body: Keyword[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Keyword.
     */
    private convertItemFromServer(keyword: Keyword): Keyword {
        const copy: Keyword = Object.assign({}, keyword);
        return copy;
    }

    /**
     * Convert a Keyword to a JSON which can be sent to the server.
     */
    private convert(keyword: Keyword): Keyword {
        const copy: Keyword = Object.assign({}, keyword);
        return copy;
    }
}
