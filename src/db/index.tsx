export const plans = [
  {
    plans: {
      ballenas: {
        name: "Avistamiento de ballenas en Bahía Solano",
        description:
          "En Pacific Waves Hostel, no solo vemos las ballenas; vivimos su entorno. Ubicados en El Valle, Bahía Solano, te ofrecemos una conexión auténtica con el Pacífico colombiano. Aquí, la aventura comienza desde que pones un pie en la arena.",
        slug: "plan-ballenas",
        overview: [
          {
            icon: "IconUsers",
            title: "Capacidad",
            content: "Max. 8 personas",
          },
          {
            icon: "IconCashBanknote",
            title: "Desde",
            content: "830.000 COP",
          },
        ],
        includes: [
          {
            icon: "IconBus",
            title:
              "Traslados terrestres Aeropuerto (BSC) - Hostal - Aeropuerto.",
          },
          {
            icon: "IconBed",
            title: "Alojamiento según elección.",
          },
          {
            icon: "IconSalad",
            title:
              "Alimentación completa (Desayunos, almuerzos y cenas diarias).",
          },
          {
            icon: "IconWhale",
            title: "Avistamiento de ballenas garantizado.",
          },
          {
            icon: "IconSurfboard",
            title: "Cortesía: 1 hora de alquiler de bodyboard.",
          },
          {
            icon: "IconHomeShield",
            title: "Seguro hotelero.",
          },
          {
            icon: "IconRoute",
            title:
              "Excursiones a PNN Utría (4ta noche) y Cascadas de Chadó (5ta noche).",
          },
        ],
        notIncludes: [
          {
            title: "Tiquetes aéreos.",
          },
          {
            title: "Tasa Proturismo ($58400).",
          },
          {
            title: "Ingreso a PNN Utría.",
          },
          {
            title: "Tarifas ingreso",
            content: [
              "Nacional/Extranjero Residente/CAN: $14.500 - $28.000",
              "Extranjero No Residente: $63.500 o más según temporada",
            ],
          },
          {
            title: "Gastos no especificados.",
          },
        ],
        itinerary: [
          {
            id: 1,
            day: "01",
            title: "Llegada al paraíso",
            description:
              "Traslado terrestre desde el Aeropuerto de Bahía Solano (BSC) hasta el hostal. Check-in, almuerzo frente al mar y tarde libre para disfrutar de nuestra zona de hamacas o el bar.",
          },
          {
            id: 2,
            day: "02",
            title: "Encuentro con las gigantes",
            description:
              "Salida en lancha para el avistamiento de ballenas. Compromiso Pacific Waves: ¡Si no las vemos, volvemos al mar sin costo adicional!",
          },
          {
            id: 3,
            day: "03",
            title: "Exploración local",
            description:
              "Día para disfrutar de los alrededores de El Valle. Puedes visitar las playas cercanas o aprovechar nuestra zona de coworking frente al mar.",
          },
          {
            id: 4,
            day: "04",
            title: "PNN Utría (Planes de 4 y 5 noches)",
            description:
              "Excursión en lancha al Parque Nacional Natural Utría. Disfruta de la ensenada, manglares y playas de aguas cristalinas.",
          },
          {
            id: 5,
            day: "05",
            title: "Cascadas de Chadó (Planes de 5 noches)",
            description:
              "Aventura en lancha hacia las imponentes Cascadas de Chadó, donde la selva se une con el mar.",
          },
          {
            id: 6,
            day: null,
            title: "Día de salida",
            description:
              "Último desayuno frente al mar, traslado al aeropuerto y fin de los servicios.",
          },
        ],
      },
      surf: {
        name: "Surf en Bahía Solano",
        description: "",
        slug: "plan-surf",
        overview: [
          {
            icon: "IconWave",
            title: "Duración",
            content: "3, 4 o 5 noches",
          },
          {
            icon: "IconWave",
            title: "Disponibilidad",
            content: "Todo el año",
          },
          {
            icon: "IconWave",
            title: "Desde",
            content: "790.000 COP",
          },
        ],
        includes: [
          {
            icon: "IconBus",
            title:
              "Traslados terrestres Aeropuerto (BSC) - Hostal - Aeropuerto.",
          },
          {
            icon: "IconBed",
            title: "Alojamiento según elección.",
          },
          {
            icon: "IconSalad",
            title:
              "Alimentación completa (Desayunos, almuerzos y cenas diarias).",
          },
          {
            icon: "IconSurfboard",
            title: "Clases de surf / Body Surf según noches (2, 3 o 4 clases).",
          },
          {
            icon: "IconHomeShield",
            title: "Seguro hotelero.",
          },
        ],
        notIncludes: [
          {
            title: "Tiquetes aéreos.",
          },
          {
            title: "Tasa Proturismo ($58.400).",
          },
          {
            title: "Ingreso a PNN Utría (actividad adicional).",
          },
          {
            title: "Tarifas ingreso",
            content: [
              "Nacional/Extranjero Residente/CAN (6-25 años): $14.500 aprox.",
              "Nacional/Extranjero Residente/CAN (Adultos): $28.000 aprox.",
              "Extranjero No Residente: $63.500 o más según temporada",
            ],
          },
          {
            title: "Gastos no especificados.",
          },
        ],
        itinerary: [
          {
            id: 1,
            day: "01",
            title: "Llegada al paraíso",
            description:
              "Traslado terrestre desde el Aeropuerto de Bahía Solano (BSC) hasta el hostal. Check-in, almuerzo frente al mar y tarde libre para disfrutar de la zona de hamacas o el bar.",
          },
          {
            id: 2,
            day: "02",
            title: "Sesión de surf",
            description:
              "Primera clase de surf o Body Surf para conectar con la energía de las olas.",
          },
          {
            id: 3,
            day: "03",
            title: "Perfeccionando la técnica",
            description:
              "Continuación de clases de surf según el plan elegido. Día para disfrutar de los alrededores de El Valle.",
          },
          {
            id: 4,
            day: "04",
            title: "Exploración o surf (planes de 4 y 5 noches)",
            description:
              "Tercera clase de surf o tiempo libre para explorar playas cercanas o usar el coworking frente al mar.",
          },
          {
            id: 5,
            day: "05",
            title: "Dominando el Pacífico (plan de 5 noches)",
            description:
              "Cuarta clase de surf para maximizar la experiencia en el mar.",
          },
          {
            id: 6,
            day: null,
            title: "Día de salida",
            description:
              "Último desayuno frente al mar, traslado al aeropuerto y fin de los servicios.",
          },
        ],
      },
      aventura: {
        name: "",
        description: "",
        slug: "plan-aventura",
        overview: [
          {
            icon: "IconWave",
            title: "Duración",
            content: "3, 4 o 5 noches",
          },
          {
            icon: "IconWave",
            title: "Disponibilidad",
            content: "Todo el año",
          },
          {
            icon: "IconWave",
            title: "Desde",
            content: "840.000 COP",
          },
        ],
        includes: [
          {
            icon: "IconBus",
            title:
              "Traslados terrestres Aeropuerto (BSC) - Hostal - Aeropuerto.",
          },
          {
            icon: "IconBed",
            title: "Alojamiento según elección.",
          },
          {
            icon: "IconSalad",
            title:
              "Alimentación completa (Desayunos, almuerzos y cenas diarias).",
          },
          {
            icon: "IconSurfboard",
            title: "Clase de surf / Body Surf.",
          },
          {
            icon: "IconWalk",
            title: "Caminata a las cascadas de Playa Larga.",
          },
          {
            icon: "IconTubing",
            title: "Tubing por el río Valle (planes de 4 y 5 noches).",
          },
          {
            icon: "IconRoute",
            title: "Excursión a cascadas de Chadó (plan de 5 noches).",
          },
          {
            icon: "IconHomeShield",
            title: "Seguro hotelero.",
          },
        ],
        notIncludes: [
          {
            title: "Tiquetes aéreos.",
          },
          {
            title: "Tasa Proturismo ($58.400).",
          },
          {
            title: "Ingreso a PNN Utría (actividad adicional).",
          },
          {
            title: "Tarifas ingreso",
            content: [
              "Nacional/Extranjero Residente/CAN (6-25 años): $14.500 aprox.",
              "Nacional/Extranjero Residente/CAN (Adultos): $28.000 aprox.",
              "Extranjero No Residente: $63.500 o más según temporada",
            ],
          },
          {
            title: "Gastos no especificados.",
          },
        ],
        itinerary: [
          {
            id: 1,
            day: "01",
            title: "Llegada al paraíso",
            description:
              "Traslado terrestre desde el Aeropuerto de Bahía Solano (BSC) hasta el hostal. Check-in, almuerzo frente al mar y tarde libre para disfrutar de la zona de hamacas o el bar.",
          },
          {
            id: 2,
            day: "02",
            title: "Conexión con las olas",
            description:
              "Clase de surf o Body Surf para sentir la fuerza del mar.",
          },
          {
            id: 3,
            day: "03",
            title: "Secretos de la selva",
            description: "Caminata guiada a las cascadas de Playa Larga.",
          },
          {
            id: 4,
            day: "04",
            title: "Río y calma (planes de 4 y 5 noches)",
            description: "Experiencia de tubing por el río Valle.",
          },
          {
            id: 5,
            day: "05",
            title: "Cascadas de Chadó (plan de 5 noches)",
            description:
              "Aventura en lancha hacia las cascadas de Chadó, donde la selva se une con el mar.",
          },
          {
            id: 6,
            day: null,
            title: "Día de salida",
            description:
              "Último desayuno frente al mar, traslado al aeropuerto y fin de los servicios.",
          },
        ],
      },
    },
  },
];

