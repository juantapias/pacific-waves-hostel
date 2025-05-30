import { useState } from "react";
import styles from "./NewsletterForm.module.css";

type NewsletterFormProps = {
  placeholder?: string;
};

export default function NewsletterForm({ placeholder }: NewsletterFormProps) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Por favor, completa todos los campos del formulario.");
      return;
    }

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setLoading(false);
      } else {
        setError("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Error de red. Intenta más tarde.");
      setLoading(false);
    }
  };

  return (
    <form className={styles.newsletterGroup} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.inputNewsletter}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={styles.buttonNewsletter}
        disabled={isLoading}
      >
        {isLoading ? "Enviando" : "Enviar"}
      </button>
    </form>
  );
}
