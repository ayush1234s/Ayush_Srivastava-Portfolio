import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import WindOverlay from '../components/WindOverlay';
import { useProjects } from '../hooks/useFirestore';

const FILTERS = ['All', 'IoT', 'React', 'Node.js', 'EdTech', 'Full Stack'];

const Projects = () => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All');

  const sorted = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.order || 0) - (b.order || 0);
  });

  const filtered = activeFilter === 'All'
    ? sorted
    : sorted.filter((p) =>
        p.tags?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-6xl mx-auto w-full relative">
      <WindOverlay />

      {/* Page Header */}
      <div className="mb-8 relative z-10">
        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>// Wall-Hanging Showcase</span>
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-mono">
          Hover cards to trigger gentle wind-sway motion • {filtered.length} projects displayed
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none relative z-10" role="group" aria-label="Project filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            id={`filter-${f.toLowerCase().replace(/\s/g, '-')}`}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              activeFilter === f
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filtered.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={project.featured}
            index={idx}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 font-mono text-sm text-slate-500 relative z-10">
          No projects found for filter "{activeFilter}".
        </div>
      )}
    </div>
  );
};

export default Projects;
