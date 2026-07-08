"use client";

import { useState } from "react";
import {
  KNOWLEDGE_TABS,
  CASE_STUDY_PROFILES,
  BOOKS,
  CHANNELS,
  MANTRAS,
  UNIVERSITY,
  SPIRITUALITY,
  type KnowledgeTabId,
} from "@/lib/knowledge";

export default function KnowledgeRepository() {
  const [activeTab, setActiveTab] = useState<KnowledgeTabId>("case-studies");

  return (
    <main className="pillar-page knowledge-page">
      <section className="pillar-hero">
        <h1 className="pillar-hero__title">The Knowledge Repository</h1>
        <p className="pillar-hero__subhead">
          Everything SAS studies, references, and builds from — organized so you can study
          the system, not just the service.
        </p>
      </section>

      <div className="knowledge-tabs">
        {KNOWLEDGE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={"tray-card" + (activeTab === tab.id ? " tray-card--active" : "")}
          >
            <div className="tray-card__header">
              <span className="tray-card__num">{tab.num}</span>
              <span className="tray-card__title">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="knowledge-tab-panel">
        {activeTab === "case-studies" && (
          <div className="knowledge-panel-grid">
            {CASE_STUDY_PROFILES.map((p) => (
              <article key={p.name} className="profile-card">
                <h3 className="profile-card__name">{p.name}</h3>
                <p className="profile-card__principle">{p.principle}</p>
                <p className="profile-card__takeaway">{p.takeaway}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "books" && (
          <div className="knowledge-panel-grid">
            {BOOKS.map((b) => (
              <article key={b.title} className="profile-card">
                <h3 className="profile-card__name">{b.title}</h3>
                <p className="profile-card__principle">{b.author}</p>
                <p className="profile-card__takeaway">{b.description}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "channels" && (
          <div className="knowledge-panel-grid">
            {CHANNELS.map((c) => (
              <article key={c.name} className="profile-card">
                <h3 className="profile-card__name">{c.name}</h3>
                <p className="profile-card__principle">{c.platform}</p>
                <p className="profile-card__takeaway">{c.reason}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "mantras" && (
          <ol className="mantra-list">
            {MANTRAS.map((mantra, i) => (
              <li key={mantra}>
                <span className="mantra-list__num">{String(i + 1).padStart(2, "0")}</span>
                {mantra}
              </li>
            ))}
          </ol>
        )}

        {activeTab === "university" && (
          <div className="university-block">
            <p className="pillar-section__body">{UNIVERSITY.whatItIs}</p>
            <h2 className="pillar-section__heading">Planned Tracks</h2>
            <div className="pillar-formats">
              {UNIVERSITY.tracks.map((t) => (
                <div key={t.name} className="pillar-formats__item">
                  <p className="pillar-formats__label">{t.name}</p>
                  <p className="pillar-formats__body">{t.description}</p>
                </div>
              ))}
            </div>
            <p className="pillar-section__body">
              <strong className="university-block__label">Delivery model:</strong>{" "}
              {UNIVERSITY.deliveryModel}
            </p>
            <p className="pillar-section__body">
              <strong className="university-block__label">Status:</strong> {UNIVERSITY.status}
            </p>
            <a href={UNIVERSITY.waitlistHref} className="pillar-cta">
              Join Waitlist →
            </a>
          </div>
        )}

        {activeTab === "spirituality" && (
          <div className="knowledge-panel-grid">
            {SPIRITUALITY.map((r) => (
              <article key={r.heading} className="profile-card">
                <h3 className="profile-card__name">{r.heading}</h3>
                <p className="profile-card__takeaway">{r.body}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
