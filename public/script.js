// ============================================================
// B.1 — Base de dados (JSON)
// ============================================================
const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15 Pro",
      preco: 8999.90,
      categoria: "Celulares",
      imagem: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=400&hei=400&fmt=jpeg&qlt=95",
      descricao: "Titanium design, chip A17 Pro, câmera de 48 MP com zoom óptico de 5x.",
      emEstoque: true,
    },
    {
      id: 2,
      nome: "Samsung Galaxy S24 Ultra",
      preco: 7499.00,
      categoria: "Celulares",
      imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-ultra-s928-sm-s928blvkzto-thumb-539573029?$344_344_PNG$",
      descricao: "S Pen integrada, câmera de 200 MP, tela Dynamic AMOLED 2X de 6,8 polegadas.",
      emEstoque: true,
    },
    {
      id: 3,
      nome: "MacBook Air M3",
      preco: 12499.00,
      categoria: "Notebooks",
      imagem: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=400&hei=400&fmt=jpeg&qlt=90",
      descricao: `Chip Apple M3, tela Liquid Retina 13,6", bateria de até 18 horas.`,
    },
    {
      id: 4,
      nome: "Dell XPS 15",
      preco: 10299.00,
      categoria: "Notebooks",
      imagem: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-black-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100",
      descricao: "Intel Core i9, 32 GB RAM, tela OLED 3,5K de 15,6 polegadas, SSD 1 TB.",
      emEstoque: false,
    },
    {
      id: 5,
      nome: "AirPods Pro 2",
      preco: 1899.00,
      categoria: "Acessórios",
      imagem: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=90",
      descricao: "Cancelamento ativo de ruído de próxima geração, áudio espacial personalizado.",
      emEstoque: true,
    },
    {
      id: 6,
      nome: "Teclado Mecânico Keychron K2",
      preco: 599.90,
      categoria: "Acessórios",
      imagem: "https://www.keychron.com/cdn/shop/products/Keychron-K2-hot-swappable-wireless-mechanical-keyboard-brown-switch_720x.jpg?v=1643253756",
      descricao: "Layout 75%, switches Gateron Brown, retroiluminação RGB, conexão Bluetooth.",
      emEstoque: true,
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4299.00,
      categoria: "Games",
      imagem: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
      descricao: "SSD ultrarrápido, ray tracing em tempo real, áudio 3D Tempest, controle DualSense.",
      emEstoque: false,
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 3999.00,
      categoria: "Games",
      imagem: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni?ver=a707&q=90&m=6&h=400&w=400&b=%23FFFFFFFF&f=jpg&o=f&aim=true",
      descricao: "4K a 120 fps, Quick Resume, Game Pass Ultimate incluído por 3 meses.",
      emEstoque: true,
    },
    {
      id: 9,
      nome: "Samsung 49\" Odyssey G9",
      preco: 8799.00,
      categoria: "Acessórios",
      imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/lc49g95tsslxzd/gallery/br-odyssey-g9-g95t-lc49g95tsslxzd-frontblack-thumb-368243116?$344_344_PNG$",
      descricao: "Monitor ultrawide curvo 240 Hz, resolução DQHD, G-Sync e FreeSync Premium Pro.",
      emEstoque: true,
    },
  ],
};

// ============================================================
// B.2 — Seleção de elementos do DOM
// ============================================================
const productList    = document.getElementById("product-list");      // getElementById
const productDetails = document.getElementById("product-details");   // getElementById
const searchInput    = document.querySelector("#search");             // querySelector
const categorySelect = document.querySelector("#category");           // querySelector
const btnRender      = document.querySelector("#btnRender");          // querySelector

// ============================================================
// B.3 — Funções obrigatórias
// ============================================================

/**
 * Formata um número como moeda brasileira.
 * @param {number} preco
 * @returns {string} ex: "R$ 1.999,90"
 */
function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Cria e retorna um card DOM para um produto.
 * @param {object} produto
 * @returns {HTMLElement}
 */
