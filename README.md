# 🖥️ Vanilla Desktop OS

A fully functional desktop-like environment built entirely with vanilla HTML, CSS, and JavaScript. Experience a complete operating system interface in your browser with no frameworks, no canvas - just pure DOM manipulation and modern web technologies.

![Desktop Preview](assets/wallpapers/1.webp)

## ✨ Features

### 🪟 Window Management System
- **Multi-window support** - Open multiple applications simultaneously
- **Draggable windows** - Click and drag window headers to move them around
- **Resizable windows** - Resize from any edge or corner with 8-direction handles
- **Window controls** - Minimize, maximize, and close buttons
- **Focus management** - Click any window to bring it to the front
- **Smart positioning** - Windows spawn at random positions to avoid overlap

### 📋 Taskbar & Navigation
- **Live taskbar** - Shows icons for all open applications
- **Click to minimize/restore** - Click taskbar icons to toggle window visibility
- **Real-time clock** - Updates every 10 seconds with current time
- **Date display** - Shows current date in DD/MM/YYYY format
- **Weather widget** - Live weather data based on your location
- **Start menu** - Windows-style menu with app search and recommendations

### 📁 File System Simulation
- **Hierarchical file structure** - Nested folders and files
- **File Explorer** - Browse through folders and files
- **Double-click to open** - Launch applications and navigate folders
- **Context-aware content** - Different apps show different file types

### 🎨 Customization & Theming
- **Theme switching** - Toggle between light and dark themes
- **Wallpaper rotation** - Cycle through 4 beautiful wallpapers
- **Persistent settings** - Your theme and wallpaper choices are remembered
- **CSS custom properties** - Clean theming system with CSS variables

### 📱 Desktop Icons & Interaction
- **Draggable icons** - Move desktop icons anywhere
- **Rename functionality** - Double-click icon labels to rename
- **Right-click context menu** - Access desktop actions
- **Dynamic icon creation** - Create new folders on the fly

### 🌐 Modern Web Features
- **Geolocation weather** - Automatic weather based on your location
- **Local storage persistence** - Settings saved between sessions
- **Responsive design** - Works on different screen sizes
- **Modern CSS** - Backdrop filters, transitions, and hover effects

## 🚀 Getting Started

### Quick Start
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Allow location access for weather functionality (optional)
4. Start exploring your new desktop environment!

### No Dependencies Required
This project runs entirely in the browser with no build process, no npm packages, and no server required. Just open and go!

## 📖 How to Use

### Basic Navigation
- **Desktop**: Right-click anywhere for context menu options
- **Windows**: Drag by the header, resize from edges/corners
- **Taskbar**: Click the Windows button to open the start menu
- **Icons**: Double-click to open, drag to move, double-click labels to rename

### Window Operations
- **Open**: Double-click any desktop icon
- **Move**: Click and drag the window header
- **Resize**: Hover over window edges/corners and drag
- **Minimize**: Click the `-` button (restore via taskbar)
- **Maximize**: Click the `🔲` button (toggles fullscreen)
- **Close**: Click the `X` button

### Customization
- **Change Theme**: Right-click desktop → "Change Theme"
- **Change Wallpaper**: Right-click desktop → "Change Wallpaper"
- **Create Folder**: Right-click desktop → "Create Folder"
- **Refresh**: Right-click desktop → "Refresh" (reloads the page)

### File Explorer
- **Navigate**: Click folders to open them
- **File Types**: See different icons for files vs folders
- **Nested Structure**: Explore multiple folder levels
- **Sample Content**: Includes Resume, Project folder, Notes, and Recycle Bin

## 🏗️ Project Structure

```
vanilla-desktop-os/
├── index.html              # Main HTML structure
├── scripts/
│   └── main.js             # All JavaScript functionality
├── style/
│   └── main.css            # Styling and themes
├── data/
│   └── data.json           # Desktop icons and file structure
├── assets/
│   ├── *.png               # UI icons (folder, file, etc.)
│   └── wallpapers/         # Background images
│       ├── 1.webp
│       ├── 2.jpg
│       ├── 3.jpg
│       └── 4.jpg
└── README.md               # This documentation
```

### Key Files Explained

#### `index.html`
The main structure includes:
- Desktop container with icon area
- Right-click context menu
- Start menu with search and app recommendations  
- Taskbar with weather, Windows button, and clock
- Uses TailwindCSS via CDN for utility classes

#### `scripts/main.js` (742 lines)
Core functionality includes:
- **Weather API integration** - Real-time weather data
- **Time/date management** - Live clock updates
- **Window system** - Creation, dragging, resizing, focus
- **Icon management** - Dragging, renaming, clicking
- **File system simulation** - Folder navigation
- **Theme/wallpaper switching** - UI customization
- **Local storage** - Settings persistence
- **Event handling** - Mouse, click, drag events

#### `style/main.css` (382 lines)
Styling system featuring:
- **CSS custom properties** - Clean theming with variables
- **Theme definitions** - Light and dark mode colors
- **Component styles** - Windows, taskbar, icons, menus
- **Resize handles** - 8-direction window resizing
- **Responsive design** - Flexible layouts
- **Modern effects** - Backdrop filters, transitions

