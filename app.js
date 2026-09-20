const herbs = [
  {
    name: "Ginger", scientific: "Zingiber officinale", icon: "🫚",
    summary: "A widely used culinary plant with a long history in traditional practices.",
    uses: ["Used traditionally in food and beverages.", "Commonly studied for nausea and digestive symptoms.", "Used in many traditional preparations."],
    safety: "Ginger can interact with some medicines and may not be appropriate for everyone. Ask a healthcare professional if you take regular medicines or have a health condition."
  },
  {
    name: "Moringa", scientific: "Moringa oleifera", icon: "🌿",
    summary: "A nutrient-containing plant whose leaves and other parts are used in food and traditional practices.",
    uses: ["Leaves are used as food in several cultures.", "Traditionally incorporated into soups, teas, and other preparations.", "Contains a range of nutrients and plant compounds."],
    safety: "Do not assume that traditional use means a product is safe or effective for treating disease. Discuss concentrated supplements with a healthcare professional."
  },
  {
    name: "Turmeric", scientific: "Curcuma longa", icon: "🟠",
    summary: "A spice commonly used in cooking and traditional herbal practices.",
    uses: ["Common culinary spice.", "Curcumin and turmeric preparations have been studied in health research.", "Used traditionally in a variety of preparations."],
    safety: "Concentrated turmeric/curcumin products can interact with medicines and may cause side effects. Food amounts are different from concentrated supplements."
  },
  {
    name: "Neem", scientific: "Azadirachta indica", icon: "🌱",
    summary: "A tree used in traditional practices in parts of Africa and Asia.",
    uses: ["Leaves and other parts have traditional uses.", "Often discussed in traditional skin and personal-care practices.", "Used in some traditional preparations."],
    safety: "Neem products are not interchangeable with food. Some preparations can be harmful, especially when swallowed. Seek professional advice before medicinal use."
  },
  {
    name: "Hibiscus", scientific: "Hibiscus sabdariffa", icon: "🌺",
    summary: "A flowering plant used in foods and beverages, including hibiscus drinks.",
    uses: ["Used to make teas and beverages.", "Contains naturally occurring plant compounds.", "Traditional preparations vary by culture."],
    safety: "Hibiscus may affect blood pressure or interact with medicines. If you use blood-pressure or other regular medicines, ask a healthcare professional."
  },
  {
    name: "Garlic", scientific: "Allium sativum", icon: "🧄",
    summary: "A common food plant with a long history of culinary and traditional use.",
    uses: ["Widely used as a food seasoning.", "Garlic preparations have been studied for cardiovascular and other health outcomes.", "Used traditionally in many cultures."],
    safety: "Large amounts or supplements can increase bleeding risk and may interact with medicines. Tell your clinician about supplements before surgery."
  }
];

const grid = document.getElementById("herbGrid");
const search = document.getElementById("searchInput");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

function render(items) {
  grid.innerHTML = items.map((h, i) => `
    <article class="herb-card" data-index="${herbs.indexOf(h)}">
      <div class="herb-icon">${h.icon}</div>
      <h3>${h.name}</h3>
      <div class="scientific">${h.scientific}</div>
      <p>${h.summary}</p>
      <div class="learn">View information →</div>
    </article>
  `).join("");
  count.textContent = `${items.length} herb${items.length === 1 ? "" : "s"}`;
  empty.hidden = items.length !== 0;
  document.querySelectorAll(".herb-card").forEach(card => {
    card.addEventListener("click", () => openHerb(Number(card.dataset.index)));
  });
}

function openHerb(index) {
  const h = herbs[index];
  modalContent.innerHTML = `
    <div class="herb-icon">${h.icon}</div>
    <h2>${h.name}</h2>
    <p class="scientific">${h.scientific}</p>
    <p>${h.summary}</p>
    <h3>Traditional / educational information</h3>
    <ul>${h.uses.map(x => `<li>${x}</li>`).join("")}</ul>
    <h3>Safety</h3>
    <p>${h.safety}</p>
    <p><strong>Reminder:</strong> This information is educational and is not a diagnosis or treatment recommendation.</p>
  `;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  render(herbs.filter(h =>
    `${h.name} ${h.scientific} ${h.summary} ${h.uses.join(" ")}`.toLowerCase().includes(q)
  ));
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal.click();
});

render(herbs);
