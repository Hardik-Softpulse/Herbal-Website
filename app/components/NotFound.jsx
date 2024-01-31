import {FeaturedSection} from './FeaturedSection';

export function NotFound({type = 'page'}) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <div heading={heading}>
        <h3 width="narrow" as="p">
          {description}
        </h3>
        <button width="auto" variant="secondary" to={'/'}>
          Take me to the home page
        </button>
      </div>
      <FeaturedSection />
    </>
  );
}
