const base = import.meta.env.BASE_URL.replace(/\/$/, "");

import { useState } from 'react'

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("clock") //we start with the clock loading page for this world, and then intro, planner, tasks, ending
  const [tasks, setTasks] = useState(0) //the amount of tasks they did, start from 0
  const [addedTime, setAddedTime] = useState(0); //the amount of time users decide to add for a task

  const [workcount, setworkcount] = useState(0);


  if (currentPage === "clock") {
    return (
      <div onClick={() => setCurrentPage("intro")}>
        <img
          className="clock"
          src={`${base}/asset/clock.png`}
        />
      </div>
    )
  }
  //so if the currentpage is introduction then we will show all of this info on that page
  if (currentPage === "intro") {
    return (

      <div>
        <p>
          Welcome to the Time World. Here, you have control over your time—you can speed it up or let it flow normally for whatever you are doing. But any extra time comes borrowed from your future.
          With the help of your life planner, you’ll decide how to spend your days. You must complete at least three tasks, choosing what to do and whether to add extra time to each.
          There’s no right or wrong—only the consequences of your choices. Make them carefully… and have a good time here.
        </p>

        <button onClick={() => setCurrentPage("planner")}>Start</button>
      </div>
    )
  }

  if (currentPage === "planner"){
    return(
      <div>
        <h1>Welcome to Your Life Planner!</h1>
        <p>Let's start planning your day! Click on a task to decide what you want to do.</p>
        <button onClick={() => setCurrentPage("Task1")}>Task 1</button>
        <button onClick={()=> setCurrentPage("Task2")}>Task 2</button>
        <button onClick={()=> setCurrentPage("Task3")}>Task 3</button>
      </div>
    )
  }

  if (currentPage === "Task1"){
    
    return (
      <div>
        <h2> What would you like to do right now?</h2>
        <p> you plan to work on your eassay</p> 
        <button onClick = {()=> {
           //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setworkcount ([...workcount, workcount + 1])
          
          setCurrentPage("Task1Time"); //and if they choose this option then we will go to the add time page
        }}>Yes, I'm going</button>
        <button onClick = {()=>{

        }}></button>
      </div>
    )
  }
}
//if(currentPage === "Task1Time")
//so now we are going to create the page for adding the time, so like a button for adding the time, and we need the setAddedTime and decide what page will be next
//how do you like make a popup page
// how do you make the clock fadein and out 
export default App
