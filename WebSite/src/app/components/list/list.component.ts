import { Component, inject, OnInit } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { OpenApiService } from '../../../app/services/openapi.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, convertToParamMap, UrlSegment } from '@angular/router';
import { Schema } from '../../../app/models/openapi';

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
export class ListComponent implements OnInit {
  private readonly api = inject(OpenApiService);
  private readonly route = inject(ActivatedRoute);

  entityList: any[] = [];
  selectedEntity: any = {};
  entityName: string = "";

  schema?: Schema;
  columnToDisplay: string[] = [];
  fields?: string[];

  ngOnInit() {
    this.route.url.subscribe(segment => {
      this.init(segment);
    });
    this.init([
      {
        path: "",
        parameterMap: convertToParamMap({}),
        parameters: {}
      }
    ]);
  }

  init(segment: UrlSegment[]) {
    this.initNew();
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
