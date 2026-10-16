type IconProps = { className?: string };

const paths: Record<string, React.ReactNode> = {
  camera: <><path d="M14.5 5 13 3H7L5.5 5H3v11h16V5h-4.5Z"/><circle cx="11" cy="10.5" r="3"/></>,
  sun: <><circle cx="11" cy="11" r="3.5"/><path d="M11 1v2M11 19v2M1 11h2M19 11h2M4 4l1.4 1.4M16.6 16.6 18 18M18 4l-1.4 1.4M5.4 16.6 4 18"/></>,
  spark: <><path d="m11 2 1.5 5.5L18 9l-5.5 1.5L11 16l-1.5-5.5L4 9l5.5-1.5L11 2Z"/><path d="m18 14 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14Z"/></>,
  bell: <><path d="M5 16h12l-1.5-2V9a4.5 4.5 0 0 0-9 0v5L5 16Z"/><path d="M9 19h4"/></>,
  shield: <path d="M11 2 4 5v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V5l-7-3Z"/>,
  mount: <><path d="M4 19h14M11 19V9M7 9h8l-1-6H8L7 9Z"/><path d="M5 13h12"/></>,
  eye: <><path d="M1.5 11S5 4.5 11 4.5 20.5 11 20.5 11 17 17.5 11 17.5 1.5 11 1.5 11Z"/><circle cx="11" cy="11" r="3"/></>,
  grip: <><circle cx="6" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="6" cy="16" r="3"/><circle cx="16" cy="16" r="3"/></>,
  tray: <><path d="M3 12h16v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z"/><path d="M11 12v6M7 4v5M11 4v5M15 4v5"/></>,
  drop: <path d="M11 2.5S5 9.2 5 13.5a6 6 0 0 0 12 0C17 9.2 11 2.5 11 2.5Z"/>,
  arrow: <path d="m8 5 6 6-6 6"/>,
  check: <path d="m4 11 4 4 10-10"/>,
  close: <path d="m5 5 12 12M17 5 5 17"/>,
};

export function Icon({ name, className = "" }: IconProps & { name: string }) {
  return <svg className={className} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function LeafMark({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M33 7C19 7 9 13 8 27c8 3 22-1 25-20Z" fill="currentColor" />
      <path d="M7 33c4-10 10-15 20-20" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
