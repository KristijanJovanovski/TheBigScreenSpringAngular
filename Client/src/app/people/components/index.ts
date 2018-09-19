import { PeoplePageComponent } from './people-page/people-page.component';
import { PeopleDetailsPageComponent } from './people-details-page/people-details-page.component';
import { PeopleListComponent } from './people-list/people-list.component';


export * from './people-list/people-list.component';
export * from './people-page/people-page.component';
export * from './people-details-page/people-details-page.component';


export const components: any[] = [PeoplePageComponent, PeopleListComponent, PeopleDetailsPageComponent];
