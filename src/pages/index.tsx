import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import { BookText } from "lucide-react";
import styles from "./index.module.css";

import ResumePdfUrl from "@site/static/resume/phanuphat_srisukhawasu_resume.pdf";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="oadultradeepfield"
      description="I am an Astronomy Olympiad Medalist turned Computer Science major. Currently, I am focusing on two things I enjoy: building interactive tools that help others learn complex concepts quickly and applying technology to create positive impact in non-technical fields."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
