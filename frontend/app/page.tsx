"use client";

import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [repository, setRepository] = useState<any>(null);

  async function analyzeRepository() {
    setError("");

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze repository.");
      }

      setRepository(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={darkMode ? "app dark" : "app light"}>

      {/* Navigation */}
      <header className="topbar">

        <div className="brand">
          <div className="logo-box">
            <img
              src="/reposherif-logo.png"
              alt="RepoSherif logo"
            />
          </div>

          <div>
            <h1>RepoSherif</h1>
            <span>AI Repository Analyzer</span>
          </div>
        </div>

        <nav className="navigation">
          <a className="active" href="#dashboard">
            Dashboard
          </a>

          <a href="#repository">
            Repository
          </a>

          <a href="#chat">
            AI Chat
          </a>

          <a href="#analysis">
            Code Analysis
          </a>

          <a href="#issues">
            Issues
          </a>

          <a href="#health">
            Health
          </a>

          <a href="#documentation">
            Documentation
          </a>
        </nav>

        <div className="nav-actions">

          <button
            className="theme-icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="profile">
            P
          </div>

        </div>

      </header>


      {/* Main */}
      <section
        id="dashboard"
        className="dashboard"
      >

        {/* Hero */}
        <section className="hero">

          <div className="hero-content">

            <span className="eyebrow">
              REPOSITORY INTELLIGENCE
            </span>

            <h2>
              Analyze your
              <br />
              <span>GitHub repository.</span>
            </h2>

            <p>
              Understand your codebase, discover problems,
              explore architecture, and get AI-powered
              developer insights.
            </p>

          </div>

        </section>


        {/* Analyzer */}
        <section
          id="repository"
          className="analyzer"
        >

          <label htmlFor="repo">
            GitHub Repository URL
          </label>

          <div className="input-row">

            <input
              id="repo"
              type="text"
              value={repoUrl}
              onChange={(e) =>
                setRepoUrl(e.target.value)
              }
              placeholder="https://github.com/username/repository"
            />

            <button 
             className="analyze-button"
             onClick={analyzeRepository}
             disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Repository"}
            </button>

          </div>

          <p className="helper-text">
            Enter a public GitHub repository to get started.
          </p>

       </section>

{error && (
  <div className="error-message">
    {error}
  </div>
)}

{repository && (
  <section className="repository-result">

    <div className="repository-header">

      <div>
        <span className="result-label">
          REPOSITORY ANALYZED
        </span>

        <h3>{repository.fullName}</h3>

        <p>
          {repository.description ||
            "No repository description available."}
        </p>
      </div>

      <a
        href={repository.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub →
      </a>

    </div>

    <div className="repository-stats">

      <div>
        <span>Language</span>
        <strong>
          {repository.language || "Not detected"}
        </strong>
      </div>

      <div>
        <span>Stars</span>
        <strong>
          ⭐ {repository.stars}
        </strong>
      </div>

      <div>
        <span>Forks</span>
        <strong>
          {repository.forks}
        </strong>
      </div>

      <div>
        <span>Open Issues</span>
        <strong>
          {repository.issues}
        </strong>
      </div>

    </div>

  </section>
)}

{/* Stats */}
<section className="stats-grid">

          <StatCard
            title="Repositories"
            value="0"
            text="Analyzed so far"
          />

          <StatCard
            title="Analyses"
            value="0"
            text="Completed"
          />

          <StatCard
            title="Issues Found"
            value="0"
            text="Across repositories"
          />

          <StatCard
            title="Health Score"
            value="--"
            text="Average score"
          />

        </section>


        {/* How it works */}
        <section className="how-section">

          <div className="section-title">

            <span>
              GET STARTED
            </span>

            <h3>
              How RepoSherif works
            </h3>

          </div>


          <div className="steps">

            <Step
              number="01"
              title="Enter repository"
              text="Paste the URL of a public GitHub repository."
            />

            <Step
              number="02"
              title="Analyze code"
              text="RepoSherif examines the repository structure and code."
            />

            <Step
              number="03"
              title="Understand your project"
              text="Get insights, explanations, issues and recommendations."
            />

          </div>

        </section>


        {/* Features */}
        <section className="features">

          <Feature
            title="AI Code Understanding"
            text="Ask questions about your repository and understand complicated code."
          />

          <Feature
            title="Code Analysis"
            text="Find code smells, potential issues and maintainability problems."
          />

          <Feature
            title="Repository Health"
            text="Measure documentation, testing, security and overall maintainability."
          />

        </section>

      </section>

    </main>
  );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="stat-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {text}
      </small>

    </div>
  );
}


/* =========================
   STEP
========================= */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="step">

      <div className="step-number">
        {number}
      </div>

      <div>

        <h4>
          {title}
        </h4>

        <p>
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================
   FEATURE
========================= */

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="feature-card">

      <div className="feature-mark">
        →
      </div>

      <h4>
        {title}
      </h4>

      <p>
        {text}
      </p>

    </div>
  );
}