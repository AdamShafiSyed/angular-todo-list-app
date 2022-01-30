import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  showValidationErrorMsg: boolean = false;
  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm){
    if(form && !form.invalid){
      this.dataService.addTodo(new Todo(form.value.text));
      this.showValidationErrorMsg = false;
      form.reset();
    } else{
      this.showValidationErrorMsg = true
    }

  }

  todoCompleted(todo: Todo){
    todo.completed = !todo.completed
  }

  editTodo(todo: Todo){
    let index = this.todos.indexOf(todo);
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      this.dataService.updateTodo(index, result)
    })
  }

  deleteTodo(todo: Todo){
    let index = this.todos.indexOf(todo);
    this.dataService.deleteTodo(index);
  }

}