export const PlansResume = [
  {
    slug: "plan-ballenas",
    href: "/plan-ballenas",
    label: "Temporada",
    season: "Jun – Oct",
    title: "Ballenas",
    tagline: "Avistamiento de ballenas jorobadas",
    description:
      "Sal en lancha al encuentro de las jorobadas del Pacífico. Si no las avistas, la excursión se repite sin costo.",
    from: 830000,
    nights: "3 a 5 noches",
    color: "#0a3d62",
    accent: "#48b1e8",
    activities: [
      "Avistamiento garantizado",
      "PNN Utría (4–5n)",
      "Cascadas de Chadó (5n)",
    ],
  },
  {
    slug: "plan-surf",
    href: "/plan-surf",
    label: "Todo el año",
    season: "365 días",
    title: "Surf",
    tagline: "Clases de surf en el Pacífico colombiano",
    description:
      "Desde tu primera ola hasta dominar el Pacífico. Clases progresivas con instructores locales en una de las playas más constantes de Colombia.",
    from: 790000,
    nights: "3 a 5 noches",
    color: "#0a3d62",
    accent: "#48b1e8",
    activities: ["2–4 clases de surf", "Body Surf", "Coworking frente al mar"],
  },
  {
    slug: "plan-aventura",
    href: "/plan-aventura",
    label: "Todo el año",
    season: "365 días",
    title: "Aventura",
    tagline: "Selva, río y mar en un solo plan",
    description:
      "Surf, cascadas, tubing y lancheo por la selva chocoana. Cada día en El Valle es una experiencia distinta.",
    from: 840000,
    nights: "3 a 5 noches",
    color: "#0a3d62",
    accent: "#48b1e8",
    activities: [
      "Surf + Body Surf",
      "Cascadas Playa Larga",
      "Tubing Río Valle (4–5n)",
      "Cascadas de Chadó (5n)",
    ],
  },
];
