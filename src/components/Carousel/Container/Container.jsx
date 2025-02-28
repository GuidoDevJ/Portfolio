import { cardDetails } from 'src/utils/config';
import { CarouselItem } from '../Item/Item';
import styles from '../style.module.css';

export const AutoplayCarousel = () => {
  const items = [...Object.values(cardDetails), ...Object.values(cardDetails)]; // Duplicar elementos
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            imgUrl={item.imgUrl}
            imgTitle={item.title}
          />
        ))}
      </div>
    </div>
  );
};
