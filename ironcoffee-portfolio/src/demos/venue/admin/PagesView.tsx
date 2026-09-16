/**
 * The content editor, with the page next to it.
 *
 * Owners do not think in fields, they think in "the big line at the top". So
 * every field is shown against the thing it changes, redrawn as you type, and
 * the search listing is in there too because the description nobody can see on
 * their own site is the one that decides whether anybody arrives at it.
 *
 * Editing writes to drafts. Nothing reaches the public copy until Save, which
 * is what makes Discard mean something.
 */
import { AlertTriangle, RotateCcw, Save } from 'lucide-react';
import type { DemoConfig } from '../../types';
import type { ContentBlock } from '../data';
import s from '../Admin.module.css';
import { draftFor, isDirty, type ViewProps } from './state';

const HINTS: Record<ContentBlock['field'], string> = {
  headline: 'The first line anyone reads on the home page.',
  sub: 'The paragraph under the headline.',
  tagline: 'What a search engine prints under the link.',
  about: 'The Our story paragraph, halfway down the page.',
};

/** Long copy gets a textarea. A one-line headline in a textarea invites an essay. */
const ROWS: Record<ContentBlock['field'], number> = { headline: 0, tagline: 0, sub: 3, about: 5 };

export default function PagesView({
  state,
  dispatch,
  config,
}: ViewProps & { config: DemoConfig }) {
  const dirty = isDirty(state);
  const domain = `${config.slug.replace(/-/g, '')}.example`;
  const headline = draftFor(state, 'headline');

  return (
    <div className={s.view}>
      <div className={s.cms}>
        <section className={s.card} aria-labelledby="cms-title">
          <header className={s.cardHead}>
            <div>
              <h3 className={s.cardTitle} id="cms-title">
                Home page text
              </h3>
              <p className={s.cardSub}>
                {dirty ? 'Unsaved changes.' : `Last saved ${state.savedLabel}.`}
              </p>
            </div>
            <div className={s.btnRow}>
              <button
                type="button"
                className={s.btnPrimary}
                disabled={!dirty}
                onClick={() => dispatch({ type: 'save' })}
              >
                <Save size={16} aria-hidden="true" />
                Save
              </button>
              <button
                type="button"
                className={s.btnQuiet}
                disabled={!dirty}
                onClick={() => dispatch({ type: 'discard' })}
              >
                <RotateCcw size={16} aria-hidden="true" />
                Discard
              </button>
            </div>
          </header>

          {state.content.map((block) => {
            const value = state.drafts[block.id];
            const over = value.length - block.limit;
            const rows = ROWS[block.field];
            return (
              <div className={s.field} key={block.id}>
                <label className={s.fieldLabel} htmlFor={`cms-${block.id}`}>
                  {block.label}
                </label>
                {rows === 0 ? (
                  <input
                    id={`cms-${block.id}`}
                    className={s.input}
                    value={value}
                    aria-describedby={`${block.id}-hint ${block.id}-count`}
                    onChange={(event) =>
                      dispatch({ type: 'edit', id: block.id, value: event.target.value })
                    }
                  />
                ) : (
                  <textarea
                    id={`cms-${block.id}`}
                    className={s.textarea}
                    rows={rows}
                    value={value}
                    aria-describedby={`${block.id}-hint ${block.id}-count`}
                    onChange={(event) =>
                      dispatch({ type: 'edit', id: block.id, value: event.target.value })
                    }
                  />
                )}
                <p className={s.fieldFoot}>
                  <span id={`${block.id}-hint`}>{HINTS[block.field]}</span>
                  <span
                    id={`${block.id}-count`}
                    className={`${s.counter} ${over > 0 ? s.counterOver : ''}`}
                  >
                    {over > 0 ? (
                      <>
                        <AlertTriangle size={13} aria-hidden="true" />
                        {over} over the {block.limit} character guide
                      </>
                    ) : (
                      `${value.length} of ${block.limit} characters`
                    )}
                  </span>
                </p>
              </div>
            );
          })}
        </section>

        <section className={s.card} aria-labelledby="cms-preview">
          <header className={s.cardHead}>
            <div>
              <h3 className={s.cardTitle} id="cms-preview">
                Preview
              </h3>
              <p className={s.cardSub}>
                {dirty ? 'Your edits, not what visitors see yet.' : 'What visitors see now.'}
              </p>
            </div>
          </header>

          <div className={s.previewFrame}>
            <div className={s.previewHero}>
              <p className={s.previewBrand}>{config.business.name}</p>
              <p className={s.previewHeadline}>
                {/* The public hero breaks the headline on a slash, so the
                    preview has to break it the same way or it is lying. */}
                {headline.split('/').map((line, i) => (
                  <span className={s.previewLine} key={i}>
                    {line.trim()}
                  </span>
                ))}
              </p>
              <p className={s.previewSub}>{draftFor(state, 'sub')}</p>
              <span className={s.previewCta}>{config.hero.ctaLabel}</span>
            </div>

            <div className={s.previewAbout}>
              <p className={s.previewKicker}>Our story</p>
              <p>{draftFor(state, 'about')}</p>
            </div>
          </div>

          <div className={s.serp}>
            <p className={s.serpUrl}>{domain}</p>
            <p className={s.serpTitle}>
              {config.business.name}, {config.business.city} {config.business.state}
            </p>
            <p className={s.serpDesc}>{draftFor(state, 'tagline')}</p>
          </div>
          <p className={s.fieldFoot}>
            <span>Roughly how the listing reads in search results.</span>
          </p>
        </section>
      </div>
    </div>
  );
}
