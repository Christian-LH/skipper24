// ===========================================
// 1. SMOOTH SCROLL + POSITION-AUTO-FILL
// ===========================================

const roleMap = {
  "role-schiffsfuehrer": "Schiffsführer",
  "role-matrose": "Matrose",
  "role-kellner": "Kellner / Service",
  "role-dragqueen": "Dragqueen",
  "role-sonstiges": ""
};

const roleCards = document.querySelectorAll(".role-card");

roleCards.forEach((card) => {
  card.addEventListener("click", () => {
    const roleInput = document.getElementById("position");
    const roleName = roleMap[card.id];

    if (roleName !== undefined) {
      roleInput.value = roleName;
    }

    document
      .getElementById("form-section")
      .scrollIntoView({ behavior: "smooth" });
  });
});

// ===========================================
// 2. FORMULAR-HANDLING mit mailto:
// ===========================================

const form = document.getElementById("crew-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Kein echter Submit, wir bauen selber eine Mail

  // Daten aus dem Formular einsammeln
  const data = {
    position: document.getElementById("position").value,
    date: document.getElementById("date").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
    ship: document.getElementById("ship").value,
    pier: document.getElementById("pier").value,
    contactName: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    phone: document.getElementById("contact-phone").value,
    urgent: document.getElementById("urgent").checked,
    gdpr: document.getElementById("gdpr").checked
  };

  // Betreff der Mail
  const subject = `${data.urgent ? "⚠️ EILT! " : ""}Personalanfrage: ${data.position} am ${data.date}`;

  // Textkörper der Mail (Body)
  let body = "";
  body += `Gesuchte Position: ${data.position}\n`;
  body += `Datum: ${data.date}\n`;
  body += `Zeitraum: ${data.start} - ${data.end || "nicht angegeben"}\n\n`;
  body += `Schiff: ${data.ship}\n`;
  body += `Liegeplatz / Abfahrtsort: ${data.pier}\n\n`;
  body += `Kontaktname: ${data.contactName}\n`;
  body += `E-Mail: ${data.email}\n`;
  body += `Telefon: ${data.phone}\n\n`;
  body += `Dringend: ${data.urgent ? "JA (innerhalb der nächsten 5 Stunden)" : "nein"}\n`;
  body += `Kontakt-Zustimmung: Erteilt. Ich stimme zu, dass meine Anfrage von skipper24 per E-Mail und telefonisch beantwortet werden kann.;


  // HIER deine Ziel-E-Mail-Adresse eintragen:
  const targetEmail = "lehnert@gleiswildnis.de, langehausstein@gmail.com";

  // mailto-Link bauen (mit Encodierung)
  const mailtoLink =
    `mailto:${encodeURIComponent(targetEmail)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // Mailprogramm des Users öffnen
  window.location.href = mailtoLink;

  // Optional: Formular zurücksetzen
  // form.reset();
});
