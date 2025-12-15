const base = import.meta.env.BASE_URL.replace(/\/$/, "");

import { useState } from 'react'

import './App.css'

// put this ouside of app so that the sound would not lag as much
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
  const [background, setBackground] = useState(`${base}/asset/plan.png`);

  //for counting the choices they made for ending function after all 3 tasks are done
  const [workCount, setWorkCount] = useState(0);
  const [socialCount, setSocialCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);

  //for the time choices they made also prepartion for ending function
  const [noTime, setNoTime] = useState(0);
  const [tenMin, setTenMin] = useState(0);
  const [thirtyMin, setThirtyMin] = useState(0);

  const [laptopText, setLaptopText] = useState(false); // text that will how when clicked on laptop
  const [cupText, setcupText] = useState(false);
  const [phoneText, setphoneText] = useState(false);
  const [artText, setartText] = useState(false);

  //function to decide which sound to play depending on the choices of time user picked
  function bkgSound(tenMin, thirtyMin) {
    const totalAddedTime = tenMin * 10 + thirtyMin * 30;

    if (currentAudio) {
      currentAudio.pause();
    }

    if (totalAddedTime >= 60) {
      currentAudio = clockFade;
    } else if (totalAddedTime >= 20) {
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
    let timeLevel = "low"; // default borrowed time is low when nothing is borrwoed
    if (totalAddedTime >= 60) timeLevel = "high";
    else if (totalAddedTime >= 20) timeLevel = "medium";

    // Return an ending message based on the choices
    if (type === "work") {
      if (timeLevel === "high") return "You poured yourself into your work, every note and draft filled with focus and energy. The hours blurred, and when you finally lean back, the room feels still. You notice the weight of what you achieved, but also wonder quietly about the moments you set aside along the way.";
      if (timeLevel === "medium") return "Your desk is scattered with pages and ideas, a mix of progress and lingering thoughts. You feel a satisfying rhythm in the work, yet a small part of you wonders if a pause here or there might have changed the day’s shape.";
      return "Your work unfolded steadily, each task taking its own rhythm. There’s satisfaction in having paced yourself thoughtfully.";
    }

    if (type === "social") {
      if (timeLevel === "high") return "The laughter and stories carried you through the day, a flood of energy and connection. As the evening deepens, you pause in the glow of the room, feeling both the thrill and a hint of longing for quiet moments you missed.";
      if (timeLevel === "medium") return "The cafe buzzed and the conversations flowed, leaving warmth in your chest. You reflect on the friendships you nurtured and wonder softly if there were moments you could have lingered differently.";
      return "You leave with a smile, the sounds of the room fading behind you. The day feels calm, filled with small joys, and you notice the quiet satisfaction of choices made without rush.";
    }

    if (type === "personal") {
      if (timeLevel === "high") return "The tasks are complete, and the quiet of your space settles around you. Time feels full yet suspended, each moment of stillness leaving traces of what you chose to focus on and what you left behind.";
      if (timeLevel === "medium") return "You spent time on yourself and your projects, each small effort leaving a sense of growth. The room feels calm, yet your mind drifts to the paths not explored.";
      return "You took time to focus on your own projects and passions, the day unfolding gently around you.";
    }

    if (type === "balanced") {
      if (timeLevel === "high") return "Your day wove together work, connection, and personal care, each moment rich and full. As the evening settles, your body feels heavy and your mind quiets, tired from the fullness of the day. You notice the paths you chose, wondering which moments linger most vividly in memory.";
      if (timeLevel === "medium") return "Time moved at a comfortable pace, letting each part of your day breathe. You feel grounded and content, noticing how the small extensions of time shaped moments without overwhelming them.";
      return "The day moved steadily, a gentle rhythm of tasks, moments with others, and quiet care for yourself. You feel a quiet satisfaction, the choices of the day settling comfortably around you.";
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
              Welcome to Your Life Pages. Here, you have control over your time. You can choose how long to spend on each moment or letting things flow naturally. With the help of your life planner, you’ll decide how to spend your day. You must complete at least three tasks, choosing what to do and how much time to devote to them. There’s no right or wrong, only the choices you make, and how they shape your day. Make them carefully… and enjoy your time here. Keep in mind that time is finite...
            </p>

            <button
              className='startbtn'
              onClick={() => {
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
      <div className="plannerPage">

        <img
          src={`${base}/asset/plan.png`}
          className="planBkg"
        />

        <p className="planGuide">Click to open your life planner</p>

        <div className="clickPlanner">
          <div className="click" onClick={() => setCurrentPage("planner")}></div>
        </div>
      </div>
    )
  }

  if (currentPage === "planner") {
    return (
      <div className="background"
        style={{ backgroundImage: `url(${background})` }}>

        <div className="plannerContainer">
          <h1>Welcome to Your Life Planner!</h1>
          <p>
            {tasks === 0 ? (
              "Hey there! Looks like your day is wide open. Each task is a little choice you get to make, some will keep you busy, some will give you a breather. Take your time and see where things lead. Pay attention, because if you explore carefully, you might stumble across a little surprise."
            ) : (
              "Welcome back. You’ve completed some tasks already, which is great. The room feels a little different. Take a moment to explore, and faint glimmers of light might guide you to small surprises left behind."
            )}
          </p>

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
        </div>

        <div className="laptopBkg">
          <div className="workClick" onClick={() => setLaptopText(true)}></div>
        </div>

        <div className="cupBkg">
          <div className="cupClick" onClick={() => setcupText(true)}></div>
        </div>

        <div className="phoneBkg">
          <div className="phoneClick" onClick={() => setphoneText(true)}></div>
        </div>

        <div className="artBkg">
          <div className="artClick" onClick={() => setartText(true)}></div>
        </div>

        {artText && (
          <div className="popup">
            <p>"It feels great to just sit and sketch for a while."</p>
            <button onClick={() => setartText(false)}>Close</button>
          </div>
        )}
        {phoneText && (
          <div className="popup">
            <p>"It’s great to hang out with others, but I should have gone back and finished my project."</p>
            <button onClick={() => setphoneText(false)}>Close</button>
          </div>
        )}
        {cupText && (
          <div className="popup">
            <p>"It’s actually helpful to chat with others—it clears my mind a bit."</p>
            <button onClick={() => setcupText(false)}>Close</button>
          </div>
        )}
        {laptopText && (
          <div className="popup">
            <p>"I worked my whole life, but I wonder what else I could have done."</p>
            <button onClick={() => setLaptopText(false)}>Close</button>
          </div>
        )}
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
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>
              The sunlight streams through the window. Your desk is scattered with notes and drafts. A quiet hum of the city outside.
              You sit down, coffee steaming beside your laptop, thinking: should I dive into it?
            </p>
          </div>

          <button onClick={() => {
            //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
            setWorkCount(workCount + 1)
            setBackground(`${base}/asset/workBkg.png`);
            setCurrentPage("workTask1Time"); //and if they choose this option then we will go to the add time page
          }}>Open laptop and start writing</button>

          <button onClick={() => {
            setSocialCount(socialCount + 1)
            setBackground(`${base}/asset/socialBkg.png`);
            setCurrentPage("socialTask1Time");
          }}>Take a short break, send a quick message to a friend</button>

          <button onClick={() => {
            setPersonalCount(personalCount + 1)
            setBackground(`${base}/asset/personalBkg.png`);
            setCurrentPage("personalTask1Time");
          }}>Take a moment to sketch, journal, or brainstorm</button>
        </div>
      </div>
    )
  }

  if (currentPage === "workTask1Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>The sunlight has shifted across your desk, an hour has passed, and your notes are scattered with half-formed ideas. Do you push on a bit longer or take a pause?</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            setBackground(`${base}/asset/workBkg.png`);
          }}>I'll work on this another day</button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin)
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");

            bkgSound(newTenMin, thirtyMin);
          }}>I'll push through a bit more, like 15min?'</button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>I can keep going, try to finish as much as I can.</button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "socialTask1Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>You and your friend end up chatting for a few minutes, just catching up on random things. Before you know it, they mention they’re about to hop into a game and invite you to join.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>Ahh I should really get back to what I was doing…</button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);            
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>I think I'll just play one round, then I’ll go.</button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>Fine, I’ll join for a while. I can always work on my essay later.</button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "personalTask1Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>You open your sketchbook, letting your pencil drift without a plan.he first lines come out light and hesitant, then grow more certain as your hand settles into a rhythm. It feels good to make something without needing it to be anything.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>I think this is pretty good.</button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>Maybe I’ll add a few more lines… just enough to finish this corner.</button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask1Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>Can’t stop now, this is really coming together.</button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "Task2") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />

            <p> You planned for a short hangout with friends at a cafe for about an hour, and go back to work on finals, but the energy in the room is contagious. Do you stay a bit longer or leave now to finish your finals?
            </p>
          </div>
          <button onClick={() => {
            //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
            setWorkCount(workCount + 1)
            setBackground(`${base}/asset/workBkg.png`);
            setCurrentPage("workTask2Time"); //and if they choose this option then we will go to the add time page
          }}>I'm going to let them know I gotta go, and we'll catch-up next time</button>

          <button onClick={() => {
            setSocialCount(socialCount + 1)
            setBackground(`${base}/asset/socialBkg.png`);
            setCurrentPage("socialTask2Time");
          }}>I'll stay a bit longer</button>

          <button onClick={() => {
            setPersonalCount(personalCount + 1)
            setBackground(`${base}/asset/personalBkg.png`);
            setCurrentPage("personalTask2Time");
          }}>I'm a bit tire, so I'll leave first and go home to take a nap</button>
        </div>
      </div>
    )
  }

  if (currentPage === "workTask2Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>You step inside your apartment, the warmth of home greeting you. Your desk is scattered with notes and half-finished drafts, sunlight catching the edges of your papers. The quiet feels heavier now, and the soft ticking of the clock reminds you the day is slowly slipping by.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            I'm going to work on this tomorrow
          </button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>
            I'll focus on a section first, push to get some progress done.
          </button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>
            I’ll settle in and work steadily, see how much I can get done before evening.
          </button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            Return to planner
          </button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "socialTask2Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>The cafe hums around you, sunlight slanting across the table as the shadows stretch and mingle with the warmth of the room.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>I say goodbye to my friends and head back to my plans, the sounds of the cafe fading behind me </button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>I chatted with my friends for a little longer, laughter and stories weaving around the fading light.</button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>I sink deeper into the moment, letting time slip by as the cafe warms around me and the afternoon stretches lazily toward evening
          </button>
          {/* 
          <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "personalTask2Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">
          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>You arrive home feeling a bit worn out. Sunlight filters through the window, and the soft comfort of your bed beckons. Your sketchbook and journal sit nearby, half-forgotten, reminding you of ideas you might return to later. The day is slipping by, but a short rest could recharge you to keep creating afterward.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            I lie down for a bit, letting the day settle around me
          </button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>
            I'll set a quick timer and take a brief nap to refresh myself
          </button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask2Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>
            I'll just sleep and wake up naturally to fully recharge myself
          </button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            Return to planner
          </button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "Task3") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>
              The afternoon light filters softly through your window. You’ve been juggling responsibilities all day, and your mind feels a little frayed. A quiet corner of your room calls to you—maybe it’s time to do something just for yourself.
            </p>
          </div>

          <button onClick={() => {
            //so we are updating the type of the task to this when they click this option, for our record for what ending they are picking later
            setWorkCount(workCount + 1)
            setBackground(`${base}/asset/workBkg.png`);
            setCurrentPage("workTask3Time"); //and if they choose this option then we will go to the add time page
          }}>I'll work on my project, stay focused on getting things done</button>

          <button onClick={() => {
            setSocialCount(socialCount + 1)
            setBackground(`${base}/asset/socialBkg.png`);
            setCurrentPage("socialTask3Time");
          }}>Let's go to this event that is happening today</button>

          <button onClick={() => {
            setPersonalCount(personalCount + 1)
            setBackground(`${base}/asset/personalBkg.png`);
            setCurrentPage("personalTask3Time");
          }}>I think I'll take a moment to unwind and focus on myself</button>
        </div>
      </div>
    )
  }

  if (currentPage === "workTask3Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">
          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>Your desk is cluttered with reports and data sheets. A challenging problem sits at the center of your mind, demanding attention. You adjust your chair, organize your workspace, and focus intently, letting logic and insight guide you toward a solution.</p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>I'm finally done with this</button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>I think I'll refine it just a bit more</button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>I'm going to look it through, label and organize all my reports </button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "socialTask3Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">

          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>You mingle and watch a few presentations, occasionally chatting with other students with music softly playing in the background. You find yourself drawn into the activities. The day feels brighter here, surrounded by curiosity and movement.
            </p>
          </div>

          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>I learned a lot today, and it is getting late, so I'll call it a day.</button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>I wander a bit longer, catching a few more talks and chatting with some students.
          </button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>I decided to stay for the night events, moving from talk to talk and enjoying the buzz of the crowd well into the evening
          </button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>return to planner</button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "personalTask3Time") {
    return (
      <div className="taskBackground">
        <div className="taskBox">
          <div className="taskContent">
            <img
              className="Npc"
              src={`${base}/asset/openClock.png`}
            />
            <p>
              You settle into your favorite spot, the room quiet except for the soft glow of the screen. The episode starts, and you get drawn into the story, the outside world fading away as you immerse yourself in this little escape.
            </p>
          </div>
          <button onClick={() => {
            setNoTime(noTime + 1)
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            I’ll just watch one episode.
          </button>

          <button onClick={() => {
            const newTenMin = tenMin + 1;
            setTenMin(newTenMin);   
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(newTenMin, thirtyMin);
          }}>
            I’ll watch a bit more, and see what happens in the next episode.
          </button>

          <button onClick={() => {
            const newThirtyMin = thirtyMin + 1;
            setThirtyMin(newThirtyMin);
            setTask3Locked(true);
            setTasks(tasks + 1);
            setCurrentPage("planner");
            bkgSound(tenMin, newThirtyMin);
          }}>
            I stayed up the whole night and finished the whole drama.
          </button>

          {/* <button onClick={() => {
            setTasks(tasks + 1);
            setCurrentPage("planner");
          }}>
            Return to planner
          </button> */}
        </div>
      </div>
    )
  }

  if (currentPage === "EndPage") {

    // calculate ending so that it will display it on this page
    const message = ending();

    return (
      <div className="letter">
        <div className="endpage">
          <p>Dear Future You,</p>
          <p className="indent">{message}</p>
          <p className="indent2">Sincerely,</p>
          <p className="indent3">Life Pages</p>

        </div>
      </div>
    )
  }

}

export default App
