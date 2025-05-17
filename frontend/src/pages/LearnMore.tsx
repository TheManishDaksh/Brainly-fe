import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  //@ts-ignore
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.9 },
  }),
};


type SectionProps = {
  title: string;
  children: React.ReactNode;
  index: number;
};

const Section: React.FC<SectionProps> = ({ title, children, index }) => (
  <motion.div
    className="mb-10"
    custom={index}
    initial="hidden"
    animate="visible"
    variants={fadeIn}
  >
    <h2 className="text-2xl font-semibold text-blue-800 mb-3">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
  </motion.div>
);

const LearnMore: React.FC = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-start">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
          >
            The Second Brain: A New Era of Personal Knowledge Management
          </motion.h1>

          <Section title="Introduction" index={1}>
            <p>
              In an age of information overload, the concept of a Second Brain has emerged as a revolutionary approach
              to personal productivity, learning, and knowledge management. Coined and popularized by Tiago Forte, the
              Second Brain is a system that helps individuals offload, organize, and retrieve information using digital
              tools—essentially extending the power of the human brain through technology.
            </p>
          </Section>

          <Section title="What Is a Second Brain?" index={2}>
            <p>
              The Second Brain is a digital extension of your mind. It is a curated system for capturing ideas,
              thoughts, lessons, inspirations, projects, and useful information so that you don't have to rely on memory
              alone.
            </p>
            <p>
              It is not just a note-taking system but a dynamic network of knowledge that reflects your thinking,
              creativity, and problem-solving ability.
            </p>
          </Section>

          <Section title="Why Is the Second Brain Important?" index={3}>
            <ul className="list-disc list-inside">
              <li><strong>Cognitive Offloading:</strong> Free your brain to process, not store.</li>
              <li><strong>Information Organization:</strong> Turn passive consumption into active knowledge.</li>
              <li><strong>Creativity and Innovation:</strong> Connect ideas and spark insights.</li>
              <li><strong>Continuity and Legacy:</strong> Maintain context and preserve growth over time.</li>
            </ul>
          </Section>

          <Section title="The Core Principles" index={4}>
            <ol className="list-decimal list-inside">
              <li><strong>Capture:</strong> Store ideas and insights as they come.</li>
              <li><strong>Organize:</strong> Use the PARA system: Projects, Areas, Resources, Archives.</li>
              <li><strong>Distill:</strong> Highlight the essence using progressive summarization.</li>
              <li><strong>Express:</strong> Turn your notes into outputs—blogs, talks, decisions, solutions.</li>
            </ol>
          </Section>

          <Section title="Tools to Build a Second Brain" index={5}>
            <ul className="list-disc list-inside">
              <li><strong>Notion:</strong> Customizable databases and workspace.</li>
              <li><strong>Obsidian:</strong> Markdown notes with knowledge graph view.</li>
              <li><strong>Evernote:</strong> Classic, searchable note storage.</li>
              <li><strong>Roam Research:</strong> Daily notes and bidirectional linking.</li>
              <li><strong>Others:</strong> Apple Notes, OneNote, Google Keep.</li>
            </ul>
          </Section>

          <Section title="How to Build One" index={6}>
            <ol className="list-decimal list-inside">
              <li>Choose your tool and use it daily.</li>
              <li>Set up your PARA structure.</li>
              <li>Capture notes, links, and ideas consistently.</li>
              <li>Do weekly reviews to stay current.</li>
              <li>Revisit and reuse to make it meaningful.</li>
            </ol>
          </Section>

          <Section title="Applications" index={7}>
            <ul className="list-disc list-inside">
              <li>Students: Research, summaries, and study plans.</li>
              <li>Writers: Drafting, outlines, and content creation.</li>
              <li>Developers: Code snippets, bugs, documentation.</li>
              <li>Entrepreneurs: Business ideas, meetings, goals.</li>
              <li>Professionals: Client info, tasks, systems.</li>
            </ul>
          </Section>

          <Section title="Benefits and Challenges" index={8}>
            <p><strong>Benefits:</strong></p>
            <ul className="list-disc list-inside">
              <li>More clarity, creativity, and productivity.</li>
              <li>Better memory and faster output.</li>
              <li>Reduced stress and improved learning.</li>
            </ul>
            <p><strong>Challenges:</strong></p>
            <ul className="list-disc list-inside">
              <li>Requires setup and habit-building.</li>
              <li>Can become cluttered without maintenance.</li>
            </ul>
          </Section>

          <Section title="Conclusion" index={9}>
            <p>
              The Second Brain is a mindset shift. It helps people think deeper, create more, and manage digital
              knowledge. As Tiago Forte says, “Your mind is for having ideas, not holding them.”
            </p>
          </Section>
        </div>

        {/* Right Side - Images */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-1 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img
            src="digital-brain.jpg"
            alt="Digital Brain"
            className="rounded-xl shadow-md"
          />
          <img
            src="creative-workspace.jpg"
            alt="Creative Workspace"
            className="rounded-xl shadow-md sm:col-span-2"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LearnMore;