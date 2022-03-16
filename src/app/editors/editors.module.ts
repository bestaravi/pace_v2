import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodemirrorModule } from 'ng2-codemirror';


const routes: Routes = [
  { path: 'text-editor', component: TextEditorComponent },
  { path: 'code-editor', component: CodeEditorComponent },
]

@NgModule({
  declarations: [TextEditorComponent, CodeEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSummernoteModule,
    HttpClientModule,
    EditorModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [
  ]
})
export class EditorsModule { }
