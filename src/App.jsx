import { useEffect, useState } from "react";
import "./style.css";
import isUrl from "is-url";
import supabase from "./supabase";

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

function App() {
  const [showForm, setForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);

      async function getFacts() {
        const { data: facts, error } = await query
          .order("voteslike", { ascending: false })
          .limit(1000);
        if (!error) setFacts(facts);
        else alert("ERROR");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      {/* Header */}
      <Header showForm={showForm} setForm={setForm} />
      {/* Fact Form */}
      {showForm ? (
        <NewFactForm facts={facts} setFacts={setFacts} setForm={setForm} />
      ) : null}

      <main className="main">
        {/* Side Bar */}
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {/* Facts */}
        {isLoading ? (
          <Loader />
        ) : (
          <FactsList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}
function Loader() {
  return <p className="loading-message">Loading...</p>;
}
function Header({ showForm, setForm }) {
  const appTitle = "Fun Facts";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Fun Facts Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setForm(!showForm)}
      >
        {showForm ? "Close" : "Share a fact!"}
      </button>
    </header>
  );
}
function NewFactForm({ facts, setFacts, setForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);
    if (text && text.length <= 200 && source && isUrl(source) && category) {
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      if (!error) setFacts(() => [newFact[0], ...facts]);
      else alert("ERROR");
      setForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose a category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside className="sidebar">
      <ul className="categories">
        <li>
          <button
            className="btn btn-category btn-category-all"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <button
              key={cat.name}
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList({ facts, setFacts }) {
  if (facts.length === 0) {
    return <p className="loading-message">No facts in current category</p>;
  }
  return (
    <section className="facts">
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      {/* <p>There are {facts.length} facts!</p> */}
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isWrong = fact.votesdislike > fact.voteslike;
  async function handleVote(columnName) {
    setIsUpdating(true);

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    else alert("ERROR");
    setIsUpdating(false);
  }

  return (
    <li className="fact">
      <p>
        {isWrong ? (
          <span className="wrong">
            [WRONG!]
            <br />
          </span>
        ) : null}
        {fact.text}
        <br />
        <a href={fact.source} target="_blank" className="source">
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
        <button onClick={() => handleVote("voteslike")} disabled={isUpdating}>
          👍 <strong>{fact.voteslike}</strong>
        </button>
        <button
          onClick={() => handleVote("votesdislike")}
          disabled={isUpdating}
        >
          👎 <strong>{fact.votesdislike}</strong>
        </button>
        <button onClick={() => handleVote("votescrazy")} disabled={isUpdating}>
          🤪 <strong>{fact.votescrazy}</strong>
        </button>
      </div>
    </li>
  );
}
export default App;