#### `data/data.json`
Defines the desktop icon structure:
- **Desktop apps** - File Explorer, Notes, Recycle Bin
- **File hierarchy** - Nested folders and files
- **Icon mapping** - Links to asset images
- **Content simulation** - Sample files and folders

## 🛠️ Adding New Features

### Creating New Desktop Icons
Edit `data/data.json` to add new applications:

```json
{
  "name": "My New App",
  "img": "./assets/my-app-icon.png",
  "contents": [
    {
      "name": "App File.txt",
      "type": "file"
    },
    {
      "name": "App Folder",
      "type": "folder",
      "contents": [...]
    }
  ]
}
```

### Adding New Wallpapers
1. Add your image to `assets/wallpapers/`
2. Update the `wallpaperSrc` array in `main.js`:
```javascript
let wallpaperSrc = [
  "./assets/wallpapers/1.webp",
  "./assets/wallpapers/2.jpg", 
  "./assets/wallpapers/3.jpg",
  "./assets/wallpapers/4.jpg",
  "./assets/wallpapers/your-new-wallpaper.jpg" // Add here
];
```

### Creating Custom Themes
Add new theme classes in `main.css`:
```css
.theme-custom {
  --bg-color: #your-color;
  --text-color: #your-color;
  /* ... other CSS variables ... */
}
```

Then update the themes array in `main.js`:
```javascript
const themes = ["theme-light", "theme-dark", "theme-custom"];
```

### Extending Window Content
Modify the `contentWindow()` function in `main.js` to customize what appears inside application windows based on the app type.

## 🎯 Technical Highlights

### Architecture Decisions
- **Pure vanilla approach** - No frameworks for maximum performance
- **Component-based structure** - Modular functions for each feature
- **Event delegation** - Efficient event handling
- **CSS custom properties** - Dynamic theming system
- **Local storage integration** - Persistent user preferences

### Advanced Features
- **8-direction window resizing** - Professional desktop-like experience
- **Z-index management** - Proper window layering and focus
- **Event bubbling control** - Precise interaction handling
- **Memory leak prevention** - Proper event listener cleanup
- **Boundary constraints** - Windows stay within screen bounds

### Performance Optimizations
- **Efficient DOM manipulation** - Minimal reflows and repaints
- **Event listener management** - Add/remove pattern for dynamic content
- **Selective updates** - Only update time every 10 seconds
- **CSS transitions** - Hardware-accelerated animations

## 🔧 Browser Compatibility

### Requirements
- **Modern browsers** - Chrome, Firefox, Safari, Edge
- **ES6+ support** - Arrow functions, async/await, destructuring
- **CSS Grid/Flexbox** - Modern layout systems
- **Geolocation API** - For weather functionality (optional)

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🐛 Known Issues & Limitations

### Current Limitations
- **Weather API dependency** - Requires internet connection for weather
- **Single-user environment** - No multi-user support
- **File system simulation** - Not connected to real file system
- **App functionality** - Apps show file structure, not real functionality

### Potential Improvements
- Add more interactive applications (calculator, text editor, etc.)
- Implement virtual file system with create/delete operations
- Add window snapping and tiling features
- Create more sophisticated animations and transitions
- Add keyboard shortcuts for common operations
- Implement window grouping and virtual desktops

## 🤝 Contributing

This project demonstrates advanced vanilla JavaScript concepts including:
- Complex DOM manipulation and event handling
- State management without frameworks
- Modular architecture and clean code practices
- Modern CSS techniques and responsive design
- API integration and local storage usage

Feel free to fork, modify, and extend this project. Some ideas for contributions:
- New applications and functionality
- Additional themes and customization options
- Mobile/touch device support
- Accessibility improvements
- Performance optimizations

## 🎓 Learning Outcomes

Building this project teaches:
- **Advanced JavaScript** - Event handling, async programming, DOM manipulation
- **CSS Architecture** - Custom properties, component styling, responsive design
- **State Management** - Without frameworks, using vanilla patterns
- **UI/UX Design** - Creating intuitive desktop-like interfaces
- **Project Organization** - Structuring complex vanilla JS applications

## 🎓 About This Project

This project was developed during my **COHORT journey** at **Sheryians Coding School**. It represents the culmination of learning advanced vanilla JavaScript concepts, modern CSS techniques, and UI/UX design principles taught throughout the program.

### 🙏 Acknowledgments

Special thanks to the incredible **mentors at Sheryians Coding School** for their guidance, support, and expertise throughout this learning journey. Their dedication to teaching cutting-edge web development practices and encouraging hands-on project building made this complex desktop environment possible.

The COHORT program's emphasis on:
- **Pure vanilla JavaScript mastery** - Building complex applications without frameworks
- **Modern CSS architecture** - Advanced styling with custom properties and responsive design
- **Project-based learning** - Creating real-world applications that demonstrate technical skills
- **Clean code practices** - Writing maintainable and scalable code

This project stands as a testament to the quality of education and mentorship provided by the Sheryians Coding School team.

## 📜 License

This project is open source and available under the MIT License. Feel free to use it for learning, teaching, or as a foundation for your own projects.

---

**Built with ❤️ using only vanilla HTML, CSS, and JavaScript**

*Developed during COHORT journey at Sheryians Coding School*

*No frameworks, no build tools, no dependencies - just the power of the modern web platform.*