import React, {Component} from 'react'

class TorkPeDragNDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          taskID: 1,
          task: 'Walk the walk'
        },
        {
          taskID: 2,
          task: 'Talk the talk'
        },
        {
          taskID: 3,
          task: 'Jump the jump'
        },
        {
          taskID: 4,
          task: 'Hop the hop'
        },
        {
          taskID: 5,
          task: 'Skip the skip'
        }
      ],
      completedTasks: [],
      draggedTask: {}
    }
  }

  // as soon as a div element is dragged, store contents

  onDrag = (event, todoOrTask) => {
    event.preventDefault()
    this.setState({
      draggedTask: todoOrTask
    })
  }

  // used to determine what feedback is to be shown to the user

  onDragOver = event => {
    event.preventDefault()
  }

  // when a div element is dropped, update state (which causes re-render)

  onDrop = (event, parentDiv, index) => {
    console.log('index:', index, ', parentDiv:', parentDiv)
    if (index !== undefined) {
      const {completedTasks, draggedTask, todos} = this.state
      if (parentDiv === 'tasks') {
        if (
          !Object.values(completedTasks)
            .map(elem => elem.taskID)
            .includes(draggedTask.taskID)
        ) {
          this.setState({
            // completedTasks: [...completedTasks, draggedTask],
            completedTasks: [
              ...completedTasks.slice(0, index),
              draggedTask,
              ...completedTasks.slice(index)
            ],
            todos: todos.filter(task => task.taskID !== draggedTask.taskID),
            draggedTask: {}
          })
        }
        event.stopPropagation() // prevent parent from calling onDrop
      } else if (parentDiv === 'todos') {
        if (
          !Object.values(todos)
            .map(elem => elem.taskID)
            .includes(draggedTask.taskID)
        ) {
          this.setState({
            // todos: [...todos, draggedTask],
            todos: [
              ...todos.slice(0, index),
              draggedTask,
              ...todos.slice(index)
            ],
            completedTasks: completedTasks.filter(
              task => task.taskID !== draggedTask.taskID
            ),
            draggedTask: {}
          })
        }
        event.stopPropagation() // prevent parent from calling onDrop
      }
    } else {
      const {completedTasks, draggedTask, todos} = this.state
      if (parentDiv === 'tasks') {
        if (
          !Object.values(completedTasks)
            .map(elem => elem.taskID)
            .includes(draggedTask.taskID)
        ) {
          this.setState({
            completedTasks: [...completedTasks, draggedTask],
            todos: todos.filter(task => task.taskID !== draggedTask.taskID),
            draggedTask: {}
          })
        }
        event.stopPropagation() // prevent parent from calling onDrop
      } else if (parentDiv === 'todos') {
        if (
          !Object.values(todos)
            .map(elem => elem.taskID)
            .includes(draggedTask.taskID)
        ) {
          this.setState({
            todos: [...todos, draggedTask],
            completedTasks: completedTasks.filter(
              task => task.taskID !== draggedTask.taskID
            ),
            draggedTask: {}
          })
        }
        event.stopPropagation() // prevent parent from calling onDrop
      }
    }
    console.log('state', this.state)
  }
  render() {
    const {todos, completedTasks} = this.state
    return (
      <div className="App">
        <div
          onDrop={event => this.onDrop(event, 'todos')}
          onDragOver={event => this.onDragOver(event)}
          className="todos"
        >
          Todo
          {todos.map((todo, index) => (
            <div
              key={todo.taskID}
              draggable
              onDrop={event => this.onDrop(event, 'todos', index)}
              onDrag={event => this.onDrag(event, todo)}
              className="taskDiv"
            >
              {todo.task}
            </div>
          ))}
        </div>
        <div
          onDrop={event => this.onDrop(event, 'tasks')}
          onDragOver={event => this.onDragOver(event)}
          className="done"
        >
          Completed
          {completedTasks.map((task, index) => (
            <div
              key={task.taskID}
              draggable
              onDrop={event => this.onDrop(event, 'tasks', index)}
              onDrag={event => this.onDrag(event, task)}
              className="taskDiv"
            >
              {task.task}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TorkPeDragNDrop
