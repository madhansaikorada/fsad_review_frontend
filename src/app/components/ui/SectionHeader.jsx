/**
 * SectionHeader — standardized section title with optional subtitle and action
 */
export function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <div>
        <h2
          className="text-base font-semibold text-slate-100"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {title}
        </h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
