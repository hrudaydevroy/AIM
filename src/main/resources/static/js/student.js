const studentId = localStorage.getItem("studentId");

function isValidObjectId(id) {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
}

function clearStudentSession() {
  ["studentId", "studentName", "studentBatch", "studentUsername", "role"].forEach((k) =>
    localStorage.removeItem(k)
  );
}

if (!isValidObjectId(studentId)) {
  clearStudentSession();
  alert("Session expired. Please login again.");
  window.location = "login.html";
}

let currentStudent = {};
let currentBatch = "";
let allVideos = [];
let allSessions = [];
let allModules = [];
let allAssignments = [];
let allNotes = [];
let currentFilter = "all";

/* ================= LOAD STUDENT ================= */
fetch("http://localhost:8080/api/students/"+studentId)
.then(res=>{
  if (res.status === 401 || res.status === 403) throw new Error("UNAUTHORIZED");
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error("SERVER_ERROR");
  return res.json();
})
.then(student=>{
  currentStudent = student;
  currentBatch = student.batch || "";

  // Update navbar
  document.getElementById("navName").innerText = student.name || "Student";
  
  // Update profile section
  document.getElementById("profileName").innerText = student.name || "Student";
  document.getElementById("profileBadge").innerText = student.batch || "N/A";
  document.getElementById("profileEmail").innerText = student.email || "N/A";
  
  // Update profile image
  if(student.image && student.image.trim() !== ""){
    const img = "http://localhost:8080" + student.image;
    document.getElementById("navImg").src = img;
    document.getElementById("profileImg").src = img;
  } else {
    document.getElementById("navImg").src = "img/default.png";
    document.getElementById("profileImg").src = "img/default.png";
  }

  // Update personal details
  document.getElementById("infoName").innerText = student.name || "N/A";
  document.getElementById("infoEmail").innerText = student.email || "N/A";
  document.getElementById("infoPhone").innerText = student.phone || "N/A";
  document.getElementById("infoGuardian").innerText = student.guardian || "N/A";

  // Update education
  document.getElementById("infoInstitute").innerText = student.institute || "N/A";
  document.getElementById("infoQualification").innerText = student.qualification || "N/A";
  document.getElementById("infoYear").innerText = student.year || "N/A";
  document.getElementById("infoCGPA").innerText = student.cgpa ? student.cgpa + " CGPA" : "N/A";

  // Update account info
  if(student.joiningDate){
    const joinDate = new Date(student.joiningDate);
    document.getElementById("infoJoiningDate").innerText = joinDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  } else {
    document.getElementById("infoJoiningDate").innerText = "N/A";
  }
  
  // Calculate expiry date (1 year from joining)
  if(student.joiningDate){
    const joinDate = new Date(student.joiningDate);
    const expiryDate = new Date(joinDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.getElementById("infoExpiryDate").innerText = expiryDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  } else {
    document.getElementById("infoExpiryDate").innerText = "N/A";
  }
  
  document.getElementById("infoMode").innerText = student.mode || "Offline";

  // Load all data
  loadSessions();
  loadModules();
  loadAssignments();
  loadNotes();
  loadVideos();
})
.catch(err=>{
  console.error("Error loading student:", err);
  if (err?.message === "UNAUTHORIZED" || err?.message === "NOT_FOUND") {
    clearStudentSession();
    alert("Error loading student data. Please login again.");
    window.location = "login.html";
    return;
  }

  alert(
    "Cannot load student data right now. Make sure the backend is running on port 5000, then refresh this page."
  );
});

/* ================= NAVIGATION ================= */
function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.querySelectorAll(".nav-right button").forEach(b=>b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  
  // Set active button
  const buttons = document.querySelectorAll(".nav-right button");
  buttons.forEach((btn, index) => {
    const sections = ['home', 'videos', 'sessions', 'modules', 'assignments', 'notes'];
    if(sections[index] === id){
      btn.classList.add("active");
    }
  });
  
  // Load videos if videos section is opened
  if(id === 'videos' && allVideos.length === 0){
    loadVideos();
  }
}

/* ================= LOAD SESSIONS ================= */
function loadSessions(){
  fetch(`http://localhost:8080/api/attendance?studentId=${studentId}&batch=${currentBatch}`)
  .then(res=>res.json())
  .then(data=>{
    allSessions = data;
    renderSessions();
  })
  .catch(err=>{
    console.error("Error loading sessions:", err);
    document.getElementById("sessionsList").innerHTML = "<div class='empty-state'><div class='empty-state-icon'>📅</div><div>No sessions found</div></div>";
  });
}

function renderSessions(){
  const container = document.getElementById("sessionsList");
  const filtered = filterSessionsData(allSessions, currentFilter);
  
  document.getElementById("sessionCount").innerText = `Showing ${filtered.length} of ${allSessions.length} sessions`;

  if(filtered.length === 0){
    container.innerHTML = "<div class='empty-state'><div class='empty-state-icon'>📅</div><div>No sessions found</div></div>";
    return;
  }

  // Group by date
  const grouped = {};
  filtered.forEach(session => {
    const date = session.date || "Unknown";
    if(!grouped[date]){
      grouped[date] = [];
    }
    grouped[date].push(session);
  });

  // Sort dates descending
  const sortedDates = Object.keys(grouped).sort((a,b) => new Date(b) - new Date(a));

  container.innerHTML = "";
  sortedDates.forEach(date => {
    const sessions = grouped[date];
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      weekday: 'short', 
      year: 'numeric' 
    });

    container.innerHTML += `
      <div class="session-card">
        <div class="session-date">${dateStr}</div>
        <div class="session-subjects">
          ${sessions.map(s => `
            <div class="subject-tag">
              <span>${s.module || 'N/A'}</span>
              <span class="attendance-badge ${getStatusClass(s.status)}">${s.status || 'Pending'}</span>
            </div>
          `).join('')}
        </div>
        <div class="session-count">
          <span></span>
          <span class="session-badge">${sessions.length} Session${sessions.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  });
}

function filterSessions(type){
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if(btn.textContent.trim().toLowerCase() === type.toLowerCase() || 
       (type === "all" && btn.textContent.trim().toLowerCase() === "all")){
      btn.classList.add("active");
    }
  });
  renderSessions();
}

function filterSessionsData(sessions, filter){
  if(filter === "all") return sessions;
  return sessions.filter(s => s.status?.toLowerCase() === filter.toLowerCase());
}

function filterByDate(){
  const dateFilter = document.getElementById("dateFilter").value;
  const datePicker = document.getElementById("datePicker").value;
  
  let filtered = allSessions;
  
  if(datePicker){
    filtered = filtered.filter(s => s.date === datePicker);
  }
  
  allSessions = filtered;
  renderSessions();
}

function getStatusClass(status){
  const s = status?.toLowerCase();
  if(s === "present") return "attendance-present";
  if(s === "absent") return "attendance-absent";
  return "attendance-pending";
}

/* ================= LOAD MODULES ================= */
function loadModules(){
  fetch(`http://localhost:8080/api/attendance?studentId=${studentId}&batch=${currentBatch}`)
  .then(res=>res.json())
  .then(data=>{
    allModules = data;
    renderModules();
  })
  .catch(err=>{
    console.error("Error loading modules:", err);
  });
}

function renderModules(){
  const tbody = document.getElementById("modulesTableBody");
  const filtered = filterModulesData(allModules, currentFilter);
  
  document.getElementById("moduleCount").innerText = `Showing ${filtered.length} of ${allModules.length} classes`;

  if(filtered.length === 0){
    tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><div class="empty-state-icon">📚</div><div>No modules found</div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((module, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${module.module || 'N/A'}</strong></td>
      <td>${module.topic || 'N/A'}</td>
      <td><span class="status-badge ${getStatusClass(module.status)}">${module.status || 'Pending'}</span></td>
      <td>${module.instructor || 'N/A'}</td>
      <td>${formatDate(module.date)}</td>
      <td>${module.time || 'N/A'}</td>
      <td><button class="view-btn" onclick="viewModule('${module._id}')">► View</button></td>
    </tr>
  `).join('');
}

function filterModules(type){
  currentFilter = type;
  document.querySelectorAll(".module-filter-btn").forEach((btn, index) => {
    btn.classList.remove("active");
    if((type === "all" && index === 0) || 
       (type === "present" && index === 1) ||
       (type === "absent" && index === 2) ||
       (type === "pending" && index === 3)){
      btn.classList.add("active");
    }
  });
  renderModules();
}

function filterModulesData(modules, filter){
  if(filter === "all") return modules;
  return modules.filter(m => m.status?.toLowerCase() === filter.toLowerCase());
}

function searchModules(){
  const search = document.getElementById("moduleSearch").value.toLowerCase();
  let filtered = allModules;
  
  if(search){
    filtered = allModules.filter(m => 
      (m.module && m.module.toLowerCase().includes(search)) ||
      (m.topic && m.topic.toLowerCase().includes(search)) ||
      (m.instructor && m.instructor.toLowerCase().includes(search))
    );
  }
  
  // Apply current filter
  filtered = filterModulesData(filtered, currentFilter);
  
  const tbody = document.getElementById("modulesTableBody");
  document.getElementById("moduleCount").innerText = `Showing ${filtered.length} of ${allModules.length} classes`;

  if(filtered.length === 0){
    tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><div class="empty-state-icon">📚</div><div>No modules found</div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((module, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${module.module || 'N/A'}</strong></td>
      <td>${module.topic || 'N/A'}</td>
      <td><span class="status-badge ${getStatusClass(module.status)}">${module.status || 'Pending'}</span></td>
      <td>${module.instructor || 'N/A'}</td>
      <td>${formatDate(module.date)}</td>
      <td>${module.time || 'N/A'}</td>
      <td><button class="view-btn" onclick="viewModule('${module._id}')">► View</button></td>
    </tr>
  `).join('');
}

function formatDate(dateStr){
  if(!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
}

function viewModule(id){
  const module = allModules.find(m => m._id === id);
  if(module){
    alert(`Module: ${module.module}\nTopic: ${module.topic}\nStatus: ${module.status}\nInstructor: ${module.instructor}`);
  }
}

/* ================= LOAD ASSIGNMENTS ================= */
function loadAssignments(){
  fetch(`http://localhost:8080/api/assignments?studentId=${studentId}&batch=${currentBatch}`)
  .then(res=>res.json())
  .then(data=>{
    allAssignments = data;
    renderAssignments();
  })
  .catch(err=>{
    console.error("Error loading assignments:", err);
  });
}

function renderAssignments(){
  const container = document.getElementById("assignmentsList");
  if(allAssignments.length === 0){
    container.innerHTML = "<div class='empty-state'><div class='empty-state-icon'>📝</div><div>No assignments found</div></div>";
    return;
  }
  
  container.innerHTML = allAssignments.map(assignment => `
    <div class="info-card" style="margin-bottom: 15px;">
      <h3>${assignment.title || 'Untitled Assignment'}</h3>
      <p>${assignment.description || ''}</p>
      <p><strong>Module:</strong> ${assignment.module || 'N/A'} | <strong>Due Date:</strong> ${assignment.dueDate || 'N/A'}</p>
      <p><strong>Status:</strong> <span class="status-badge ${getStatusClass(assignment.status)}">${assignment.status || 'Pending'}</span></p>
    </div>
  `).join('');
}

/* ================= LOAD NOTES ================= */
function loadNotes(){
  fetch(`http://localhost:8080/api/notes?studentId=${studentId}&batch=${currentBatch}`)
  .then(res=>res.json())
  .then(data=>{
    allNotes = data;
    renderNotes();
  })
  .catch(err=>{
    console.error("Error loading notes:", err);
  });
}

function renderNotes(){
  const container = document.getElementById("notesList");
  if(allNotes.length === 0){
    container.innerHTML = "<div class='empty-state'><div class='empty-state-icon'>📄</div><div>No notes found</div></div>";
    return;
  }
  
  container.innerHTML = allNotes.map(note => `
    <div class="info-card" style="margin-bottom: 15px;">
      <h3>${note.title || 'Untitled Note'}</h3>
      <p>${note.content || ''}</p>
      <p><strong>Module:</strong> ${note.module || 'N/A'} | <strong>Topic:</strong> ${note.topic || 'N/A'}</p>
      ${note.fileUrl ? `<a href="${note.fileUrl}" target="_blank">Download Note</a>` : ''}
    </div>
  `).join('');
}

/* ================= LOAD VIDEOS ================= */
function loadVideos(){
  fetch("http://localhost:8080/api/videos")
  .then(res=>res.json())
  .then(data=>{
    allVideos = data.filter(v=>v.batch===currentBatch);
    renderVideos();
    updateVideoFilters();
  })
  .catch(err=>{
    console.error("Error loading videos:", err);
    document.getElementById("videosGrid").innerHTML = "<div class='empty-state'><div class='empty-state-icon'>📹</div><div>No videos found</div></div>";
  });
}

function renderVideos(filterCourse = ""){
  const container = document.getElementById("videosGrid");
  let filtered = allVideos;
  
  if(filterCourse && filterCourse !== "all" && filterCourse !== ""){
    filtered = allVideos.filter(v => v.course && v.course.toLowerCase() === filterCourse.toLowerCase());
  }
  
  if(filtered.length === 0){
    container.innerHTML = "<div class='empty-state' style='grid-column: 1/-1;'><div class='empty-state-icon'>📹</div><div>No videos available for your batch</div><div style='margin-top: 10px; color: #999; font-size: 14px;'>Videos uploaded by Admin/Sales will appear here</div></div>";
    return;
  }
  
  // Sort by creation date (newest first)
  filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });
  
  container.innerHTML = filtered.map(video => {
    const date = video.createdAt ? new Date(video.createdAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) : "Recent";
    
    // Ensure YouTube URL is embed format
    let videoUrl = video.url || "";
    if(videoUrl && !videoUrl.includes("embed")){
      // Convert YouTube watch URL to embed URL
      if(videoUrl.includes("youtube.com/watch?v=")){
        const videoId = videoUrl.split("v=")[1]?.split("&")[0];
        if(videoId) videoUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if(videoUrl.includes("youtu.be/")){
        const videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
        if(videoId) videoUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    return `
      <div class="video-card">
        <div class="video-thumbnail">
          ${videoUrl ? `<iframe src="${videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : '<div class="video-play-overlay">▶</div><div style="text-align: center; padding-top: 80px; color: white;">No video URL</div>'}
        </div>
        <div class="video-info">
          <div class="video-title">${video.title || 'Untitled Video'}</div>
          <div class="video-meta">
            <span class="video-course">${video.course || 'General'}</span>
            <span class="video-date">${date}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterVideos(course){
  // Update active button
  document.querySelectorAll(".video-filter-btn").forEach(btn => {
    btn.classList.remove("active");
    const btnText = btn.textContent.trim();
    if((course === "all" && btnText === "All Videos") ||
       (course === "" && btnText === "All Courses") ||
       (course && btnText === course)){
      btn.classList.add("active");
    }
  });
  
  if(course === "all" || course === ""){
    renderVideos("");
  } else {
    renderVideos(course);
  }
}

function updateVideoFilters(){
  // Get unique courses from videos
  const courses = [...new Set(allVideos.map(v => v.course).filter(c => c))];
  const filterContainer = document.querySelector(".video-filters");
  
  // Remove existing course filters (keep "All Videos" and "All Courses")
  const existingFilters = filterContainer.querySelectorAll(".video-filter-btn");
  existingFilters.forEach((btn, index) => {
    if(index > 1) btn.remove(); // Keep first two buttons
  });
  
  // Add course filter buttons
  courses.forEach(course => {
    const btn = document.createElement("button");
    btn.className = "video-filter-btn";
    btn.textContent = course;
    btn.onclick = () => filterVideos(course);
    filterContainer.appendChild(btn);
  });
}
