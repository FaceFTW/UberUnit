//Base Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//External Dependencies
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { KatexModule } from 'ng-katex';

//NgModule Config Imports
import { PERSISTENCE } from '@angular/fire/auth';

//Internal Components
import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ConvertFormComponent } from './convert-form/convert-form.component';

//Internal Services
import { ConverterService } from './services/converter.service';
import { HistoryService } from './services/history.service';
import { FavoritesService } from './services/favorites.service';

@NgModule({
	declarations: [
		AppComponent,
		HistoryComponent,
		FavoritesComponent,
		ConvertFormComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		MatSelectModule,
		KatexModule,
		MatInputModule,
		FormsModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
