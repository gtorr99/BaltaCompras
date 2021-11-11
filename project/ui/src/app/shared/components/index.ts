import { MenuComponent } from './menu/menu.component';
import { ButtonComponent } from './button/button.component';
import { FilterComponent } from './filter/filter.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TitleComponent } from "./title/title.component";


export const components: any[] = [
    MenuComponent,
    ButtonComponent,
    FilterComponent,
    PageNotFoundComponent,
    TitleComponent,
]

export * from './menu/menu.component';
export * from './button/button.component';
export * from './filter/filter.component';
export * from './page-not-found/page-not-found.component';
export * from "./title/title.component";