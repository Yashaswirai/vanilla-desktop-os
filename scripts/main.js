function clock() {
  const time = Date.now();
  let HH = new Date(time).getHours();
  let mm = new Date(time).getMinutes();
  if (HH < 10) {
    HH = `0${HH}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  let timeString = `${HH}:${mm}`;
  if (HH > 12 && HH < 24) {
    timeString = `${HH - 12}:${mm} PM`;
  } else {
    timeString = `${HH}:${mm} AM`;
  }
  document.getElementById("clock").textContent = timeString;
}
clock();
setInterval(clock, 60000);

const iconContainers = document.querySelectorAll(".icon-container");
let windowIdCounter = 0;
let zIndexCounter = 10; // Use a separate counter for z-index
let wallpaperSrc = [
  "./assets/wallpapers/1.webp",
  "./assets/wallpapers/2.jpg",
  "./assets/wallpapers/3.jpg",
  "./assets/wallpapers/4.jpg",
];

// Fetching of data from the JSON file
const data = async () => {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    const icons = document.querySelector(".icons");

    // Create icons dynamically
    jsonData.forEach((item) => {
      const iconContainer = createIconContainer(
        item.name,
        item.img,
        item.contents
      );
      const inputFiled = iconContainer.querySelector("input");
      inputFiled.addEventListener("click", () => {
        inputFiled.style.cursor = text;
      });

      icons.appendChild(iconContainer);
      initializeIcon(iconContainer, item);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

data();

// Function to initialize each icon with click and drag functionality
function initializeIcon(container, item) {
  iconDraggable(container);
  clickEventIcon(container, item);
}

function createWindow(title, content, img) {
  const windowId = `window-${windowIdCounter++}`;

  // Create element programmatically to keep a direct reference
  const windowElement = document.createElement("div");
  windowElement.id = windowId;
  windowElement.className =
    "window absolute top-1/4 left-1/4 w-96 h-64 bg-gray-200 rounded-lg shadow-lg flex flex-col";
  windowElement.style.zIndex = zIndexCounter++;
  windowElement.style.left = `${Math.random() * 200 + 50}px`; // Randomize initial position
  windowElement.style.top = `${Math.random() * 200 + 50}px`;

  // Use a class for the close button instead of an ID
  windowElement.innerHTML = `
    <div class="window-header w-full flex items-center justify-between p-1">
        <span class="window-title text-lg pl-2">${title}</span>
        <div class="flex items-center justify-end gap-2">
            <button class="minimize-button hover:bg-gray-100/45 cursor-pointer p-2 w-5">-</button>
            <button class="close-button text-red-500 hover:bg-gray-100/45 cursor-pointer p-2 w-5">X</button>
        </div>
    </div>
    <div class="window-content p-2 flex-grow overflow-auto">
        <div class="window-content-inner">${content}</div>
    </div>`;

  document.getElementById("desktop").appendChild(windowElement);
  const isActive = true; // Track if the window is active
  // Pass the new element directly to the handler functions

  dragWindow(windowElement);
  focusWindow(windowElement, isActive);
  addCloseButtonFunctionality(windowElement);
  addMinimizeButtonFunctionality(windowElement, isActive);
  addTaskbarButtonFunctionality(windowElement, isActive, img);
}

// Function to handle dragging of windows
function dragWindow(windowElement) {
  const header = windowElement.querySelector(".window-header");
  let isDragging = false;
  let offsetX, offsetY;

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // Only drag with left mouse button

    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;

    // Add listeners to the document to handle dragging anywhere
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      windowElement.style.left = `${e.clientX - offsetX}px`;
      windowElement.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    // Important: remove listeners to avoid memory leaks and bugs
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  header.addEventListener("mousedown", onMouseDown);
}

// Funtion to handle focus on windows
function focusWindow(windowElement, isActive) {
  windowElement.addEventListener("mousedown", () => {
    // Bring the clicked window to the front by increasing its z-index
    windowElement.style.zIndex = zIndexCounter++;
  });
  if (!isActive) {
    windowElement.style.display = "flex"; // Ensure the window is visible when focused
    isActive = true; // Update the active state
  }
}

// Close Button Functionality
function addCloseButtonFunctionality(windowElement) {
  const closeButton = windowElement.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", (e) => {
      // Prevent the click from triggering the window's focus listener
      e.stopPropagation();
      windowElement.remove();
      removeTaskbarButton(windowElement); // Remove the taskbar button
    });
  }
}

// minimize Button Functionality
function addMinimizeButtonFunctionality(windowElement, isActive) {
  const minimizeButton = windowElement.querySelector(".minimize-button");
  if (minimizeButton) {
    minimizeButton.addEventListener("click", () => {
      if (isActive) {
        windowElement.style.display = "none"; // Hide the window
        isActive = false; // Update the active state
      } else {
        windowElement.style.display = "flex"; // Show the window again
        isActive = true; // Update the active state
      }
    });
  }
}

// Add taskbar button functionality
function addTaskbarButtonFunctionality(windowElement, isActive, img) {
  const taskbar = document.getElementById("taskbar-icons");
  const button = document.createElement("img");
  button.className = "taskbar-button";
  button.id = `taskbar-button-${windowElement.id}`;
  button.src = img;
  button.alt = "Taskbar Button";
  button.style.cursor = "pointer";
  taskbar.appendChild(button);
  button.addEventListener("click", () => {
    // Bring the associated window to the front
    if (isActive) {
      windowElement.style.display = "none"; // Hide the window
      isActive = false; // Update the active state
    } else {
      windowElement.style.display = "flex"; // Show the window again
      isActive = true; // Update the active state
      windowElement.style.zIndex =
        zIndexCounter == windowElement.style.zIndex
          ? ++zIndexCounter
          : windowElement.style.zIndex; // Bring to front
    }
  });

  taskbar.appendChild(button);
}

// remove taskbar button when window is closed
function removeTaskbarButton(windowElement) {
  const button = document.getElementById(`taskbar-button-${windowElement.id}`);
  if (button) {
    button.remove();
  }
}

// function to create icon containers
function createIconContainer(title, imgSrc, contents) {
  const container = document.createElement("div");
  container.className =
    "icon-container w-24 h-[fit-content] leading-none flex flex-col items-center rounded hover:cursor-pointer transition duration-300";

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = title;
  img.className = "icon w-12 object-cover "; // Set a fixed size for the icon image

  const label = document.createElement("input");
  label.className = "icon-label text-sm";
  label.value = title;
  label.type = "text";
  // label.readOnly = true; // Make the label read-only to prevent editing
  container.appendChild(img);
  container.appendChild(label);
  return container;
}

// Add click event to each icon container to create a window
const clickEventIcon = (container, item) => {
  const title = item.name;
  const img = item.img;
  container.style.width = container.style.height;
  container.addEventListener("dblclick", () => {
    createWindow(title, contentWindow(item), img);
  });
  const inputField = container.querySelector("input");
  inputField.addEventListener("dblclick", (e) => {
    e.stopPropagation(); // Prevent the container's dblclick event
    renameIcon(container);
  });
};

// iconContainer dragging functionality
const iconDraggable = (container) => {
  let isDragging = false;
  let offsetX, offsetY;

  container.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Only drag with left mouse button

    isDragging = true;
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  });

  const onMouseMove = (e) => {
    if (isDragging) {
      container.style.position = "absolute"; // Ensure the container is positioned absolutely
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
};
// Show content function to display files and folders
const showContent = (contents) => {
  if (!contents || contents.length === 0) {
    return `<div class="text-center">No files or folders found.</div>`;
  }
  return contents
    .map((content) => {
      if (content.type === "file") {
        return `<div class="file-item flex items-center gap-2 p-2 cursor-pointer">
                <img src="./assets/file.png" alt="${content.name}" class="w-6 h-6 object-cover">
                <span>${content.name}</span>
              </div>`;
      } else if (content.type === "folder") {
        return `<div class="folder-item flex items-center gap-2 p-2 cursor-pointer" data-folder-name="${content.name}">
                <img src="./assets/folder.png" alt="${content.name}" class="w-6 h-6 object-cover">
                <span>${content.name}</span>
              </div>`;
      }
    })
    .join(""); // Use join to return a single string
};

// Function to handle folder navigation
const navigatingFolder = (windowId, contents) => {
  const windowElement = document.getElementById(windowId);
  const folderItems = windowElement.querySelectorAll(".folder-item");

  folderItems.forEach((folderItem) => {
    folderItem.addEventListener("click", () => {
      const folderName = folderItem.getAttribute("data-folder-name");
      const folderContent = contents.find(
        (content) => content.name === folderName && content.type === "folder"
      );

      if (folderContent) {
        const newContent = showContent(folderContent.contents);
        const windowContentElement = windowElement.querySelector(
          ".window-content .file-list"
        );
        windowContentElement.innerHTML = newContent;

        // Reattach event listeners for the new folder items
        navigatingFolder(windowId, folderContent.contents);
      }
    });
  });
};

// Updated contentWindow function to include navigatingFolder
const contentWindow = (item) => {
  const { contents } = item;
  const windowId = `window-${windowIdCounter}`; // Use the current windowIdCounter for the window ID

  const initialContent = `<div class="file-explorer-content">
                                <div class="file-list flex flex-col gap-2">
                                  ${showContent(contents)}
                                </div>
                              </div>`;
  setTimeout(() => navigatingFolder(windowId, contents), 0); // Attach folder navigation after the window is created
  return initialContent;
};

// Function to add a new folder
const addNewFolder = () => {
  const icons = document.querySelector(".icons");
  const newFolder = createIconContainer(
    "New Folder",
    "./assets/folder.png",
    []
  );
  newFolder.classList.add("new-folder");
  icons.appendChild(newFolder);
  initializeIcon(newFolder, {
    name: "New Folder",
    img: "./assets/folder.png",
    contents: [],
  });
};
let idx = 1;
// Randomly select a wallpaper from the array
// change wallpaper functionality
const changeWallpaper = () => {
  const newWallpaper = wallpaperSrc[idx++ % wallpaperSrc.length];
  const desktop = document.getElementById("desktop");
  desktop.style.backgroundImage = `url('${newWallpaper}')`;
}

// Right-click context menu functionality
const RightClickMenu = () => {
  const contextMenu = document.getElementById("context-menu");
  const desktop = document.getElementById("desktop");

  desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.display = "block";
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;
  });

  document.addEventListener("click", () => {
    contextMenu.style.display = "none"; // Hide the menu on click outside
  });
  // Add event listener for the "Create Folder" button
  const newFolderButton = document.getElementById("create-folder");
  newFolderButton.addEventListener("click", addNewFolder);

  // Add event listener for the "Change Wallpaper" button
  const changeWallpaperButton = document.getElementById("change-wallpaper");
  changeWallpaperButton.addEventListener("click", changeWallpaper);
};
RightClickMenu();

// Rename functionality
const renameIcon = (iconContainer) => {
  const inputField = iconContainer.querySelector("input");
  inputField.removeAttribute("readonly");
  inputField.focus();
  inputField.addEventListener("blur", () => {
    inputField.setAttribute("readonly", true);
  });
};

const themes = ["theme-light", "theme-dark"];
let currentThemeIndex = 0;

const changeTheme = () => {
  const desktop = document.getElementById("desktop");
  // Remove the current theme class
  desktop.classList.remove(themes[currentThemeIndex]);

  // Update the theme index
  currentThemeIndex = currentThemeIndex === 0 ? 1 : 0;

  // Add the new theme class
  desktop.classList.add(themes[currentThemeIndex]);

  // Save the selected theme in localStorage for persistence
  localStorage.setItem("selectedTheme", themes[currentThemeIndex]);
  console.log(`Theme changed to: ${themes[currentThemeIndex]}`);
};

// Apply the saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme");
  const desktop = document.getElementById("desktop");
  if (savedTheme && themes.includes(savedTheme)) {
    desktop.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
  } else {
    desktop.classList.add(themes[0]); // Default to light theme
  }
});

// Add event listener for theme switching
document.getElementById("change-theme").addEventListener("click", changeTheme);

// On refresh the page will reload
document.getElementById("refresh").addEventListener("click", () => {
  window.location.reload();
});
