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
        }
      ],
      completedTasks: [],
      draggedTask: {}
    }
  }

  onDrag = (event, todoOrTask) => {
    event.preventDefault()
    this.setState({
      draggedTask: todoOrTask
    })
  }

  onDragOver = event => {
    event.preventDefault()
  }

  onDrop = (event, location) => {
    const {completedTasks, draggedTask, todos} = this.state
    if (location === 'tasks') {
      this.setState({
        completedTasks: [...completedTasks, draggedTask],
        todos: todos.filter(task => task.taskID !== draggedTask.taskID),
        draggedTask: {}
      })
    } else if (location === 'todos') {
      this.setState({
        todos: [...todos, draggedTask],
        completedTasks: completedTasks.filter(
          task => task.taskID !== draggedTask.taskID
        ),
        draggedTask: {}
      })
    }
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
          {todos.map(todo => (
            <div
              key={todo.taskID}
              draggable
              onDrag={event => this.onDrag(event, todo)}
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
              onDrag={event => this.onDrag(event, task)}
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
