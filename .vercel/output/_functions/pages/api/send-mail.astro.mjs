import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const email = await request.json();
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email es requerido"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Formato de email inválido"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const transporter = nodemailer.createTransport({
      host: undefined                         ,
      port: parseInt(undefined                          || "587"),
      secure: undefined                            === "true",
      // true para 465, false para otros puertos
      auth: {
        user: undefined                         ,
        pass: undefined                         
      }
    });
    const mailOptions = {
      from: `Pacific Waves Hostel <${undefined                          }>`,
      to: undefined                        ,
      // Email donde recibirás las suscripciones
      subject: "Nueva suscripción al newsletter",
      html: `
        <h2>Nueva suscripción al newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES")}</p>
      `
    };
    const confirmationMailOptions = {
      from: `Pacific Waves Hostel <${undefined                          }>`,
      to: email,
      subject: "¡Gracias por suscribirte a nuestro newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">¡Bienvenido a nuestro newsletter!</h2>
          <p>Gracias por suscribirte. Pronto recibirás nuestras últimas noticias y actualizaciones.</p>
          <p>Si no solicitaste esta suscripción, puedes ignorar este correo.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Este correo fue enviado automáticamente, por favor no respondas a este mensaje.
          </p>
        </div>
      `
    };
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationMailOptions)
    ]);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Suscripción exitosa"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
