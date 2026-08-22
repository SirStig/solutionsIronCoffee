import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '../content/site';
import styles from './SocialLinks.module.css';

const icons = { github: Github, linkedin: Linkedin, mail: Mail } as const;

interface Props {
  /** `icons` is a compact row; `labelled` shows the handle beside each icon. */
  variant?: 'icons' | 'labelled';
  className?: string;
}

export default function SocialLinks({ variant = 'icons', className }: Props) {
  return (
    <ul
      className={[styles.list, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {socials.map((social) => {
        const Icon = icons[social.icon];
        const external = social.href.startsWith('http');

        return (
          <li key={social.label}>
            <a
              href={social.href}
              className={styles.link}
              aria-label={social.label}
              {...(external
                ? { target: '_blank', rel: 'me noopener noreferrer' }
                : {})}
            >
              <Icon size={variant === 'labelled' ? 18 : 20} aria-hidden />
              {variant === 'labelled' && (
                <span className={styles.text}>
                  <span className={styles.label}>{social.label}</span>
                  <span className={styles.handle}>{social.handle}</span>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
