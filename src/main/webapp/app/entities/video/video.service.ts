import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Video } from './video.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Video>;

@Injectable()
export class VideoService {

    private resourceUrl =  SERVER_API_URL + 'api/videos';

    constructor(private http: HttpClient) { }

    create(video: Video): Observable<EntityResponseType> {
        const copy = this.convert(video);
        return this.http.post<Video>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(video: Video): Observable<EntityResponseType> {
        const copy = this.convert(video);
        return this.http.put<Video>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Video>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Video[]>> {
        const options = createRequestOption(req);
        return this.http.get<Video[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Video[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Video = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Video[]>): HttpResponse<Video[]> {
        const jsonResponse: Video[] = res.body;
        const body: Video[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Video.
     */
    private convertItemFromServer(video: Video): Video {
        const copy: Video = Object.assign({}, video);
        return copy;
    }

    /**
     * Convert a Video to a JSON which can be sent to the server.
     */
    private convert(video: Video): Video {
        const copy: Video = Object.assign({}, video);
        return copy;
    }
}
