import React, { useState, useEffect } from "react";

// ─── Precios por plan ────────────────────────────────────────────────────────
const PLAN_PRICES: Record<string, Record<string, Record<number, number>>> = {
  "plan-ballenas": {
    "cabaña-pareja": { 3: 2050000, 4: 2970000, 5: 3880000 },
    "cabaña-individual": { 3: 1200000, 4: 1710000, 5: 2230000 },
    familiar: { 3: 890000, 4: 1300000, 5: 1720000 },
    "dormitorio-4": { 3: 890000, 4: 1300000, 5: 1720000 },
    "dormitorio-8": { 3: 830000, 4: 1220000, 5: 1610000 },
  },
  "plan-surf": {
    "cabaña-pareja": { 3: 1990000, 4: 2640000, 5: 3300000 },
    "cabaña-individual": { 3: 1170000, 4: 1550000, 5: 1930000 },
    familiar: { 3: 860000, 4: 1140000, 5: 1420000 },
    "dormitorio-4": { 3: 860000, 4: 1140000, 5: 1420000 },
    "dormitorio-8": { 3: 790000, 4: 1050000, 5: 1310000 },
  },
  "plan-aventura": {
    "cabaña-pareja": { 3: 2080000, 4: 2850000, 5: 3720000 },
    "cabaña-individual": { 3: 1210000, 4: 1650000, 5: 2140000 },
    familiar: { 3: 900000, 4: 1240000, 5: 1630000 },
    "dormitorio-4": { 3: 900000, 4: 1240000, 5: 1630000 },
    "dormitorio-8": { 3: 840000, 4: 1160000, 5: 1520000 },
  },
};

// Fallback: si se renderiza en una página sin plan reconocido
const FALLBACK_PLAN = "plan-ballenas";

const ROOM_LABELS: Record<string, string> = {
  "cabaña-pareja": "Cabaña Privada (Pareja)",
  "cabaña-individual": "Cabaña Privada (Individual)",
  familiar: "Habitación Familiar (Mín. 2 pers)",
  "dormitorio-4": "Dormitorio (4 camas)",
  "dormitorio-8": "Dormitorio (8 camas)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatCOP(value: number): string {
  return `$${value.toLocaleString("es-CO")} COP`;
}

function getDiffNights(checkin: string, checkout: string): number {
  if (!checkin || !checkout) return 0;
  const a = new Date(checkin).getTime();
  const b = new Date(checkout).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface BookingDateProps {
  plan?: string; // recibe el slug del plan desde el padre: "plan-ballenas" | "plan-surf" | "plan-aventura"
}

// ─── Componente ──────────────────────────────────────────────────────────────
export default function BookingDate({
  plan = FALLBACK_PLAN,
}: BookingDateProps) {
  // Normaliza el plan recibido; si no coincide, usa el fallback
  const activePlan = PLAN_PRICES[plan] ? plan : FALLBACK_PLAN;
  const PRICES = PLAN_PRICES[activePlan];

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [room, setRoom] = useState("cabaña-pareja");
  const [price, setPrice] = useState<number | null>(null);
  const [nights, setNights] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  // Recalcula precio cuando cambia plan, fechas o habitación
  useEffect(() => {
    setError("");
    setPrice(null);
    setNights(0);

    if (!checkin || !checkout) return;

    const diff = getDiffNights(checkin, checkout);

    if (diff <= 0) {
      setError("La fecha de salida debe ser posterior a la de entrada.");
      return;
    }
    if (diff < 3) {
      setError("La estadía mínima es de 3 noches.");
      return;
    }
    if (diff > 5) {
      setError("La estadía máxima es de 5 noches.");
      return;
    }

    setNights(diff);
    const exactPrice = PRICES[room]?.[diff];
    setPrice(exactPrice ?? null);
  }, [checkin, checkout, room, activePlan]);

  // Resetea fechas si cambia el plan (evita estados inconsistentes)
  useEffect(() => {
    setCheckin("");
    setCheckout("");
    setPrice(null);
    setNights(0);
    setError("");
  }, [activePlan]);

  const minCheckout = checkin
    ? new Date(new Date(checkin).getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : today;

  const maxCheckout = checkin
    ? new Date(new Date(checkin).getTime() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : undefined;

  return (
    <div className="bg-primary py-4 rounded-2xl">
      <div className="container mx-auto px-8">
        <div className="grid grid-rows-1">
          <div className="grid grid-cols-1 gap-4">
            {/* Encabezado */}
            <div>
              <h2 className="text-white text-center text-xl">
                Reserva tu cupo
              </h2>
              {price !== null && nights > 0 && (
                <p className="text-white text-center text-sm mt-1">
                  {nights} noches · {ROOM_LABELS[room]}:{" "}
                  <span className="font-bold">{formatCOP(price)}</span>
                </p>
              )}
            </div>

            {/* Fecha de entrada */}
            <div className="flex flex-col">
              <label htmlFor="checkin" className="text-white">
                Fecha de entrada
              </label>
              <input
                id="checkin"
                type="date"
                min={today}
                value={checkin}
                onChange={(e) => {
                  setCheckin(e.target.value);
                  setCheckout("");
                }}
                className="border border-secondary outline-none bg-white rounded-full h-12 px-2 text-black"
              />
            </div>

            {/* Fecha de salida */}
            <div className="flex flex-col">
              <label htmlFor="checkout" className="text-white">
                Fecha de salida{" "}
                <span className="text-xs opacity-70">(entre 3 y 5 noches)</span>
              </label>
              <input
                id="checkout"
                type="date"
                min={minCheckout}
                max={maxCheckout}
                value={checkout}
                disabled={!checkin}
                onChange={(e) => setCheckout(e.target.value)}
                className="border border-secondary outline-none bg-white rounded-full h-12 px-2 text-black disabled:opacity-50"
              />
            </div>

            {/* Error de rango */}
            {error && (
              <p className="text-yellow-300 text-sm text-center -mt-2">
                ⚠️ {error}
              </p>
            )}

            {/* Tipo de habitación */}
            <div className="flex flex-col">
              <label htmlFor="room" className="text-white">
                Tipo de habitación
              </label>
              <select
                name="room"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="border border-secondary outline-none bg-white rounded-full h-12 px-2 text-black"
              >
                {Object.entries(ROOM_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tabla de precios referencial */}
            {room && (
              <div className="bg-white/10 rounded-xl px-4 py-3 text-white text-sm">
                <p className="font-semibold mb-2 text-center">
                  Tarifas — {ROOM_LABELS[room]}
                </p>
                <div className="grid grid-cols-3 gap-1 text-center">
                  {[3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`rounded-lg p-2 ${
                        nights === n
                          ? "bg-secondary text-primary font-bold"
                          : "bg-white/10"
                      }`}
                    >
                      <p className="text-xs opacity-80">{n} noches</p>
                      <p className="font-semibold">
                        {formatCOP(PRICES[room][n])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!price || !!error}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reservar
            </button>

            <hr className="border-secondary" />

            <div className="text-center">
              <p className="text-white text-sm">
                No se realizará ningún cargo hasta que confirmes la
                disponibilidad del plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
