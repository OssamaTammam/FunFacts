const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//Create facts using data
function createFacts(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
    <p>
      ${fact.text}
      <br />
      <a href="${fact.source}" target="_blank" class="source">(Source)</a>
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">${fact.category}</span>
    <div class="reaction-btns">
      <button>👍 <strong>${fact.voteslike}</strong></button>
      <button>👎 <strong>${fact.votesdislike}</strong></button>
      <button>🤪 <strong>${fact.votescrazy}</strong></button>
    </div>
    </li>`
  );
  const html = htmlArray.join("");
  factList.insertAdjacentHTML("afterbegin", html);
}

//Load data from server
async function loadFacts() {
  const res = await fetch(
    "https://snfygjrohlkwjzgkoefg.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnlnanJvaGxrd2p6Z2tvZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NDY4NzMsImV4cCI6MjAwMzEyMjg3M30.c_EfUpDD4Sjt5iHXTwfN2wafWNA8MOLvOhh2i280PRs",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnlnanJvaGxrd2p6Z2tvZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NDY4NzMsImV4cCI6MjAwMzEyMjg3M30.c_EfUpDD4Sjt5iHXTwfN2wafWNA8MOLvOhh2i280PRs",
      },
    }
  );
  const data = await res.json();
  const filteredData = data.filter((fact) => fact.category === "society");
  console.log(data);
  console.log(filteredData);
  createFacts(data);
}

loadFacts();

//DOM elements
const openBtn = document.querySelector(".btn-open");
const factForm = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");

//Toggle form
openBtn.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    openBtn.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    openBtn.textContent = "Share a fact!";
  }
});
