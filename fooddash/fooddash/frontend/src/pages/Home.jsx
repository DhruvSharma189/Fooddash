import { Link } from 'react-router-dom';
import { photo } from '../images';
import { Scene } from '../components/Img';

const DOORS = [
  ['/explore', 'Explore the dishes', 'Biryani, pizza, burgers and sweets, by the craving.', photo.cafeTalk],
  ['/menu', 'See the full menu', 'Search, filter, and fill your cart.', photo.coffee],
  ['/story', 'Read our story', 'How a café on a mountain learned to cook.', photo.valley],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Scene src={photo.heroMountain} alt="Snow-capped mountain peak at first light" className="hero-bg" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <h1>Good food.<br /><i>Higher spirits.</i></h1>
          <p>A mountain-inspired menu for slow mornings, long conversations and cravings worth following.</p>
          <div className="row gap">
            <Link className="btn lg" to="/menu">Order now</Link>
            <Link className="btn lg glass" to="/story">Our story</Link>
          </div>
        </div>
      </section>

      <section className="container doors" aria-label="Where to next">
        {DOORS.map(([to, title, text, img]) => (
          <Link className="door" to={to} key={to}>
            <Scene src={img} alt="" />
            <div><h2>{title}</h2><p>{text}</p></div>
          </Link>
        ))}
      </section>

      <section className="quote-band">
        <div className="container"><blockquote>“Come for the food. Stay for the quiet.”</blockquote></div>
      </section>
    </>
  );
}
