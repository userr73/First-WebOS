// Get top bar
var topBar = document.getElementById('topbar')


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
            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
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
      notesContent.innerHTML = content[index].content
}

var content = [
      {
            content: `
                  <h1 contenteditable="True" class="editable-text">Notes</h1>
                  <p contenteditable="True" class="editable-text">
                        The Notes app is a space for you to type down anything: reminders/tasks, a quote you found, random thoughts, or really anything you want to add.
                  </p>
            `
      }
]

setNotesContent(0)



