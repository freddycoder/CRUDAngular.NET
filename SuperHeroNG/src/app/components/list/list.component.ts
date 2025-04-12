import { Component, inject } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { OpenApiService } from 'src/app/services/openapi.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Schema } from 'src/app/models/openapi';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    MatCardModule,
    MatTableModule,
    EditComponent,
    MatButtonModule
  ],
})
export class ListComponent {
  private readonly api = inject(OpenApiService);
  private readonly route = inject(ActivatedRoute);

  entityList: any[] = [];
  selectedEntity?: any;
  entityName: string = "";

  schema?: Schema;
  columnToDisplay: string[] = [];
  fields?: string[];

  ngOnInit() {
    this.route.url.subscribe(segment => {
      this.entityName = segment[0].path;

      this.api
        .get<any>(this.entityName)
        .subscribe(result => {
          this.entityList = result;
        });

      this.api.getOpenAPISpec().subscribe(result => {
        this.columnToDisplay = [];

        this.schema = result.components.schemas[this.entityName];
        if (this.schema === undefined) {
          this.fields = undefined;
        }
        else {
          this.fields = Object.keys(this.schema.properties);
          this.columnToDisplay = [...this.fields];
        }

        this.columnToDisplay.push('button');
      });
    });
  }

  initNew() {
    this.selectedEntity = {};
  }

  edit(entity: any) {
    this.selectedEntity = entity;
  }

  entitiesUpdated(entities: any[]) {
    this.entityList = entities;
  }
}
