import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ResumePdfUrl from "@site/static/resume/phanuphat_srisukhawasu_resume.pdf";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { BookText } from "lucide-react";
import type { ReactNode } from "react";
import React from "react";
import styles from "./index.module.css";
import GradientBackground from "@site/static/img/gradient.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        paddingTop: "4rem",
        paddingBottom: "4rem",
        backgroundImage: `url(${GradientBackground})`,
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: "white" }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ color: "white" }}>
          {siteConfig.tagline}
        </p>
        <div
          className={styles.buttons}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <BookText size={18} />
            Read My Blog
          </Link>
          <Link
            className="button button--secondary button--lg"
            to={ResumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume <span style={{ marginLeft: 4 }}>&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  useDocusaurusContext();
  return (
    <Layout
      title="oadultradeepfield"
      description="I am an Astronomy Olympiad medalist turned Computer Science major at NUS. I began with an interest in developing AI models but later discovered a stronger passion for the theoretical side of AI and algorithms. Beyond academics, I enjoy creating simple yet powerful software that helps people learn more effectively, think more clearly, and make a positive impact across disciplines :)"
    >
      <HomepageHeader />
      <main
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      ></main>
    </Layout>
  );
}
