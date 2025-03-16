type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export const ExternalLink = ({ href, className, children }: Props) => (
  <a href={href} target='_blank' rel='noopener noreferrer' className={className}>
    {children}
  </a>
);
