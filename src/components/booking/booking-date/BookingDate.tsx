const WHATSAPP_NUMBER = "573216409424";
const CONTACT_EMAIL = "info@pacificwaveshostel.com";

const PLAN_LABELS: Record<string, string> = {
  "plan-ballenas": "Plan Avistamiento de Ballenas",
  "plan-surf": "Plan Surf",
  "plan-aventura": "Plan Aventura",
};

interface BookingDateProps {
  plan?: string;
}

export default function BookingDate({ plan }: BookingDateProps) {
  const planLabel = (plan && PLAN_LABELS[plan]) || "uno de sus planes";

  const whatsappMessage = encodeURIComponent(
    `Hola, quisiera información y disponibilidad para el ${planLabel} en Pacific Waves Hostel.`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(`Información - ${planLabel}`);
  const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}`;

  return (
    <div className="bg-primary py-6 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 text-center">
          <div>
            <h2 className="text-white text-xl">Solicita información</h2>
            <p className="text-white text-sm mt-2 opacity-90">
              Escríbenos con tus fechas y te confirmamos disponibilidad y
              tarifas para el {planLabel}.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Solicitar información por WhatsApp
          </a>

          <a href={emailUrl} className="text-white text-sm underline">
            o escríbenos por correo
          </a>

          <hr className="border-secondary" />

          <p className="text-white text-sm">
            No se realizará ningún cargo hasta que confirmes tu reserva.
          </p>
        </div>
      </div>
    </div>
  );
}
