import styles from './BookingForm.module.css';

export default function BookingForm() {
  return (
    <div className={styles.bookingForm}>
      <div className={styles.formGroup}>
        <label htmlFor='checkin' className={styles.label}>
          Fecha de entrada
        </label>
        <input
          type='date'
          id='checkin'
          name='checkin'
          className={styles.inputCalendar}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='checkout' className={styles.label}>
          Fecha de salida
        </label>
        <input
          type='date'
          id='checkout'
          name='checkout'
          className={styles.inputCalendar}
          required
        />
      </div>
      <button type='submit' className='btn-primary'>
        Reservar ahora
      </button>
    </div>
  );
}
