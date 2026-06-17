const API_URL = "http://localhost:8080";

function saveLead() {
  const leadData = {
    name: document.getElementById("name")?.value || name?.value,
    email: document.getElementById("email")?.value || email?.value,
    phone: document.getElementById("phone")?.value || phone?.value,
    message: document.getElementById("message")?.value || message?.value
  };

  // Send to API
  fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Lead saved:", data);
      alert("Submitted successfully!");
      // Also save to localStorage for backup
      let leads = JSON.parse(localStorage.getItem("leads")) || [];
      leads.push(leadData);
      localStorage.setItem("leads", JSON.stringify(leads));
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Failed to submit. Saving locally.");
      // Fallback to localStorage
      let leads = JSON.parse(localStorage.getItem("leads")) || [];
      leads.push(leadData);
      localStorage.setItem("leads", JSON.stringify(leads));
    });
}

function getLeads() {
  fetch(`${API_URL}/leads`)
    .then(res => res.json())
    .then(data => {
      console.log("Leads from API:", data);
      // Display leads in UI
      displayLeads(data);
    })
    .catch(err => {
      console.error("Error fetching leads:", err);
      // Fallback to localStorage
      let leads = JSON.parse(localStorage.getItem("leads")) || [];
      displayLeads(leads);
    });
}

function displayLeads(leads) {
  const container = document.getElementById("leads-container");
  if (!container) return;
  
  container.innerHTML = leads
    .map(lead => `<div class="lead"><strong>${lead.name}</strong> - ${lead.email} (${lead.phone})</div>`)
    .join("");
}