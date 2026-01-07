import inquirer from "inquirer";
import { loadProducts, saveProducts, addProduct } from "./service.js";

let products = [];

async function mainMenu() {
  // 1. carrega dados
  products = loadProducts();

  let exit = false;

  while (!exit) {
    // limpa console
    console.clear();
    console.log("========================================");
    console.log("   SISTEMA DE INVENTÁRIO AGILSTORE ");
    console.log("========================================");
    console.log(`Estoque Atual: ${products.length} itens\n`);

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "O que você gostaria de fazer?",
        choices: [
          "1. Listar todos os produtos",
          "2. Adicionar produto",
          "3. Atualizar produto",
          "4. Excluir produto",
          "5. Pesquisar produto",
          "6. Sair",
        ],
      },
    ]);

    switch (answer.action) {
      case "1. Listar todos os produtos":
        displayProducts(products);
        await waitKeyPress();
        break;

      case "2. Adicionar produto":
        await handleAddProduct();
        await waitKeyPress();
        break;

      case "3. Atualizar produto":
        await handleUpdateProduct();
        await waitKeyPress();
        break;

      case "4. Excluir produto":
        await handleDeleteProduct();
        await waitKeyPress();
        break;

      case "5. Pesquisar produto":
        await handleSearchProduct();
        await waitKeyPress();
        break;

      case "6. Sair":
        console.log("Até mais! 👋");
        exit = true;
        break;
    }
  }
}

// --- Funções auxiliares ---

function displayProducts(list) {
  if (list.length === 0) {
    console.log("⚠️  Nenhum produto encontrado.");
  } else {
    console.table(list);
  }
}

async function waitKeyPress() {
  await inquirer.prompt([
    {
      type: "input",
      name: "continue",
      message: "Pressione ENTER para continuar...",
    },
  ]);
}

async function handleAddProduct() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Nome do produto:",
      validate: (input) => (input ? true : "É necessario digitar um nome!"),
    },
    {
      type: "list",
      name: "category",
      message: "Categoria:",
      choices: [
        "Eletrônicos",
        "Periféricos",
        "Acessórios",
        "Escritório",
        "Outros",
      ],
    },
    {
      type: "number",
      name: "quantity",
      message: "Quantidade:",
      validate: (input) => (!isNaN(input) ? true : "Deve ser um número"),
    },
    {
      type: "number",
      name: "price",
      message: "Preço:",
      validate: (input) => (!isNaN(input) ? true : "Deve ser um número"),
    },
  ]);

  // lógica importada do service.js
  addProduct(products, answers);
}

async function handleUpdateProduct() {
  const { id } = await inquirer.prompt([
    {
      type: "number",
      name: "id",
      message: "Digite o ID do produto para atualizar:",
    },
  ]);

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    console.log("❌ Prduto não encontrado!");
    return;
  }

  const current = products[productIndex];
  console.log(
    `\nEditando: ${current.name} (Deixe vazio para manter o mesmo valor)\n`
  );

  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: `Nome (${current.name}):` },
    {
      type: "list",
      name: "category",
      message: `Categoria (${current.category}):`,
      choices: [
        "Eletrônicos",
        "Periféricos",
        "Acessórios",
        "Escritório",
        "Outros",
        "Manter atual",
      ],
    },
    {
      type: "input",
      name: "quantity",
      message: `Quantidade (${current.quantity}):`,
    },
    { type: "input", name: "price", message: `Preço (${current.price}):` },
  ]);

  // logica de atualização
  if (answers.name) products[productIndex].name = answers.name;
  if (answers.category !== "Manter atual")
    products[productIndex].category = answers.category;
  if (answers.quantity)
    products[productIndex].quantity = parseInt(answers.quantity);
  if (answers.price) products[productIndex].price = parseFloat(answers.price);

  saveProducts(products);
  console.log("✅ Produto atualizado!");
}

async function handleDeleteProduct() {
  const { id } = await inquirer.prompt([
    { type: "number", name: "id", message: "Digite o ID para excluir:" },
  ]);

  const exists = products.find((p) => p.id === id);
  if (!exists) {
    console.log("❌ Produto não encontrado.");
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Tem certeza que deseja excluir o item "${exists.name}"?`,
      default: false,
    },
  ]);

  if (confirm) {
    products = products.filter((p) => p.id !== id);
    saveProducts(products);
    console.log("🗑️  Produto excluído.");
  } else {
    console.log("Cancelado.");
  }
}

async function handleSearchProduct() {
  const { term } = await inquirer.prompt([
    {
      type: "input",
      name: "term",
      message: "Digite o nome ou o ID do item para procurar:",
    },
  ]);

  const searchResults = products.filter(
    (p) => p.name.toLowerCase().includes(term.toLowerCase()) || p.id == term
  );

  console.log(`\n🔎 Found ${searchResults.length} resultados:`);
  displayProducts(searchResults);
}

// Começa o programa
mainMenu();
