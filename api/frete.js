// Função Serverless (Vercel) — cálculo de frete via SuperFrete.
// O token fica SEMPRE no servidor, na variável de ambiente SUPERFRETE_TOKEN
// (configurada no painel da Vercel). Nunca exponha o token no frontend.

const ORIGEM_CEP = "13827118"; // CEP de origem (Yami Sabonetes)
const CAIXA = { height: 10, width: 20, length: 30, weight: 0.3 }; // caixa padrão: 1 sabonete (cm / kg)
const SUPERFRETE_URL = "https://api.superfrete.com/api/v0/calculator";
const SERVICOS = "1,2,17"; // PAC, SEDEX, Mini Envios

const soDigitos = (s) => (s || "").replace(/\D/g, "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const token = process.env.SUPERFRETE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Cálculo de frete indisponível no momento." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const cepDestino = soDigitos(body && body.cep);
  if (cepDestino.length !== 8) {
    return res.status(400).json({ error: "Informe um CEP válido com 8 dígitos." });
  }

  try {
    const resposta = await fetch(SUPERFRETE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Yami Sabonetes (yamisabonetes@gmail.com)",
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: { postal_code: ORIGEM_CEP },
        to: { postal_code: cepDestino },
        services: SERVICOS,
        package: CAIXA,
      }),
    });

    if (!resposta.ok) {
      const texto = await resposta.text();
      console.error("SuperFrete erro", resposta.status, texto);
      return res.status(502).json({ error: "Não foi possível calcular o frete agora. Tente novamente." });
    }

    const dados = await resposta.json();
    const opcoes = (Array.isArray(dados) ? dados : [])
      .filter((s) => s && !s.has_error && s.price != null)
      .map((s) => ({
        nome: s.name,
        empresa: (s.company && s.company.name) || "",
        preco: Number(s.price),
        prazoMin: (s.delivery_range && s.delivery_range.min) ?? s.delivery_time,
        prazoMax: (s.delivery_range && s.delivery_range.max) ?? s.delivery_time,
      }));

    return res.status(200).json({ opcoes });
  } catch (e) {
    console.error("Frete exception", e);
    return res.status(500).json({ error: "Erro ao calcular o frete. Tente novamente." });
  }
}
