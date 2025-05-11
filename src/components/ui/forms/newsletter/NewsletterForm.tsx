import styles from './NewsletterForm.module.css';

type NewsletterFormProps = {
  placeholder?: string;
};

export default function NewsletterForm({ placeholder }: NewsletterFormProps) {
  return (
    <div className={styles.newsletterGroup}>
      <input
        type='text'
        placeholder={placeholder}
        className={styles.inputNewsletter}
      />
      <button className={styles.buttonNewsletter}>Enviar</button>
    </div>
  );
}
