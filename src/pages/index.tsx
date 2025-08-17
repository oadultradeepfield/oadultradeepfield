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

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const generateStarProps = (index: number) => {
    const tailLength = (Math.random() * (7.5 - 5) + 5).toFixed(2); // 5em to 7.5em
    const topOffset = (Math.random() * 100).toFixed(2); // 0% to 100% within hero banner
    const fallDuration = (Math.random() * (12 - 6) + 6).toFixed(1); // 6s to 12s
    const fallDelay = (Math.random() * 10).toFixed(1); // 0s to 10s

    return {
      "--star-tail-length": `${tailLength}em`,
      "--top-offset": `${topOffset}%`,
      "--fall-duration": `${fallDuration}s`,
      "--fall-delay": `${fallDelay}s`,
    } as React.CSSProperties;
  };

  // Generate 20 stars (reduced from 50)
  const stars = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className={styles.star} style={generateStarProps(index)} />
  ));

  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Star Animation Background */}
      <div className={styles.stars}>{stars}</div>

      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
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
      description="I am an Astronomy Olympiad Medalist turned Computer Science major at NUS. While I first pursued AI, I later found myself drawn to areas like networking, compilers, and parallel computing. Beyond academics, I love building simple yet powerful software that makes a positive impact across disciplines :)"
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
