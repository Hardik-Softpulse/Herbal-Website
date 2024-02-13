import {FeaturedSection} from './FeaturedSection';

export function GenericError({error}) {
  const heading = `Something’s wrong here.`;
  let description = `We found an error while loading this page.`;

  if (error) {
    description += `\n${error.message}`;
    console.error(error);
  }

  return (
    <main className="abt_sec">
      <div className="container">
        <div className="spacer">
          <div className="genric-error">
            <h2>{heading}</h2>

            <p>{description}</p>
            {error?.stack && (
              <pre
                style={{
                  padding: '2rem',
                  background: 'hsla(10, 50%, 50%, 0.1)',
                  color: 'red',
                  overflow: 'auto',
                  maxWidth: '100%',
                }}
                dangerouslySetInnerHTML={{
                  __html: addLinksToStackTrace(error.stack),
                }}
              />
            )}
            <button className="btn" to={'/'}>
              Take me to the home page
            </button>
          </div>
          <FeaturedSection />
        </div>
      </div>
    </main>
  );
}

function addLinksToStackTrace(stackTrace) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}
