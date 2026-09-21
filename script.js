// Get top bar
var topBar = document.getElementById('topbar')
const topbarHeight = document.getElementById('topbar').offsetHeight;


// Update time in the top bar
function updateTime() {
      var currentTime = new Date().toLocaleString();
      var timeText = document.querySelector("#timeElement");
      timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);


// Window tap functions
var biggestIndex = 1;

function addWindowTapHandling(element) {
      element.addEventListener('mousedown', () => 
            handleWindowTap(element)
      )
}

function handleWindowTap(element) {
      biggestIndex++;
      element.style.zIndex = biggestIndex;
      topBar.style.zIndex = biggestIndex + 1;
      deselectIcon(selectedIcon);
}

function openWindow(element) {
      element.style.display = 'flex'
      biggestIndex++;
      element.style.zIndex = biggestIndex;
      topBar.style.zIndex = biggestIndex + 1;
}

function makeCloseable(element, screen) {
      // Get the open and close buttons
      var windowScreenClose = document.getElementById(element + "close");
      var windowScreenOpen = document.getElementById(element + "open");

      // Add event listeners for the buttons
      windowScreenClose.addEventListener('click', () => closeWindow(screen));
      windowScreenOpen.addEventListener('click', () => openWindow(screen));
}

function initialiseWindow(elementName) {
      var screen = document.getElementById(elementName);
      screen.style.top = topbarHeight + 'px';
      screen.style.left = '100px'; // TEMP: make this sidebar width later
      addWindowTapHandling(screen);
      dragElement(screen);
      makeCloseable(elementName, screen)
}

var selectedIcon = undefined;

// function selectIcon(element) {
//       element.classList.add('selected');
//       selectedIcon = element;
// }

function deselectIcon(element) {
      // Prevent file from crashing if element is undefined
      if (!element) return;

      element.classList.remove('selected');
      selectedIcon = undefined
}

// function handleIconTap(element) {
//       if (element.classList.contains('selected')) {
//             deselectIcon(element);
//             openWindow(window);
//       } else {
//             selectIcon(element);
//       }
// }


// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
      // Step 2: Set up variables to keep track of the element's position.
      var initialX = 0;
      var initialY = 0;
      var currentX = 0;
      var currentY = 0;

      // Step 3: Check if there is a special header element associated with the draggable element.
      if (document.getElementById(element.id + "header")) {
            // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
            // This allows you to drag the window around by its header.
            document.getElementById(element.id + "header").onmousedown = startDragging;
      } else {
            // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
            // This allows you to drag the window by holding down anywhere on the window.
            element.onmousedown = startDragging;
      }

      // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
      function startDragging(e) {
            e = e || window.event;
            e.preventDefault();
            // Step 7: Get the mouse cursor position at startup.
            initialX = e.clientX;
            initialY = e.clientY;
            // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
            document.onmouseup = stopDragging;
            document.onmousemove = elementDrag;
      }

      // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
      function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Step 10: Calculate the new cursor position.
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
            // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
            // Get the intended update Y position
            newY = element.offsetTop - currentY
            // Restrict the Y coordinate to within the screen height
            if (newY < topbarHeight) {
                  element.style.top = topbarHeight;
            } else {
                  element.style.top = Math.min(newY, (window.innerHeight - element.offsetHeight)) + "px";
            }

            // Get the inteded update X position
            newX = element.offsetLeft - currentX
            // Restrict the X coordinate to within the screen width
            if (newX < 0) {
                  element.style.left = 0
            } else {
                  element.style.left = Math.min(newX, (window.innerWidth - element.offsetWidth)) + "px";
            }
      }

      // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
      function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
      }
}


// Closing and opening a window
function closeWindow(element) {
      element.style.display = "none";
}


// Welcome window
initialiseWindow('welcome')


// Notes window
initialiseWindow('notes')

function setNotesContent(index) {
      var notesContent = document.getElementById('notesContent');
      notesContent.innerHTML = content[index].content;
}

function addToNotes(index) {
      var contentDiv = document.getElementById('notesContent');
      var note = content[index].content;
      var newDiv = document.createElement('div');
      newDiv.innerHTML = note;
      // newDiv.addEventListener('click', function() {
      //       setNotesContent(index);
      // });

      contentDiv.appendChild(newDiv);
}

var content = [
      {
            content: `
                  <h1 contenteditable="True" class="editable-text">Notes</h1>
                  <p contenteditable="True" class="editable-text">
                        The Notes app is a space for you to type down anything: reminders/tasks, a quote you found, random thoughts, or really anything you want to add.
                  </p>
            `
      },
      {
            content: `
            <p contenteditable="True" style="color: brown;" class="editable-text">Another sample note</p>
      `
      }
]

// setNotesContent(0)

for (let i = 0; i < content.length; i++) {
      addToNotes(i)
}


// Initialise stopwatch app
initialiseWindow('stopwatch')

let [seconds, minutes, hours] = [0, 0, 0];
let stopwatchTime = document.getElementById('stopwatchTime');
let timer = null

let stopwatchStartStopBtn = document.getElementById('stopwatchStartStopBtn');

function stopwatch() {
      seconds++;

      if (seconds == 60) {
            seconds = 0;
            minutes++;

            if (minutes == 60) {
                  minutes = 0
                  hours++;
            }
      }

      let h = hours < 10 ? "0" + hours : hours;
      let m = minutes < 10 ? "0" + minutes : minutes;
      let s = seconds < 10 ? "0" + seconds : seconds;

      stopwatchTime.innerHTML = h + ':' + m + ':' + s
}

function startStopwatch() {
      if (stopwatchStartStopBtn.innerHTML == 'Start') {
            timer = setInterval(stopwatch, 1000);
            stopwatchStartStopBtn.innerHTML = 'Stop';
      } else {
            clearInterval(timer);
            stopwatchStartStopBtn.innerHTML = 'Start';
      }

}

function stopStopwatch() {
      clearInterval(timer);
}

function resetStopwatch() {
      clearInterval(timer);
      [seconds, minutes, hours] = [0, 0, 0];
      stopwatchTime.innerHTML = "00:00:00";
}


