import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

type ContactPayload = {
  name?: string
  company?: string
  email?: string
  phone?: string
  message?: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

export async function POST(request: Request) {
  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const name = body.name?.trim() ?? ""
  const company = body.company?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const phone = body.phone?.trim() ?? ""
  const message = body.message?.trim() ?? ""

  // Required fields (match the form's required inputs)
  if (!name || !company || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, company, email, and message." },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, TO_EMAIL } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
    console.error("Contact form: missing SMTP environment variables.")
    return NextResponse.json(
      { error: "The contact form is not configured. Please try again later." },
      { status: 500 }
    )
  }

  const port = Number(SMTP_PORT)

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465 (implicit TLS), false for 587/25 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone || "—"],
  ]

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1a2d4a; max-width: 600px;">
      <h2 style="margin: 0 0 16px;">New contact inquiry — Klyvora Group</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; background: #f4f6f9; font-weight: 600; width: 140px;">${label}</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e6ec;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin: 0 0 8px;">Message</h3>
      <p style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(message)}</p>
    </div>
  `

  const text =
    `New contact inquiry — Klyvora Group\n\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n\nMessage:\n${message}\n`

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
    })
  } catch (error) {
    console.error("Contact form: failed to send email.", error)
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again later." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
