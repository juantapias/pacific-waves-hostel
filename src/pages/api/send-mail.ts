// src/pages/api/send-mail.ts
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener el email del cuerpo de la petición
    const email = await request.json();

    // Validar que el email existe
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email es requerido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Formato de email inválido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: parseInt(import.meta.env.SMTP_PORT || "587"),
      secure: import.meta.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Configurar las opciones del correo
    const mailOptions = {
      from: `Pacific Waves Hostel <${import.meta.env.FROM_EMAIL}>`,
      to: import.meta.env.TO_EMAIL, // Email donde recibirás las suscripciones
      subject: "Nueva suscripción al newsletter",
      html: `
        <h2>Nueva suscripción al newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
      `,
    };

    // Opcional: Enviar email de confirmación al suscriptor
    const confirmationMailOptions = {
      from: `Pacific Waves Hostel <${import.meta.env.FROM_EMAIL}>`,
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
      `,
    };

    // Enviar ambos correos
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationMailOptions),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Suscripción exitosa",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error al enviar correo:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
