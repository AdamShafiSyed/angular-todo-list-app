import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo!: Todo;
  @Output() todoClicked: EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() editClicked: EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() deleteClicked: EventEmitter<Todo> = new EventEmitter<Todo>()
  constructor() { }

  ngOnInit(): void {
  }

  onTodoClick(){
    this.todoClicked.emit(this.todo)
  }
  onEditClicked(){
    this.editClicked.emit(this.todo);
  }

  onDeleteClicked(){
    this.deleteClicked.emit(this.todo);
  }
}
