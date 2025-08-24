document.getElementById('trackerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const entry = {
    fever: document.getElementById('fever').value,
    feverSeverity: document.getElementById('feverSeverity').value,
    temperature: document.getElementById('temperature').value || 'Not recorded',
    cough: document.getElementById('cough').value,
    coughSeverity: document.getElementById('coughSeverity').value,
    headache: document.getElementById('headache').value,
    headacheSeverity: document.getElementById('headacheSeverity').value,
    fatigue: parseInt(document.getElementById('fatigue').value, 10),
    soreThroat: document.getElementById('soreThroat').value,
    shortnessBreath: document.getElementById('shortnessBreath').value,
    other: document.getElementById('other').value.trim() || 'None',
    notes: document.getElementById('notes').value.trim() || 'None'
  };

  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem('symptom_' + today, JSON.stringify(entry));

  displaySummary(entry);
  displayHealthTips(entry);
  
  this.reset();
});

function displaySummary(entry) {
  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML = `
    <p><strong>Fever:</strong> ${entry.fever} (Severity: ${entry.feverSeverity})</p>
    <p><strong>Temperature:</strong> ${entry.temperature} °C</p>
    <p><strong>Cough:</strong> ${entry.cough} (Severity: ${entry.coughSeverity})</p>
    <p><strong>Headache:</strong> ${entry.headache} (Severity: ${entry.headacheSeverity})</p>
    <p><strong>Fatigue Level:</strong> ${entry.fatigue}</p>
    <p><strong>Sore Throat:</strong> ${entry.soreThroat}</p>
    <p><strong>Shortness of Breath:</strong> ${entry.shortnessBreath}</p>
    <p><strong>Other Symptoms:</strong> ${entry.other}</p>
    <p><strong>Notes/Medication:</strong> ${entry.notes}</p>
  `;
}

function displayHealthTips(entry) {
  const tipsDiv = document.getElementById('healthTips');
  let tips = [];

  if (entry.fever === "Yes" && entry.temperature !== "Not recorded" && parseFloat(entry.temperature) > 38) {
    tips.push("High temperature detected. Stay hydrated and rest.");
  }
  if (entry.fatigue >= 7) {
    tips.push("High fatigue level. Make sure to rest and avoid strenuous activity.");
  }
  if (entry.shortnessBreath === "Yes") {
    tips.push("Shortness of breath reported. If severe, consult a doctor immediately.");
  }
  if (entry.cough === "Yes" && entry.coughSeverity === "Severe") {
    tips.push("Severe cough detected. Consider medical consultation.");
  }
  if (tips.length === 0) {
    tips = ["Your symptoms seem mild today. Keep monitoring and stay safe!"];
  }

  tipsDiv.innerHTML = tips.map(t => `<p>• ${t}</p>`).join('');
}

window.onload = function() {
  const today = new Date().toISOString().slice(0, 10);
  const saved = localStorage.getItem('symptom_' + today);
  if (saved) {
    const entry = JSON.parse(saved);
    displaySummary(entry);
    displayHealthTips(entry);
  }
};
