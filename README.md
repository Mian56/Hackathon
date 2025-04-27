🚔 Crime Investigation: Linden St Burglaries
This project is a crime investigation dashboard that visualizes crime scenes, camera events, and suspect phone pings on an interactive map and timeline.

Built with React and Leaflet.js.

Uses suspect profiles, interactive map markers, timeline events, and a generate report modal.

Styled with a dark crime-scene theme for an immersive experience.

🔧 Features
Interactive Crime Map 🗺️
Visualize:

Crime scenes (🔴 Red markers).

Camera detections (🟠 Orange markers).

Suspect phone pings:

Ruth (🔵 Blue)

Kevin (🟢 Green)

Jamal (🟣 Purple)

Legend overlay to explain map markers.

Timeline of Events 📅

Clickable timeline entries (crimes, cameras, pings).

Scrollable panel for easy navigation.

Color-coded events based on type (Crime, Camera, Suspect).

Suspect Profiles 👤

Toggle suspects to highlight their pings on the map and timeline.

Profiles update dynamically based on selection.

Generate Report Modal 📄

Animated Generate Report button with scaling and shadows.

Clicking opens a modal in the center summarizing key suspect activity:

Ruth suspected on March 3rd and 4th.

Kevin & Jamal suspected on March 5th.

Thematic UI Design

Dark mode with yellow, red, blue highlights to mimic an investigation board.

Dashed borders (like crime scene tape).

Subtle grid pattern overlay for a wireframe vibe.

🚀 Technologies Used
React.js (Create React App)

Leaflet.js (for interactive maps)

JavaScript (ES6) (no external CSS framework)

Inline CSS styling (fully customized)

💻 Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Opens at http://localhost:3000 by default (or another port if in use).

npm run build
Builds the app for production.

npm test
Launches the test runner.

📝 Topics Covered
React state management for controlling:

Selected suspects

Selected map events

Modal visibility

Leaflet map layers with:

Markers for different events

Fly-to animations on event click.

CSS animations for:

Button hover effects (scale, shadow).

Modal popups centered on screen.

Custom timeline with:

Color-coded dots

Hover animations (text and background color shift).

Global styling without external CSS files (using useEffect for body styles).
