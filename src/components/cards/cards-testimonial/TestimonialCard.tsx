import styles from "./Cards.module.css";

type ITestimonialCard = {
  name: string;
  rate: number;
  comment: string;
  source: string;
  date: string;
};

type TestimonialCardProps = {
  testimonial: ITestimonialCard;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{testimonial.name.toLowerCase()}</h2>
        <div className={styles.rating}>
          <span className={styles.rate}>{testimonial.rate}</span>
          <i className={`${styles.star} icon icon-star`} />
        </div>
      </div>
      <p className={styles.description}>{testimonial.comment}</p>
      <div className={styles.details}>
        <span>{testimonial.source}</span>
        <span>{testimonial.date}</span>
      </div>
    </div>
  );
}
