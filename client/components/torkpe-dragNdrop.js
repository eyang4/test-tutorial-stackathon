/* eslint-disable complexity */ // temporary fix for complex if statement combos
import React, {Component} from 'react'
const text3 = `describe('doubler function', () => {
  const arbitraryNum = 5
  const arbitraryStr = 'boop'
  let arbitraryVar`

const text4 = `  it('returns double of the input', () => {
  expect(doubler(2)).equal(4)
  expect(doubler(2)).to.equal(4)
  expect(doubler(2)).be.equal(4)
  expect(doubler(2)).to.be.equal(4)
  expect(doubler(arbitraryNum)).to.be.equal(10)
})`

const text5 = `  it('returns 0 for any input besides a number', () => {
  expect(doubler(undefined)).to.equal(0)
  expect(doubler()).to.equal(0)
  expect(doubler(arbitraryVar)).to.equal(0)
  expect(doubler(arbitraryStr)).to.equal(0)
})`

class TorkPeDragNDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          taskID: 1,
          task: 'import {expect} from "chai"',
          type: 'import',
          require: {
            assert: '' // if empty, will return default value
          }
        },
        {
          taskID: 2,
          task: 'import {doubler} from "./exampleForTesting"',
          type: 'import',
          require: {
            assert: ''
          }
        },
        {
          taskID: 3,
          task: text3,
          type: 'setup',
          require: {
            import: '',
            specificImport: {},
            assert: ''
          }
        },
        {
          taskID: 4,
          task: text4,
          type: 'assert',
          require: {
            import: '',
            specificImport: {
              1: '',
              2: ''
            }
          }
        },
        {
          taskID: 5,
          task: text5,
          type: 'assert',
          require: {
            import: '',
            specificImport: {
              1: '',
              2: ''
            }
          }
        },
        {
          taskID: 6,
          task: '})',
          type: 'setupWrap',
          require: {
            setup: ''
          }
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
        event.stopPropagation() // remember these!? - prevent parent from calling onDrop
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

  isCorrect = (correct, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (correct[i] !== arr[i]) return false
    }
    return true
  }

  render() {
    const {todos, completedTasks} = this.state
    return (
      <div className="App">
        <div className="codeText">
          {`export const doubler = num => {\n
  if (typeof num === 'number') return 2 * num\n
  else return 0\n
}
`}
        </div>
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
        <div className="evaluation">
          {`Current left order: ${Object.values(todos).map(elem => elem.taskID)}
Current right order: ${Object.values(completedTasks).map(elem => elem.taskID)}
Matches original: ${this.isCorrect(
            [1, 2, 3, 4, 5],
            Object.values(todos).map(elem => elem.taskID)
          )}
Evaluation: Line 1 ${Object.values(completedTasks).map(elem => elem.type)}
Line 2`}
          {Object.values(completedTasks).map((elem, index) => {
            if (elem.type === 'import') {
              const subText = []
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'assert'
                )
              )
                subText.push(
                  `missingAssert: ${
                    elem.require.assert
                      ? elem.require.assert
                      : 'import is missing assert'
                  }`
                ) // if empty, will return default value
              if (
                !Object.values(completedTasks.slice(0, index)).every(
                  innerElem => innerElem.type === 'import'
                )
              ) {
                subText.push(`posNotAtTop`)
              }
              return (
                <div className="evalDiv">
                  {subText.map(subElem => (
                    <div key={subElem} className="evalLineDiv">
                      {subElem}
                    </div>
                  ))}
                </div>
              )
            }

            if (elem.type === 'setup') {
              const subText = []
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'import'
                )
              )
                subText.push(
                  `missingImport: ${
                    elem.require.import
                      ? elem.require.import
                      : 'setup is missing import'
                  }`
                )
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'assert'
                )
              )
                subText.push(
                  `missingAssert: ${
                    elem.require.assert
                      ? elem.require.assert
                      : 'setup is missing assert'
                  }`
                )
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'setupWrap'
                )
              )
                subText.push(
                  `missingSetupWrap: ${
                    elem.require.setupWrap
                      ? elem.require.setupWrap
                      : 'setup is missing setupWrap'
                  }`
                )
              return (
                <div className="evalDiv">
                  {subText.map(subElem => (
                    <div key={subElem} className="evalLineDiv">
                      {subElem}
                    </div>
                  ))}
                </div>
              )
            }

            if (elem.type === 'assert') {
              const subText = []
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'import'
                )
              )
                subText.push(
                  `missingImport: ${
                    elem.require.import
                      ? elem.require.import
                      : 'assert is missing import'
                  }`
                )
              if (
                !Object.values(completedTasks.slice(0, index)).some(
                  innerElem => innerElem.type === 'import'
                )
              )
                subText.push(
                  `beforeImport: ${
                    elem.require.import
                      ? elem.require.import
                      : 'assert is before import'
                  }`
                )
              if (
                !Object.values(completedTasks.slice(0, index)).some(
                  innerElem => innerElem.type === 'setup'
                )
              )
                subText.push(
                  `beforeSetup: ${
                    elem.require.import
                      ? elem.require.import
                      : 'assert is before setup'
                  }`
                )
              return (
                <div className="evalDiv">
                  {subText.map(subElem => (
                    <div key={subElem} className="evalLineDiv">
                      {subElem}
                    </div>
                  ))}
                </div>
              )
            }

            if (elem.type === 'setupWrap') {
              const subText = []
              if (
                !Object.values(completedTasks).some(
                  innerElem => innerElem.type === 'setup'
                )
              )
                subText.push(
                  `missingSetup: ${
                    elem.require.setup
                      ? elem.require.setup
                      : 'setupWrap is missing setup'
                  }`
                )
              if (
                !isClosing(
                  Object.values(completedTasks).map(
                    innerElem => innerElem.type
                  ),
                  index - 1
                )
              ) {
                subText.push(`posNotClosing`)
              }
              return (
                <div className="evalDiv">
                  {subText.map(subElem => (
                    <div key={subElem} className="evalLineDiv">
                      {subElem}
                    </div>
                  ))}
                </div>
              )
            }

            function isClosing(arr, startPoint) {
              const stack = []
              for (let i = startPoint; i >= 0; i--) {
                if (arr[i] === 'setup') {
                  if (stack.length === 0) return true
                  else stack.pop()
                }
                if (arr[i] === 'setupWrap') stack.push(i)
              }
              return false
            }
          })}
        </div>
      </div>
    )
  }
}

export default TorkPeDragNDrop
