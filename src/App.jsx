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

  function ending() {
    let type = "balanced";
    if (workCount > socialCount && workCount > personalCount) {
      type = "work";
    }
    else if (socialCount > workCount && socialCount > personalCount) {
      type = "social";
    } else if (personalCount > workCount && personalCount > socialCount) {
      type = "personal";
    } else {
      type = "balanced";
    }

    const totalAddedTime = tenMin + thirtyMin; // only counts clicks where extra time was added
    let timeLevel = "low"; // default borrowed time is low
    if (totalAddedTime >= 3) timeLevel = "high";
    else if (totalAddedTime === 2) timeLevel = "medium";

    // Return an ending message based on the choices
    if (type === "work") {
      if (timeLevel === "high") return "Worked a lot and borrowed a lot of time → intense but short life.";
      if (timeLevel === "medium") return "Worked a lot and borrowed some time → energetic life.";
      return "Worked a lot without borrowing time → steady, long life.";
    }

    if (type === "social") {
      if (timeLevel === "high") return "Lots of socializing and borrowed much time → exciting but risky life.";
      if (timeLevel === "medium") return "Lots of socializing and borrowed some time → balanced social life.";
      return "Lots of socializing without borrowing → happy, stable life.";
    }

    if (type === "personal") {
      if (timeLevel === "high") return "Focused on personal growth but borrowed a lot → transformative but short life.";
      if (timeLevel === "medium") return "Focused on personal growth and borrowed some time → steady self-development.";
      return "Focused on personal growth without borrowing → long, fulfilling life.";
    }

    if (type === "balanced") {
      if (timeLevel === "high") return "Balanced life but borrowed a lot → adventurous yet risky journey.";
      if (timeLevel === "medium") return "Balanced life with some extra time → mostly stable and fulfilling.";
      return "Balanced life without borrowing → calm, steady, long life.";
    }

  }

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

      <div className="introfade-in">
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
      <div
        className="background"
        style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", height: "100vh" }}
      >
        <h1>Welcome to Your Life Planner!</h1>
        <p>Let's start planning your day! Click on a task to decide what you want to do.</p>
        <button onClick={() => {
          if (!task1Locked) {
            setCurrentPage("Task1");
          } else {
            alert("Task 1 is locked. Explore the world instead!");
          }
        }}>Task 1</button>

        <button onClick={() => {
          if (!task2Locked) {
            setCurrentPage("Task2");
          } else {
            alert("Task 2 is locked. Explore the world instead!");
          }
        }}>Task 2</button>

        <button onClick={() => {
          if (!task3Locked) {
            setCurrentPage("Task3")
          } else {
            alert("Task 3 is locked. Explore the world instead!");
          }
        }}>Task 3</button>

        {/* if the user completed three tasks then an image of a letter will popup to guide them to the endPage */}
        {tasks === 3 && (
          <img
            src={`${base}/asset/letter.png`}
            alt="Your Future Ending"
            style={{ position: "absolute", bottom: "20px", right: "20px", cursor: "pointer", width: "150px" }}
            onClick={() => setCurrentPage("EndPage")}
          />
        )}
      </div>
    )
  }

  if (currentPage === "Task1") {

    return (
      <div
      >
        <p>The sunlight streams through the window. Your desk is scattered with notes and drafts. A quiet hum of the city outside.
          You sit down, coffee steaming beside your laptop, thinking: should I dive into it?</p>
        <button onClick={() => {
          //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setWorkCount(workCount + 1)
          setBackground(`${base}/asset/workBkg.png`);
          setCurrentPage("Task1Time"); //and if they choose this option then we will go to the add time page
        }}>Open laptop and start writing</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("Task1Time");
        }}>Take a short break, send a quick message to a friend</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("Task1Time");
        }}>Take a moment to sketch, journal, or brainstorm</button>
      </div>
    )
  }

  if (currentPage === "Task1Time") {
    return (
      <div>
        <p>The sunlight has shifted across your desk, an hour has passed, and your notes are scattered with half-formed ideas. Do you push on a bit longer or take a pause?</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask1Locked(true);
        }}>I'll work on this another day</button>

        <button onClick={() => {
          setNoTime(tenMin + 1)
          setTask1Locked(true);
        }}>I'll push through a bit more, like 15min?'</button>

        <button onClick={() => {
          setNoTime(thirtyMin + 1);
          setTask1Locked(true);
        }}>Lose myself in it for another 30 minutes</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "Task2") {
    return (
      <div
      >
        <p> You planned for a short hangout with friends at a cafe for about an hour, and go back to work on finals, but the energy in the room is contagious. Do you stay a bit longer or leave now to finish your finals?
        </p>
        <button onClick={() => {
          //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setWorkCount(workCount + 1)
          setBackground(`${base}/asset/workBkg.png`);
          setCurrentPage("Task2Time"); //and if they choose this option then we will go to the add time page
        }}>I'm going to let them know I gotta go, and we'll catch-up next time</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("Task2Time");
        }}>I'll stay a bit longer</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("Task2Time");
        }}>I'm a bit tire, so I'll leave first and go home to take a nap</button>
      </div>
    )
  }

  if (currentPage === "Task2Time") {
    return (
      <div>
        <h2>How much extra time would you like to add?</h2>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask2Locked(true);
        }}>I don't need to add anymore time</button>

        <button onClick={() => {
          setNoTime(tenMin + 1)
          setTask2Locked(true);
        }}>I think I need to 10 more min</button>

        <button onClick={() => {
          setNoTime(thirtyMin + 1);
          setTask2Locked(true);
        }}>I think I need 30 more min</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "Task3") {
    return (
      <div
      >
        <h2> What would you like to do right now?</h2>
        <button onClick={() => {
          //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setWorkCount(workCount + 1)
          setBackground(`${base}/asset/workBkg.png`);
          setCurrentPage("Task3Time"); //and if they choose this option then we will go to the add time page
        }}>Yes, I'm going</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("Task3Time");
        }}>I want to hangout with my friends first</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("Task3Time");
        }}></button>
      </div>
    )
  }

  if (currentPage === "Task3Time") {
    return (
      <div>
        <h2>How much extra time would you like to add?</h2>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask3Locked(true);
        }}>I don't need to add anymore time</button>

        <button onClick={() => {
          setNoTime(tenMin + 1)
          setTask3Locked(true);
        }}>I think I need to 10 more min</button>

        <button onClick={() => {
          setNoTime(thirtyMin + 1);
          setTask3Locked(true);
        }}>I think I need to 30 more min</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "EndPage") {
    // calculate ending so that it will display it on this page
    const message = ending(); 

    return (
      <div className="endpage">
        <h1>Your Future Awaits!</h1>
        <p>{message}</p>

      </div>
    )
  }

}

export default App
