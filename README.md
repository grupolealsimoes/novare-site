# Novare Contabilidade — Landing Page

Site estático, sem dependência de CDN. Basta subir a pasta inteira em qualquer hospedagem
(GitHub Pages, Netlify, Vercel, hospedagem tradicional).

## Estrutura

```
index.html                      página principal
politica-de-privacidade.html    página legal (linkada no rodapé)
assets/
  css/styles.css                Tailwind compilado + estilos do projeto
  css/aos.css                   biblioteca de animação ao rolar
  js/main.js                    scripts do site (comentado por seção)
  js/gsap.min.js                animações
  js/ScrollTrigger.min.js       animações ligadas à rolagem
  js/aos.js                     revelações ao rolar
  fonts/                        Inter + Cormorant Garamond (self-hosted)
  img/logo.png, logo-nav.png    logo da marca
```

## O que precisa ser trocado antes de publicar

Procure por `EDITAR` no `index.html`. O que ainda falta:

| Onde | O que trocar |
|---|---|
| Selo do Google | A contagem `9 avaliações` precisa ser atualizada quando entrarem novas |
| Sobre a Novare | A foto da fundadora entra numa próxima atualização |
| E-mail | Confirmar `contato@novarecontabilidade.com.br` |
| Telefone | O site usa (85) 99677-8884; o perfil do Google mostra (85) 99980-0899 — alinhar se for o caso |

Já estão com conteúdo real: as **6 logos de clientes**, os **3 depoimentos** (avaliações publicadas no Google, com nome do autor), o **mapa** com CE, SP e SC, as **4 fotos** das abas por porte, o WhatsApp, o endereço, o Instagram @contabilidade.novare e o mapa do rodapé.

### Sobre a logo da Cacau Show
A Novare atende **franqueados** da Cacau Show, não a franqueadora. Exibir a logo institucional pode dar a
entender que o escritório atende a marca inteira, e o franqueado normalmente não pode autorizar o uso da
marca do franqueador. Avalie trocar por um card escrito "Franqueados Cacau Show", sem a logo.

## Formulário

O site é estático, então o formulário não usa servidor: ao enviar, ele monta a mensagem
e abre o WhatsApp já preenchido. Se um dia quiser receber por e-mail, dá para trocar por
Formspree, Netlify Forms ou similar sem mexer no layout.

## Publicando no GitHub Pages

1. Suba **todos os arquivos e pastas** no repositório (mantendo a estrutura de `assets/`).
2. Settings → Pages → Source: branch `main`, pasta `/ (root)` → Save.
3. O site fica disponível em `https://grupolealsimoes.github.io/novare-site/`.

> As tags `canonical`, Open Graph e Schema.org já apontam para esse endereço.
> Se um dia migrarem para domínio próprio, troque as 5 ocorrências de
> `https://grupolealsimoes.github.io/novare-site/` no topo do `index.html`.

## Observações técnicas

- Fontes e bibliotecas são servidas do próprio site (sem CDN), o que melhora
  velocidade e evita quebra caso um serviço externo saia do ar.
- `prefers-reduced-motion` é respeitado: quem configurou o sistema para menos
  animação vê a página sem movimento.
- Modo escuro não foi implementado (era opcional no briefing).
