import {FeaturedSection} from './FeaturedSection';

export function NotFound({type = 'page'}) {
  const navigate = useNavigate()
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <main className="abt_sec">
      <div className="container">
        <div className="spacer">
          <div className="genric-error">
            <h2>{heading}</h2>
            <p>{description}</p>
            <button className="btn" onClick={() => navigate('/')}>
              Take me to the home page
            </button>
          </div>
          <FeaturedSection />
        </div>
      </div>
    </main>
  );
}
