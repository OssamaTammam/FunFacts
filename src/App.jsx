import "./style.css";

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

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    voteslikes: 24,
    votesdislike: 9,
    votescrazy: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    voteslikes: 11,
    votesdislike: 2,
    votescrazy: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    voteslikes: 8,
    votesdislike: 3,
    votescrazy: 1,
    createdIn: 2015,
  },
];
function App() {
  const appTitle = "Fun Facts";
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Fun Facts Logo" />
          <h1>{appTitle}</h1>
        </div>
        <button className="btn btn-large btn-open">Share a fact!</button>
      </header>

      {/* Fact Form */}
      <NewFactForm />

      <main className="main">
        {/* Side Bar */}
        <CategoryFilter />

        {/* Facts */}
        <FactsList />
      </main>
    </>
  );
}
function NewFactForm() {
  return <form className="fact-form">Facts Form</form>;
}

function CategoryFilter() {
  return (
    <aside className="sidebar">
      <ul className="categories">
        <li>
          <button className="btn btn-category btn-category-all">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList() {
  //temp
  const facts = initialFacts;
  return (
    <section className="facts">
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts!</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <br />
        <a href="{fact.source}" target="_blank" className="source">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="reaction-btns">
        <button>
          👍 <strong>{fact.voteslike}</strong>
        </button>
        <button>
          👎 <strong>{fact.votesdislike}</strong>
        </button>
        <button>
          🤪 <strong>{fact.votescrazy}</strong>
        </button>
      </div>
    </li>
  );
}
export default App;