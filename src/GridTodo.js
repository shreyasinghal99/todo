import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BtnCellRenderer from "./BtnCellRenderer";

const GridTodo = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletedTodo,setShowCompletedTODO] = useState(false);
  const [currTask, setCurtask] = useState();
  const [currDate, setCurDate] = useState();
  const [tasks, setTasks] = useState([
    { task: "React today's goals", id: 1, completion_date: "01-10-2022",IsDeleted:false },
    { task: "Running", id: 2, completion_date: "01-10-2022",IsDeleted:false },
    { task: "Scooty Service", id: 3, completion_date: "01-10-2022",IsDeleted:false },
  ]);
  const [isClicked, setIsClicked] = useState(false);
  const [allTasks, setAll] = useState();
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    minWidth: 100,
  };
  const handleDelete = (id) => {
    console.log(tasks,"delete")
    let clonedTasks = [...tasks];
    let foundIndex = clonedTasks.findIndex(t=>t.id==id);
    clonedTasks[foundIndex].IsDeleted = true;
    setTasks(clonedTasks);
    alert("A Task has been deleted");
    
  };
  const [columnDefs] = useState([
    { field: "id" },
    { field: "task" },
    { field: "completion_date" },
    {
      field: "action",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: { handleDelete: handleDelete },
    },
  ]);

  const filterGridData = ()=>{
      if(showCompletedTodo){
        let filteredTask =  tasks.filter(x=>x.IsDeleted==true);
        console.log(filteredTask);
        return filteredTask;
      }
      let filteredTask = tasks.filter(x=>x.IsDeleted==false);
      console.log(filteredTask);
      return filteredTask;
  } 

  const handleSubmit = () => {
    if (!currTask) {
      alert("Add a task first");
      return;
    }
    if (!currDate) {
      alert("Date is mandatory");
      return;
    }
    
    let new_id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
    tasks.push({ task: currTask, id: new_id, completion_date: currDate,IsDeleted:false })
    setCurtask("");
    setCurDate("");
    setTasks([...tasks]);
    console.log(tasks);
    alert("Task successfully added");

    // this.setState(
    //   {
    //     tasks: [...this.state.tasks, { task: this.state.currTask, id: this.state.tasks.length + 1 }],
    //     currTask: ""
    //   }
    // )
  };

  const handleCompleted = (choice) => {
    setShowCompletedTODO(choice);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task here"
        value={currTask}
        onChange={(e) => setCurtask(e.target.value)}
      />
      <input
        type="date"
        value={currDate}
        onChange={(e) => setCurDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button
        onClick={() => handleCompleted(true)}
      >
       Show Completed
      </button>
      <button onClick={() => handleCompleted(false)}> Show ToDos </button>

      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={filterGridData()}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridTodo;
