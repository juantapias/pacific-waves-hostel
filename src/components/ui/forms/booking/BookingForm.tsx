import { useState } from "react";
import styles from "./BookingForm.module.css";

export default function BookingForm() {
  const cloudBeds = import.meta.env.PUBLIC_CLOUDBEDS;
  const cloudID = import.meta.env.PUBLIC_CLOUDBEDS_ID;

  const [startDay, setStartDay] = useState<string>("");
  const [endDay, setEndDay] = useState<string>("");
  const [errors, setErrors] = useState<{
    startDay?: string;
    endDay?: string;
  }>({});

  // Función para obtener la fecha de hoy en formato YYYY-MM-DD
  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Función para validar las fechas
  const validateDates = (): boolean => {
    const newErrors: { startDay?: string; endDay?: string } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparación exacta

    // Validar fecha de entrada
    if (!startDay) {
      newErrors.startDay = "La fecha de entrada es requerida";
    } else {
      const startDate = new Date(startDay);
      if (startDate < today) {
        newErrors.startDay =
          "La fecha de entrada no puede ser una fecha pasada";
      }
    }

    // Validar fecha de salida
    if (!endDay) {
      newErrors.endDay = "La fecha de salida es requerida";
    } else if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);

      if (endDate <= startDate) {
        newErrors.endDay =
          "La fecha de salida debe ser posterior a la fecha de entrada";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDay = e.currentTarget.value;
    setStartDay(newStartDay);

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors.startDay) {
      setErrors((prev) => ({ ...prev, startDay: undefined }));
    }

    // Si hay una fecha de salida, revalidar
    if (endDay && newStartDay) {
      const startDate = new Date(newStartDay);
      const endDate = new Date(endDay);

      if (endDate <= startDate) {
        setErrors((prev) => ({
          ...prev,
          endDay: "La fecha de salida debe ser posterior a la fecha de entrada",
        }));
      } else if (errors.endDay) {
        setErrors((prev) => ({ ...prev, endDay: undefined }));
      }
    }
  };

  const handleEndDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDay = e.currentTarget.value;
    setEndDay(newEndDay);

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors.endDay) {
      setErrors((prev) => ({ ...prev, endDay: undefined }));
    }

    // Validar inmediatamente si hay fecha de inicio
    if (startDay && newEndDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(newEndDay);

      if (endDate <= startDate) {
        setErrors((prev) => ({
          ...prev,
          endDay: "La fecha de salida debe ser posterior a la fecha de entrada",
        }));
      }
    }
  };

  const handleBooking = () => {
    // Validar antes de proceder
    if (!validateDates()) {
      return;
    }

    // Verificar configuración de CloudBeds
    if (!cloudBeds || !cloudID) {
      console.error("CloudBeds configuration missing");
      alert("Error de configuración. Por favor, contacta al administrador.");
      return;
    }

    // Construir URL y redirigir
    const cloudBedsUrl = `${cloudBeds}${cloudID}&checkin=${startDay}&checkout=${endDay}`;
    window.open(cloudBedsUrl, "_blank");
  };

  return (
    <div className={styles.bookingForm}>
      <div className={styles.formGroup}>
        <label htmlFor="checkin" className={styles.label}>
          Fecha de entrada
        </label>
        <input
          type="date"
          id="checkin"
          name="checkin"
          className={`${styles.inputCalendar} ${errors.startDay ? styles.inputError : ""}`}
          value={startDay}
          min={getTodayDate()} // Prevenir selección de fechas pasadas
          onChange={handleStartDayChange}
          required
        />
        {errors.startDay && (
          <span className={styles.errorMessage}>{errors.startDay}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="checkout" className={styles.label}>
          Fecha de salida
        </label>
        <input
          type="date"
          id="checkout"
          name="checkout"
          className={`${styles.inputCalendar} ${errors.endDay ? styles.inputError : ""}`}
          value={endDay}
          min={startDay || getTodayDate()} // Mínimo es la fecha de entrada o hoy
          onChange={handleEndDayChange}
          required
        />
        {errors.endDay && (
          <span className={styles.errorMessage}>{errors.endDay}</span>
        )}
      </div>

      <div className={styles.submitButton}>
        <button
          onClick={handleBooking}
          className="btn-primary"
          disabled={
            !!errors.startDay || !!errors.endDay || !startDay || !endDay
          }
        >
          Reservar ahora
        </button>
      </div>
    </div>
  );
}
