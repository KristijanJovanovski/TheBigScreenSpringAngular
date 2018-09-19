import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TmdbImage } from './tmdb-image.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TmdbImage>;

@Injectable()
export class TmdbImageService {

    private resourceUrl =  SERVER_API_URL + 'api/tmdb-images';

    constructor(private http: HttpClient) { }

    create(tmdbImage: TmdbImage): Observable<EntityResponseType> {
        const copy = this.convert(tmdbImage);
        return this.http.post<TmdbImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tmdbImage: TmdbImage): Observable<EntityResponseType> {
        const copy = this.convert(tmdbImage);
        return this.http.put<TmdbImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TmdbImage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TmdbImage[]>> {
        const options = createRequestOption(req);
        return this.http.get<TmdbImage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TmdbImage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TmdbImage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TmdbImage[]>): HttpResponse<TmdbImage[]> {
        const jsonResponse: TmdbImage[] = res.body;
        const body: TmdbImage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TmdbImage.
     */
    private convertItemFromServer(tmdbImage: TmdbImage): TmdbImage {
        const copy: TmdbImage = Object.assign({}, tmdbImage);
        return copy;
    }

    /**
     * Convert a TmdbImage to a JSON which can be sent to the server.
     */
    private convert(tmdbImage: TmdbImage): TmdbImage {
        const copy: TmdbImage = Object.assign({}, tmdbImage);
        return copy;
    }
}
