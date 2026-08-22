import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Img from '../components/Img';
import SocialLinks from '../components/SocialLinks';
import { site } from '../content/site';
import styles from './About.module.css';

/**
 * Kept deliberately short. The work pages carry the detail; this page only has
 * to answer "who is this and would I want to work with him".
 */
export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Joshua Kac — self-taught software engineer, founder of IronCoffee LLC. Builds apps end to end across backend, mobile, web and infrastructure."
        path="/about"
      />

      <div className="container">
        <header className={styles.header}>
          <Img
            name="profile"
            alt="Joshua Kac"
            className={styles.photo}
            aspectRatio="1 / 1"
            sizes="160px"
            priority
          />
          <div>
            <h1>About</h1>
            <p className={styles.role}>Software engineer · IronCoffee LLC</p>
          </div>
        </header>

        <div className={styles.prose}>
          <p className={styles.lede}>
            I&rsquo;m self-taught, I&rsquo;ve been writing code since I was a
            kid, and I build the whole thing &mdash; backend, mobile, web and
            the infrastructure underneath.
          </p>

          <p>
            That&rsquo;s not a boast about breadth, it&rsquo;s just how I work
            best. When one person holds the API contract, the mobile client and
            the deploy pipeline in their head at once, a lot of the usual
            friction stops existing. It also means I can take something from
            &ldquo;idea&rdquo; to &ldquo;in the App Store&rdquo; without needing
            a team around me first.
          </p>

          <h2>What I&rsquo;m doing now</h2>
          <p>
            Most of my time goes to <Link to="/work/beyond25">Beyond25</Link>, an
            AI music curator that&rsquo;s live on iOS, Android, Mac and the web.
            The interesting engineering there isn&rsquo;t the model &mdash;
            it&rsquo;s making sure every track it suggests actually exists and
            actually plays, which turns out to be most of the work.
          </p>
          <p>
            Alongside it, <Link to="/work/ourlee">Ourlee</Link> is in closed
            beta, and <Link to="/work/novaswift">NovaSwift</Link> is the thing I
            build when I want to stop thinking about product &mdash; a
            from-scratch Swift rebuild of a 2002 space sim, which mostly meant
            reverse-engineering file formats nobody has documented in twenty
            years.
          </p>

          <h2>The one that didn&rsquo;t work</h2>
          <p>
            Before those I spent a long stretch as co-founder and lead developer
            on <Link to="/work/project-yoked">Project Yoked</Link>, an
            all-in-one fitness platform. It was enormously ambitious &mdash;
            workout tracking, a video feed, a 1.7M-food nutrition database, a
            per-muscle recovery model, an Apple Watch app &mdash; and it&rsquo;s
            shut down now.
          </p>
          <p>
            I put it on this site on purpose. It was too much surface area for
            the team behind it, and that is a real lesson about scope that
            I&rsquo;d rather have learned on my own project than on someone
            else&rsquo;s. Two production libraries came out of it and outlived
            it: <Link to="/work/yokedcache">YokedCache</Link> and the{' '}
            <Link to="/work/expo-media-engine">Expo Media Engine</Link>, both
            still published.
          </p>

          <h2>How I like to work</h2>
          <ul className={styles.list}>
            <li>Ship something small and real before designing the big version.</li>
            <li>
              Own the boring parts &mdash; deploys, migrations, error tracking
              &mdash; because that&rsquo;s where products actually die.
            </li>
            <li>
              Write the honest version of the status. &ldquo;Kinda broken right
              now&rdquo; is more useful to everyone than a green checkmark.
            </li>
          </ul>

          <h2>Outside of that</h2>
          <p>
            Games are what got me into this in the first place &mdash; my first
            released project was a Game Dev Tycoon mod generator in 2016, and I
            still end up back there. There&rsquo;s a{' '}
            <Link to="/games">whole page of it</Link>.
          </p>
        </div>

        <section className={styles.contact}>
          <h2>Get in touch</h2>
          <p className={styles.contactIntro}>
            Open to contract work and engineering roles. The fastest way to
            reach me is email.
          </p>
          <SocialLinks variant="labelled" />
          <p className={styles.resume}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </section>
      </div>
    </>
  );
}
