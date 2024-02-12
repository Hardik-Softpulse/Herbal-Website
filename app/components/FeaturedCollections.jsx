import { Link } from '@remix-run/react';
import {Image} from '@shopify/hydrogen';


export function FeaturedCollections({
  collections,
  title = 'Collections',
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (

      <div items={collectionsWithImage.length}>
        {collectionsWithImage.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[3/2]">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                <h3 size="copy">{collection.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
   
  );
}
