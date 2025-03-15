import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Schema } from 'src/app/models/openapi';
import { OpenApiService } from 'src/app/services/openapi.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ]
})
export class EditComponent implements OnInit {
  private readonly api = inject(OpenApiService);
  private readonly route = inject(ActivatedRoute);

  @Input() entity?: any;
  @Output() entityUpdated = new EventEmitter<any[]>();

  entityName: string = "";

  schema?: Schema;
  columnToDisplay: string[] = [];
  fields?: string[];

  ngOnInit() {
    this.route.url.subscribe(segment => {
      this.entityName = segment[0].path;

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

  update(entity: any) {
    this.api.update<any>(this.entityName, entity).subscribe(result => {
      this.entityUpdated.emit(result);
    });
  }

  deleteEntity(entity: any) {
    this.api.delete<any>(this.entityName, entity.id).subscribe(result => {
      this.entityUpdated.emit(result);
      this.entity = undefined;
    });
  }

  create(entity: any) {
    this.api.create(this.entityName, entity).subscribe(result => {
      this.entityUpdated.emit(result);
    });
  }
}
