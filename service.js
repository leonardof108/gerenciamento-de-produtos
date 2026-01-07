import fs from "fs";

const DB_FILE = "./produtos.json";

// 1. carrega produtos no inicio
export const loadProducts = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return []; // se o arquivo nao existe, retorna um array vazio
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao carregar inventário:", error.message);
    return [];
  }
};

// 2. salva os produtos
export const saveProducts = (products) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
    return true;
  } catch (error) {
    console.error("Erro ao salvar o inventário:", error.message);
    return false;
  }
};

// 3. adiciona produtos
export const addProduct = (products, productData) => {
  // gera ID randômico, se o array estiver vazio, o ID é 1, senão, último ID + 1.
  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    name: productData.name,
    category: productData.category,
    quantity: parseInt(productData.quantity),
    price: parseFloat(productData.price),
  };

  products.push(newProduct);
  saveProducts(products); // salva automaticamente
  return newProduct;
};
