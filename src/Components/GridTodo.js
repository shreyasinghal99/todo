import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BtnCellRenderer from './BtnCellRenderer';

const GridTodo = () => {
   const [completedTasks,setCompletedTasks] = useState([]);
   const [currTask,setCurtask] = useState();
   const [currDate,setCurDate] = useState();
   const [tasks,setTasks] = useState([
    { task: "React today's goals", id: "1", completion_date:"01-10-2022" },
    { task: "Running", id: "2",completion_date:"01-10-2022" },
    { task: "Scooty Service", id: "3",completion_date:"01-10-2022"  },
   ]);
   const [allTasks,setAll] = useState()
   const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    minWidth: 100,
    
    
};
const handleDelete = (id) => {
    console.log("Delete Called ",id);
    console.log(tasks);
    let narr = tasks.filter((taskObj) => {
      return taskObj.id != id
    })
    let carr = tasks.filter((taskObj) => {
      return taskObj.id == id
    })
    console.log([...narr])
    setTasks([...narr])
   setCompletedTasks([...completedTasks,...carr])
   alert("A Task has been deleted");
    // this.setState(
    //   {
    //    tasks: [...narr],
    //     completedTasks: [...this.state.completedTasks, [...carr]]
    //   }
    // )
  }
   const [columnDefs] = useState([
    { field: 'id' },
       { field: 'task' },
       { field : 'completion_date' },
       {
        field: 'action',
        cellRenderer: BtnCellRenderer,
        cellRendererParams : {handleDelete:handleDelete}
        },
      
       
      
   ])

   const handleSubmit = () => {
    if (!currTask) {
      alert("Add a task first");
      return;
    }
    if(!currDate){
        alert("Date is mandatory");
        return;
    }
    setTasks([...tasks,{task: currTask, id: tasks.length + 1 ,completion_date:currDate}])
    alert("Task successfully added");
    // this.setState(
    //   {
    //     tasks: [...this.state.tasks, { task: this.state.currTask, id: this.state.tasks.length + 1 }],
    //     currTask: ""
    //   }
    // )
    setCurtask('');
    setCurDate();
  }
 
 

  const handleCompleted = (choice) => {
    
    if(choice === 'Completed'){
    setAll(tasks);
    setTasks(completedTasks);
    }
    else{
    setTasks(allTasks);
    }
  }

   return (
    <>
       <input type="text" placeholder = 'Enter task here' value={currTask} onChange={(e)=>setCurtask(e.target.value)} />
       <input type="date" value={currDate} onChange={(e)=>setCurDate(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={()=>handleCompleted("Completed")}> Show Completed </button>
          <button onClick={()=>handleCompleted("All")}> Show All Tasks </button>

       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData = {tasks}
               columnDefs = {columnDefs}
               defaultColDef = {defaultColDef}>
                
           </AgGridReact>
       </div>
      
       </>
   );
};

export default GridTodo;
