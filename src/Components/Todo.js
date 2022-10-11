import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { task: "React today's goals", id: "1" },
        { task: "Running", id: "2" },
        { task: "Dsa start revision", id: "3" },
      ],
      currTask: "",
      completedTasks: [],

    }
    this.state = {
      fields: [{ field: 'Task' },
      { field: 'Create Date' },
      { field: 'Actions ' }
      ]
    }
  }
    handleChange = (e) => {
      this.setState(
        { currTask: e.target.value }
        )
    }
    handleSubmit = () => {
      if (!this.state.currTask) {
        alert("Add a task first");
        return;
      }
      this.setState(
        {
          tasks: [...this.state.tasks, { task: this.state.currTask, id: this.state.tasks.length + 1 }],
          currTask: ""
        }
      )
    }

    handleDelete = (id) => {

      let narr = this.state.tasks.filter((taskObj) => {
        return taskObj.id != id
      })
      let carr = this.state.tasks.filter((taskObj) => {
        return taskObj.id == id
      })

      this.setState(
        {
         tasks: [...narr],
          completedTasks: [...this.state.completedTasks, [...carr]]
        }
      )
    }

    handleCompleted = () => {
      console.log(this.state.completedTasks);
    }
    render() {
      console.log("Render");
      return (
        <div>
          <input type="text" value={this.state.currTask} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleCompleted}> Show Completed </button>

          <ul>
            {/* { this.state.tasks.map((taskObj)=>(
                  <li key = {taskObj.id}>
                      <p>{taskObj.task}</p>
                      <button onClick={()=>this.handleDelete(taskObj.id)}>Delete</button>
                </li>
             ))} */}
            

             { this.state.tasks.map(function(taskObj){
                   return(
                  <li key = {taskObj.id}>
                      <p>{taskObj.task}</p>
                      <button onClick={()=>this.handleDelete(taskObj.id)}>Delete</button>
                </li>)
               }.bind(this)
             )   // arrow funtion s replaced with normal function 
             //so bind is used to bind "this" of class
             // to the function else this.handledelete will give undefined bcz inside a function this is undefined until and unless func has an object inisde it
             } 


          </ul>



        </div>
      )
    }
  }

export default Todo;