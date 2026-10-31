// Função Serverless (Vercel) — login do painel /admin/estoque.
// A senha fica SEMPRE no servidor, na variável de ambiente ADMIN_PASSWORD
// (painel da Vercel / .env.local). Nunca exponha a senha no frontend.

import { createHash, timingSafeEqual } from "node:crypto";

// Compara em tempo constante: o hash SHA-256 iguala o tamanho dos dois lados,
// então timingSafeEqual não lança e o tempo não revela o quanto a senha acertou.
const hash = (texto) => createHash("sha256").update(texto).digest();
const iguais = (a, b) => timingSafeEqual(hash(a), hash(b));

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const esperada = process.env.ADMIN_PASSWORD;
  if (!esperada) {
    return res.status(500).json({ error: "Acesso indisponível no momento." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const senha = body && typeof body.senha === "string" ? body.senha : "";

  if (!senha || !iguais(senha, esperada)) {
    return res.status(401).json({ error: "Senha incorreta." });
  }
  return res.status(200).json({ ok: true });
}
