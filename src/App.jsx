const base = import.meta.env.BASE_URL.replace(/\/$/, "");

import { useState } from 'react'

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("clock") //we start with the clock loading page for this world, and then intro, planner, tasks, ending
  const [tasks, setTasks] = useState(0) //the amount of tasks they did, start from 0
  const [task1Locked, setTask1Locked] = useState(false)//lock the task so that they can no longer make a change to their choices
  const [task2Locked, setTask2Locked] = useState(false)
  const [task3Locked, setTask3Locked] = useState(false)
  const [addedTime, setAddedTime] = useState(0); //the amount of time users decide to add for a task
  const [background, setBackground] = useState(null);


  const [workCount, setWorkCount] = useState(0);
  const [socialCount, setSocialCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);

  const [noTime, setNoTime] = useState(0);
  const [tenMin, setTenMin] = useState(0);
  const [thirtyMin, setThirtyMin] = useState(0);

  if (currentPage === "clock") {
    return (
      <div onClick={() => setCurrentPage("intro")}>
        <img
          className="clock"
          src={`${base}/asset/openClock.png`}
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

        <button onClick={() => setCurrentPage("plannerCover")}>Start</button>
      </div>
    )
  }

  if (currentPage === "plannerCover") {
    return (
      <div>
        <img
          src={`${base}/asset/planner.png`}
          className="planner"
          onClick={() => setCurrentPage("planner")}
        />
        <p>Click to open your life planner</p>
      </div>
    )
  }

  if (currentPage === "planner") {
    return (
      <div>
        <h1>Welcome to Your Life Planner!</h1>
        <p>Let's start planning your day! Click on a task to decide what you want to do.</p>
        <button onClick={() => setCurrentPage("Task1")}>Task 1</button>
        <button onClick={() => setCurrentPage("Task2")}>Task 2</button>
        <button onClick={() => setCurrentPage("Task3")}>Task 3</button>
      </div>
    )
  }

  if (currentPage === "Task1") {

    return (
      <div
        className="page"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h2> What would you like to do right now?</h2>
        <button onClick={() => {
          setWorkCount(workCount + 1) //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setBackground("/asset/workBkg.png");
          setCurrentPage("Task1Time"); //and if they choose this option then we will go to the add time page
        }}>Yes, I'm going</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground("/asset/socialBkg.png");
          setCurrentPage("Task1Time");
        }}>I want to hangout with my friends first</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground("/asset/personalBkg.png");
          setCurrentPage("Task1Time");
        }}></button>
      </div>
    )
  }

  if (currentPage === "Task1Time") {
    return (
      <div>
        <h2>How much extra time would you like to add?</h2>

        <button onClick={() => {
          setNoTime(noTime + 1)
          // setCurrentPage

        }}></button>
      </div>
    )
  }
}

export default App
