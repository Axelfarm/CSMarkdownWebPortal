import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './Modules/app.module';

//Shared service
import { ReportService } from './Services/report.service';

platformBrowserDynamic().bootstrapModule(AppModule, [ReportService ]);
