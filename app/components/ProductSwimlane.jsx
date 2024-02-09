import {ProductCards} from '~/components';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}) {

  return (
    <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12">
      {products.nodes.map((product) => (
        <ProductCards
          product={product}
          key={product.id}
          className="snap-start w-80"
        />
      ))}
    </div>
  );
}
