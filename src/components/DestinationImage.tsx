import { useId } from 'react';
import type { Destination } from '../types';

/** Muestra la fotografía si existe (photoUrl); si no, una ilustración SVG provisional. */
export function DestinationImage({ destination, className = '', variant = 0 }: { destination: Destination; className?: string; variant?: number }) {
  const gid = useId();
  if (destination.photoUrl) {
    return <img src={destination.photoUrl} alt={destination.imageAlt} className={`object-cover ${className}`} loading="lazy" />;
  }
  const [dark, mid, light] = destination.image.palette;
  const shift = variant * 40;
  const motif = destination.image.motif;
  return (
    <svg
      role="img"
      aria-label={destination.imageAlt}
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gid})`} />
      <circle cx={300 - shift} cy="60" r="26" fill="#fff" opacity="0.7" />
      <path d={`M-20 190 L${90 + shift} 80 L${170 + shift} 170 L${250 + shift / 2} 100 L430 200 L430 260 L-20 260Z`} fill={mid} />
      <path d={`M-20 220 L${60 + shift} 150 L${140} 215 L${230 - shift / 2} 140 L430 230 L430 260 L-20 260Z`} fill={dark} opacity="0.9" />
      {motif === 'forest' &&
        [40, 90, 150, 220, 290, 340].map((x) => (
          <path key={x} d={`M${x} 250 L${x + 14} 205 L${x + 28} 250Z`} fill={dark} />
        ))}
      {motif === 'town' &&
        [60, 130, 200, 270].map((x, i) => (
          <g key={x}>
            <rect x={x} y={222 - i * 3} width="44" height="30" fill={light} />
            <path d={`M${x - 4} ${222 - i * 3} L${x + 22} ${202 - i * 3} L${x + 48} ${222 - i * 3}Z`} fill="#a4553a" />
          </g>
        ))}
      {motif === 'city' && (
        <g>
          <rect x="170" y="130" width="40" height="120" fill={light} />
          <circle cx="190" cy="152" r="12" fill={dark} />
          <path d="M165 130 L190 100 L215 130Z" fill={dark} />
          <rect x="80" y="190" width="60" height="60" fill={light} opacity="0.9" />
          <rect x="250" y="180" width="70" height="70" fill={light} opacity="0.9" />
        </g>
      )}
      {motif === 'canyon' && (
        <g>
          <path d="M130 260 Q200 150 270 260Z" fill="#7fd3cb" opacity="0.9" />
          <ellipse cx="200" cy="245" rx="55" ry="10" fill="#c9f1ec" />
        </g>
      )}
      {motif === 'pyramid' && (
        <g>
          <path d="M110 250 L200 150 L290 250Z" fill={dark} />
          {[150, 190, 230].map((x) => (
            <rect key={x} x={x} y="210" width="14" height="40" fill={light} />
          ))}
        </g>
      )}
      {motif === 'prism' &&
        [130, 158, 186, 214, 242].map((x, i) => (
          <rect key={x} x={x} y={160 + (i % 2) * 14} width="24" height={100 - (i % 2) * 14} fill={dark} stroke={light} strokeWidth="1.5" />
        ))}
      {motif === 'valley' &&
        [70, 120, 280, 330].map((x) => (
          <path key={x} d={`M${x} 250 v-26 m-6 8 h12`} stroke={dark} strokeWidth="5" strokeLinecap="round" fill="none" />
        ))}
    </svg>
  );
}
