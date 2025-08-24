
  const medForm = document.getElementById("medForm");
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");
  const beep = document.getElementById("beep");

  let meds = JSON.parse(localStorage.getItem("meds")) || [];

  function saveMeds() {
    localStorage.setItem("meds", JSON.stringify(meds));
  }

  function renderList() {
    list.innerHTML = "";
    if (meds.length === 0) {
      empty.style.display = "block";
      return;
    }
    empty.style.display = "none";

    meds.forEach((m, i) => {
      const div = document.createElement("div");
      div.className = "reminder";
      div.innerHTML = `
        <div class="info">
          <h3>${m.name} (${m.dosage || "no dosage"})</h3>
          <p>${m.times.join(", ")} on ${m.days.length ? m.days.join(", ") : "everyday"}</p>
        </div>
        <button class="btn danger" onclick="deleteMed(${i})">Delete</button>
      `;
      list.appendChild(div);
    });
  }

  function deleteMed(index) {
    meds.splice(index, 1);
    saveMeds();
    renderList();
  }

  // Handle form submit
  medForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const dosage = document.getElementById("dosage").value.trim();
    const lead = parseInt(document.getElementById("lead").value) || 0;

    // Collect times
    const timeChips = [...document.querySelectorAll("#timeChips span")].map(s => s.innerText);

    if (!name || timeChips.length === 0) {
      alert("Please enter a name and at least one time.");
      return;
    }

    const med = {
      name, dosage, lead,
      days: [], // (can expand to use checkboxes for weekdays)
      times: timeChips
    };

    meds.push(med);
    saveMeds();
    renderList();
    medForm.reset();
    document.getElementById("timeChips").innerHTML = "";
    scheduleMeds(med);
  });

  // Add time chip
  document.getElementById("addTime").addEventListener("click", () => {
    const t = document.getElementById("timeInput").value;
    if (!t) return;
    const span = document.createElement("span");
    span.style.marginRight = "6px";
    span.textContent = t;
    document.getElementById("timeChips").appendChild(span);
  });

  // Schedule notifications
  function scheduleMeds(med) {
    med.times.forEach(t => {
      const now = new Date();
      const [h, m] = t.split(":").map(Number);
      let alarm = new Date();
      alarm.setHours(h);
      alarm.setMinutes(m - med.lead);
      alarm.setSeconds(0);

      if (alarm < now) {
        alarm.setDate(alarm.getDate() + 1); // tomorrow
      }

      const delay = alarm.getTime() - now.getTime();
      setTimeout(() => {
        notify(med);
        scheduleMeds(med); // reschedule for next day
      }, delay);
    });
  }

  function notify(med) {
    beep.play();
    if (Notification.permission === "granted") {
      new Notification("Medication Reminder", {
        body: ${med.name} - ${med.dosage || ""}
      });
    } else {
      alert(Time for ${med.name} ${med.dosage || ""});
    }
  }

  // Re-schedule saved meds on load
  meds.forEach(med => scheduleMeds(med));
  renderList();
