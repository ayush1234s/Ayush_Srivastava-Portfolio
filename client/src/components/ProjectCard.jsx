import { FiGithub, FiExternalLink, FiWind } from 'react-icons/fi';

const ProjectCard = ({ project, featured = false, index = 0 }) => {
  const {
    title,
    shortDesc,
    tags = [],
    githubUrl,
    liveUrl,
    thumbnailUrl,
    emoji = '🚀',
  } = project;

  // Stagger the pendulum wind swing for each card
  const swingDelay = `${(index % 4) * 0.9}s`;

  return (
    <div className="relative pt-8 pb-3 px-1 group">
      {/* Wall Mounting Pins & Dual Hanging Strings */}
      <div className="absolute top-0 left-1/4 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="hanging-pin" />
        <div className="hanging-cable shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
      </div>

      <div className="absolute top-0 right-1/4 transform translate-x-1/2 z-30 pointer-events-none">
        <div className="hanging-pin" />
        <div className="hanging-cable shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
      </div>

      {/* Hanging Wall Card with Continuous Pendulum Wind Swing */}
      <article
        className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col relative animate-wall-swing origin-top transition-transform duration-300"
        style={{ animationDelay: swingDelay }}
      >
        {/* Wind Breeze Light Trail Passing Across Card */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full animate-breeze-pass pointer-events-none z-20"
          style={{ animationDelay: `${(index % 3) * 1.5}s` }}
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3 z-30 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-white/20">
            ⭐ Featured
          </div>
        )}

        {/* Thumbnail or Emoji Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900/80 flex items-center justify-center border-b border-white/5">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_70%)]" />
              <span className="text-5xl transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 relative z-10 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                {emoji}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-slate-900/40 relative z-10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                {title}
              </h3>
              <FiWind className="text-purple-400/40 group-hover:text-pink-400 text-xs shrink-0 animate-pulse" />
            </div>

            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
              {shortDesc}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2.5 pt-3 border-t border-white/5 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-purple-500/40 transition-all duration-200"
                id={`btn-code-${title.replace(/\s/g, '-').toLowerCase()}`}
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-200"
                id={`btn-live-${title.replace(/\s/g, '-').toLowerCase()}`}
              >
                <FiExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
