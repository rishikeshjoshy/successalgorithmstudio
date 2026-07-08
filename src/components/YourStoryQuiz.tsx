"use client";

import { useState } from "react";
import Link from "next/link";
import { QUESTIONS, RESULTS } from "@/lib/your-story";

type Step = "intro" | number | "result";
// number = zero-indexed question (Q1..Q6 in doc copy = index 0..5)

/**
 * Client-only multi-step quiz, no backend/persistence. Result is picked by
 * Q4 ("bottleneck") alone — see src/lib/your-story.ts for why.
 */
export default function YourStoryQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const selectOption = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
    if (questionIndex < QUESTIONS.length - 1) {
      setStep(questionIndex + 1);
    } else {
      setStep("result");
    }
  };

  const goBack = () => {
    if (typeof step === "number" && step > 0) setStep(step - 1);
    else if (typeof step === "number") setStep("intro");
    else if (step === "result") setStep(QUESTIONS.length - 1);
  };

  return (
    <main className="pillar-page quiz-page">
      {step === "intro" && (
        <section className="pillar-hero">
          <p className="pillar-hero__eyebrow">Your Story</p>
          <h1 className="pillar-hero__title">Every algorithm starts with inputs.</h1>
          <p className="pillar-hero__subhead">
            Give us yours — 90 seconds, six questions — and we&rsquo;ll show you exactly
            where SAS fits into what you&rsquo;re building.
          </p>
          <button type="button" onClick={() => setStep(0)} className="pillar-cta quiz-intro-cta">
            Begin →
          </button>
        </section>
      )}

      {typeof step === "number" && (
        <section className="pillar-section quiz-question">
          <p className="quiz-question__progress">
            Question {step + 1} of {QUESTIONS.length}
          </p>
          <h2 className="pillar-hero__title quiz-question__prompt">
            {QUESTIONS[step].prompt}
          </h2>
          <div className="quiz-options">
            {QUESTIONS[step].options.map((option, i) => (
              <button
                key={option}
                type="button"
                onClick={() => selectOption(step, i)}
                className={
                  "quiz-option" + (answers[step] === i ? " quiz-option--selected" : "")
                }
              >
                {option}
              </button>
            ))}
          </div>
          <button type="button" onClick={goBack} className="quiz-back">
            ← Back
          </button>
        </section>
      )}

      {step === "result" &&
        (() => {
          const bottleneckIndex = answers[3] ?? 0;
          const result = RESULTS[bottleneckIndex];
          return (
            <section className="pillar-section">
              <h1 className="pillar-hero__title">{result.heading}</h1>
              <p className="pillar-section__body">{result.body}</p>
              <div className="quiz-result-ctas">
                <Link href={result.ctaHref} className="pillar-cta">
                  {result.ctaLabel}
                </Link>
                {result.secondaryHref && (
                  <Link href={result.secondaryHref} className="nav__link quiz-result-secondary">
                    {result.secondaryLabel}
                  </Link>
                )}
              </div>
              <button type="button" onClick={goBack} className="quiz-back">
                ← Back
              </button>
            </section>
          );
        })()}
    </main>
  );
}