function createProductCard(produto) {
  // Elemento raiz do card
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);           // setAttribute
  card.setAttribute("data-categoria", produto.categoria);
  card.classList.add("card");                          // classList.add
  if (!produto.emEstoque) card.classList.add("out-of-stock");

  // Ajuste visual via style (requisito obrigatório)
  card.style.border = produto.emEstoque
    ? "1.5px solid var(--border)"
    : "1.5px solid var(--danger-border)";

  // Badge de estoque
  const badge = document.createElement("span");
  badge.classList.add("badge");
  badge.classList.add(produto.emEstoque ? "badge--in" : "badge--out");
  badge.textContent = produto.emEstoque ? "Em estoque" : "Esgotado";

  // Imagem
  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  img.classList.add("card-img");

  // Corpo do card
  const body = document.createElement("div");
  body.classList.add("card-body");

  const categoria = document.createElement("span");
  categoria.classList.add("card-category");
  categoria.textContent = produto.categoria;

  const nome = document.createElement("h2");
  nome.classList.add("card-title");
  nome.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.classList.add("card-price");
  preco.textContent = formatPrice(produto.preco);

  // Botões
  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn", "btn--primary");
  btnDetails.textContent = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.classList.add("btn", "btn--ghost");
  btnHighlight.textContent = "★ Destacar";

  // addEventListener nos botões do card
  btnDetails.addEventListener("click", () => showProductDetails(produto));
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");               // toggle para alternar destaque
    btnHighlight.textContent = card.classList.contains("highlight")
      ? "✦ Destacado"
      : "★ Destacar";
  });

  // Montagem
  actions.appendChild(btnDetails);
  actions.appendChild(btnHighlight);
  body.appendChild(categoria);
  body.appendChild(nome);
  body.appendChild(preco);
  body.appendChild(actions);
  card.appendChild(badge);
  card.appendChild(img);
  card.appendChild(body);

  return card;
}

/**
 * Renderiza a lista de produtos no DOM.
 * @param {Array} produtos
 */
function renderProducts(produtos) {
  productList.innerHTML = "";  // limpa a lista (innerHTML)

  if (produtos.length === 0) {
    productList.innerHTML = `<p class="empty-msg">Nenhum produto encontrado.</p>`;
    return;
  }

  produtos.forEach((produto) => {
    const card = createProductCard(produto);
    productList.appendChild(card);  // appendChild
  });

  // B.5 — querySelectorAll obrigatório: loga data-id de todos os cards
  const allCards = document.querySelectorAll(".card");  // querySelectorAll
  console.log(`%c[querySelectorAll] ${allCards.length} card(s) renderizado(s):`, "color: #7c3aed; font-weight: bold");
  allCards.forEach((c) => {
    console.log(`  → data-id: ${c.getAttribute("data-id")} | categoria: ${c.getAttribute("data-categoria")}`);
    c.style.transition = "transform 0.25s ease, box-shadow 0.25s ease"; // efeito via style
  });
}

/**
 * Preenche dinamicamente o <select> de categorias.
 */
function renderCategories() {
  const categorias = [...new Set(data.produtos.map((p) => p.categoria))].sort();

  // Mantém apenas a opção "Todas"
  categorySelect.innerHTML = `<option value="">Todas</option>`;

  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

/**
 * Exibe os detalhes de um produto na área lateral.
 * @param {object} produto
 */
function showProductDetails(produto) {
  const estoqueLabel = produto.emEstoque
    ? `<span class="detail-badge detail-badge--in">✔ Em estoque</span>`
    : `<span class="detail-badge detail-badge--out">✘ Esgotado</span>`;

  // innerHTML para montar a área de detalhes
  productDetails.innerHTML = `
    <button class="details-close" id="closeDetails">✕</button>
    <img src="${produto.imagem}" alt="${produto.nome}" class="details-img" />
    <div class="details-body">
      <span class="details-category">${produto.categoria}</span>
      <h2 class="details-title">${produto.nome}</h2>
      <p class="details-price">${formatPrice(produto.preco)}</p>
      ${estoqueLabel}
      <p class="details-desc">${produto.descricao}</p>
    </div>
  `;

  productDetails.classList.add("details--visible");

  document.getElementById("closeDetails").addEventListener("click", () => {
    productDetails.classList.remove("details--visible");
    productDetails.innerHTML = `<p class="details-placeholder">Clique em "Ver detalhes" para exibir informações completas do produto.</p>`;
  });
}

/**
 * Filtra produtos com base no texto de busca e na categoria selecionada.
 * @returns {Array}
 */
function filterProducts() {
  const termo = searchInput.value.toLowerCase().trim();
  const cat   = categorySelect.value;

  return data.produtos.filter((p) => {
    const nomeOk = p.nome.toLowerCase().includes(termo);
    const catOk  = cat === "" || p.categoria === cat;
    return nomeOk && catOk;
  });
}

// ============================================================
// Eventos dos controles
// ============================================================

// Digitação no campo de busca → filtra em tempo real
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

// Mudança de categoria → filtra
categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

// Botão Renderizar → recarrega catálogo completo e limpa filtros
btnRender.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "";
  renderProducts(data.produtos);
console.log("%c[btnRender] Catálogo recarregado.", "color: #059669; font-weight: bold");
});

// ============================================================
// Inicialização
// ============================================================
renderCategories();
renderProducts(data.produtos);