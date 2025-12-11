const base = import.meta.env.BASE_URL.replace(/\/$/, "");

import { useState } from 'react'

import './App.css'

const clockSteady = new Audio(`${base}/asset/steady.mp3`);
const clockSlow = new Audio(`${base}/asset/slow.mp3`);
const clockFade = new Audio(`${base}/asset/fade.mp3`);
clockSteady.loop = true;
clockSlow.loop = true;
clockFade.loop = true;
let currentAudio = clockSteady;

function App() {
  const [currentPage, setCurrentPage] = useState("clock") //we start with the clock loading page for this world, and then intro, planner, tasks, ending

  const [tasks, setTasks] = useState(0) //the amount of tasks they did, start from 0
  const [task1Locked, setTask1Locked] = useState(false)//lock the task so that they can no longer make a change to their choices
  const [task2Locked, setTask2Locked] = useState(false)
  const [task3Locked, setTask3Locked] = useState(false)
  const [addedTime, setAddedTime] = useState(0); //the amount of time users decide to add for a task
  const [background, setBackground] = useState(null);

  //for counting the choices they made for ending function after all 3 tasks are done
  const [workCount, setWorkCount] = useState(0);
  const [socialCount, setSocialCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);

  //for the time choices they made also prepartion for ending function
  const [noTime, setNoTime] = useState(0);
  const [tenMin, setTenMin] = useState(0);
  const [thirtyMin, setThirtyMin] = useState(0);

  //function to decide which sound to play depending on the choices of time user picked
  function bkgSound() {
    const totalAddedTime = tenMin * 10 + thirtyMin * 30;

    if (currentAudio) {
      currentAudio.pause();
    }

    if (totalAddedTime >= 60) {
      currentAudio = clockFade;
    } else if (totalAddedTime === 20) {
      currentAudio = clockSlow;
    } else {
      currentAudio = clockSteady;
    }

    currentAudio.play();
  }

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

    const totalAddedTime = tenMin * 10 + thirtyMin * 30; // only counts clicks where extra time was added
    let timeLevel = "low"; // default borrowed time is low
    if (totalAddedTime >= 60) timeLevel = "high";
    else if (totalAddedTime >= 20) timeLevel = "medium";

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
      <div>
        <div className="clockFadeOut"
        >
          <img
            className="clock"
            src={`${base}/asset/openClock.png`}
          />
          <img className="c"
            src={`${base}/asset/clockBkg.gif`}
          />
        </div>

        {/* so if the currentpage is introduction then we will show all of this info on that page */}

        <div className="introFadeIn">
          <div className="introContent">
            <img
              className="clockNpc"
              src={`${base}/asset/openClock.png`}
            />
            <p>
              Welcome to the Time World. Here, you have control over your time—you can speed it up or let it flow normally for whatever you are doing. But any extra time comes borrowed from your future.
              With the help of your life planner, you’ll decide how to spend your days. You must complete at least three tasks, choosing what to do and whether to add extra time to each.
              There’s no right or wrong—only the consequences of your choices. Make them carefully… and have a good time here.
            </p>

            <button onClick={() => {
              clockSteady.play();
              setCurrentPage("plannerCover");
            }}>Start</button>
          </div>
        </div>
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
        <p>  Hey there! Looks like your day is wide open. Each task is a little choice you get to make, some will keep you busy, some will give you a breather.
          Take your time and see where things lead. Pay attention, because if you explore carefully, you might stumble across a little surprise.</p>
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
          setCurrentPage("workTask1Time"); //and if they choose this option then we will go to the add time page
        }}>Open laptop and start writing</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("socialTask1Time");
        }}>Take a short break, send a quick message to a friend</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("personalTask1Time");
        }}>Take a moment to sketch, journal, or brainstorm</button>
      </div>
    )
  }

  if (currentPage === "workTask1Time") {
    return (
      <div>
        <p>The sunlight has shifted across your desk, an hour has passed, and your notes are scattered with half-formed ideas. Do you push on a bit longer or take a pause?</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask1Locked(true);
        }}>I'll work on this another day</button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask1Locked(true);
          bkgSound();
        }}>I'll push through a bit more, like 15min?'</button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask1Locked(true);
          bkgSound();
        }}>I can keep going, try to finish as much as I can.</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "socialTask1Time") {
    return (
      <div>
        <p>You and your friend end up chatting for a few minutes, just catching up on random things. Before you know it, they mention they’re about to hop into a game and invite you to join.</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask1Locked(true);
        }}>Ahh I should really get back to what I was doing…</button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask1Locked(true);
          bkgSound();
        }}>I think I'll just play one round, then I’ll go.</button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask1Locked(true);
          bkgSound();
        }}>Fine, I’ll join for a while. I can always work on my essay later.</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "personalTask1Time") {
    return (
      <div>
        <p>You open your sketchbook, letting your pencil drift without a plan.he first lines come out light and hesitant, then grow more certain as your hand settles into a rhythm. It feels good to make something without needing it to be anything.</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask1Locked(true);
        }}>I think this is pretty good.</button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask1Locked(true);
          bkgSound();
        }}>Maybe I’ll add a few more lines… just enough to finish this corner.</button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask1Locked(true);
          bkgSound();
        }}>Can’t stop now, this is really coming together.</button>

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
          setCurrentPage("workTask2Time"); //and if they choose this option then we will go to the add time page
        }}>I'm going to let them know I gotta go, and we'll catch-up next time</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("socialTask2Time");
        }}>I'll stay a bit longer</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("personalTask2Time");
        }}>I'm a bit tire, so I'll leave first and go home to take a nap</button>
      </div>
    )
  }

  if (currentPage === "workTask2Time") {
    return (
      <div>
        <p>You step inside your apartment, the warmth of home greeting you. Your desk is scattered with notes and half-finished drafts, sunlight catching the edges of your papers. The quiet feels heavier now, and the soft ticking of the clock reminds you the day is slowly slipping by.</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask2Locked(true);
        }}>
          I'm going to work on this tomorrow
        </button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask2Locked(true);
          bkgSound(tenMin + 1 + thirtyMin);
        }}>
          I'll focus on a section first, push to get some progress done.
        </button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1)
          setTask2Locked(true);
          bkgSound(tenMin + thirtyMin + 1);
        }}>
          I’ll settle in and work steadily, see how much I can get done before evening.
        </button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>
          Return to planner
        </button>
      </div>
    )
  }

  if (currentPage === "socialTask2Time") {
    return (
      <div>
        <p>The cafe hums around you, sunlight slanting across the table as the shadows stretch and mingle with the warmth of the room.</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask2Locked(true);
        }}>I say goodbye to my friends and head back to my plans, the sounds of the cafe fading behind me </button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask2Locked(true);
          bkgSound();
        }}>I chatted with my friends for a little longer, laughter and stories weaving around the fading light.</button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask2Locked(true);
          bkgSound();
        }}>I sink deeper into the moment, letting time slip by as the cafe warms around me and the afternoon stretches lazily toward evening
        </button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "personalTask2Time") {
    return (
      <div>
        <p>You arrive home feeling a bit worn out. Sunlight filters through the window, and the soft comfort of your bed beckons. Your sketchbook and journal sit nearby, half-forgotten, reminding you of ideas you might return to later. The day is slipping by, but a short rest could recharge you to keep creating afterward.</p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask1Locked(true);
        }}>
          I lie down for a bit, letting the day settle around me
        </button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask1Locked(true);
          bkgSound(tenMin + 1 + thirtyMin);
        }}>
          I'll set a quick timer and take a brief nap to refresh myself
        </button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1)
          setTask1Locked(true);
          bkgSound(tenMin + thirtyMin + 1);
        }}>
          I'll just sleep and wake up naturally to fully recharge myself
        </button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>
          Return to planner
        </button>
      </div>
    )
  }

  if (currentPage === "Task3") {
    return (
      <div
      >
        <p>
          The afternoon light filters softly through your window. You’ve been juggling responsibilities all day, and your mind feels a little frayed. A quiet corner of your room calls to you—maybe it’s time to do something just for yourself.
        </p>
        <button onClick={() => {
          //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
          setWorkCount(workCount + 1)
          setBackground(`${base}/asset/workBkg.png`);
          setCurrentPage("workTask3Time"); //and if they choose this option then we will go to the add time page
        }}>I'll work on my project, stay focused on getting things done</button>

        <button onClick={() => {
          setSocialCount(socialCount + 1)
          setBackground(`${base}/asset/socialBkg.jpg`);
          setCurrentPage("Task3Time");
        }}>Let's go to this event that is happening today</button>

        <button onClick={() => {
          setPersonalCount(personalCount + 1)
          setBackground(`${base}/asset/personalBkg.jpg`);
          setCurrentPage("personalTask3Time");
        }}>I think I'll take a moment to unwind and focus on myself</button>
      </div>
    )
  }

  if (currentPage === "workTask3Time") {
    return (
      <div>
        <h2>How much extra time would you like to add?</h2>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask3Locked(true);
        }}>I don't need to add anymore time</button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask3Locked(true);
          bkgSound();
        }}>I think I need to 10 more min</button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask3Locked(true);
          bkgSound();
        }}>I think I need to 30 more min</button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "socialTask2Time") {
    return (
      <div>
        <p>You mingle and watch a few presentations, occasionally chatting with other students with music softly playing in the background. You find yourself drawn into the activities. The day feels brighter here, surrounded by curiosity and movement.
        </p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask2Locked(true);
        }}>I learned a lot today, and it is getting late, so I'll call it a day.</button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask2Locked(true);
          bkgSound();
        }}>I wander a bit longer, catching a few more talks and chatting with some students.
        </button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask2Locked(true);
          bkgSound();
        }}>I decided to stay for the night events, moving from talk to talk and enjoying the buzz of the crowd well into the evening
        </button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>return to planner</button>
      </div>
    )
  }

  if (currentPage === "personalTask3Time") {
    return (
      <div>
        <p>
          You settle into your favorite spot, the room quiet except for the soft glow of the screen. The episode starts, and you get drawn into the story, the outside world fading away as you immerse yourself in this little escape.
        </p>

        <button onClick={() => {
          setNoTime(noTime + 1)
          setTask3Locked(true);
        }}>
          I’ll just watch one episode.
        </button>

        <button onClick={() => {
          setTenMin(tenMin + 1)
          setTask3Locked(true);
          bkgSound();
        }}>
        I’ll watch a bit more, and see what happens in the next episode.
        </button>

        <button onClick={() => {
          setThirtyMin(thirtyMin + 1);
          setTask3Locked(true);
          bkgSound();
        }}>
          I stayed up the whole night and finished the whole drama. 
        </button>

        <button onClick={() => {
          setTasks(tasks + 1);
          setCurrentPage("planner");
        }}>
          Return to planner
        </button>
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
