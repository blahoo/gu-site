import { Router, Route } from "./components/Router";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./components/AboutPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { ThoughtsPage } from "./components/ThoughtsPage";
import { ExperiencePage } from "./components/ExperiencePage";
import { MarkdownJournal } from "./components/MarkdownJournal";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-['Inter:Regular',_sans-serif]">
        <Navigation />

        <AnimatePresence mode="wait">
          <motion.div
            key="main-content"
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Route path="/about">
              <AboutPage />
            </Route>

            <Route path="/projects">
              <ProjectsPage />
            </Route>

            <Route path="/thoughts">
              <ThoughtsPage />
            </Route>

            <Route path="/experience">
              <ExperiencePage />
            </Route>

            {/* Individual project pages */}
            <Route path="/project/warrig-x1">
              <MarkdownJournal
                slug="warrig-x1"
                category="project"
              />
            </Route>

            <Route path="/project/apoc">
              <MarkdownJournal slug="apoc" category="project" />
            </Route>

            <Route path="/project/drone-project">
              <MarkdownJournal
                slug="drone-project"
                category="project"
              />
            </Route>

            <Route path="/project/security-system">
              <MarkdownJournal
                slug="security-system"
                category="project"
              />
            </Route>

            {/* Individual thought pages */}
            <Route path="/thought/toronto-problems">
              <MarkdownJournal
                slug="toronto-problems"
                category="thought"
              />
            </Route>

            <Route path="/thought/robotics-funny">
              <MarkdownJournal
                slug="robotics-funny"
                category="thought"
              />
            </Route>

            <Route path="/thought/poker-lessons">
              <MarkdownJournal
                slug="poker-lessons"
                category="thought"
              />
            </Route>

            <Route path="/thought/dropout-dreams">
              <MarkdownJournal
                slug="dropout-dreams"
                category="thought"
              />
            </Route>
          </motion.div>
        </AnimatePresence>
      </div>
    </Router>
  );
}