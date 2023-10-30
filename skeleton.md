```js
import { CardSizesBreakpoints } from '@app/components/Card/Card.types';
import CardSkeleton from '@app/components/Card/CardSkeleton';
import SectionHeader from '@app/components/SectionHeader/SectionHeader';
import Skeleton from '@app/components/Skeleton/Skeleton';
import LayoutSection from '@app/modules/Layout/LayoutSection';

import CardsGrid from './CardsGrid';
import { CardsGridSkeletonProps } from './CardsGrid.types';

const size: CardSizesBreakpoints = {
  mobile: 'small', tablet: 'medium', laptop: 'large', desktop: 'extraLarge',
};

const CardsGridSkeleton = ({ hasTitle }: CardsGridSkeletonProps) => {

  return (
    <LayoutSection>
      {hasTitle && (
        <SectionHeader>
          <Skeleton width={200} />
        </SectionHeader>
      )}
      <CardsGrid>
        <CardSkeleton size={size} />
        <CardSkeleton size={size} />
        <CardSkeleton size={size} />
        <CardSkeleton size={size} />
        <CardSkeleton size={size} />
      </CardsGrid>
    </LayoutSection>
  );
};

export default CardsGridSkeleton;

```
