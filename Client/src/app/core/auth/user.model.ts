export interface User {
    id: 3;
    login: string;
    firstName?: string;
    lastName?: string;
    email: string;
    imageUrl?: string;
    activated: string;
    langKey?: string;
    createdBy: string;
    createdDate: Date; // string;
    lastModifiedBy: string;
    lastModifiedDate: Date; // string;
    authorities: string[];
}
