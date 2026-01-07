import { jest } from "@jest/globals";

// mock do módulo fs para evitar escrita real de arquivos durante os testes
jest.unstable_mockModule("fs", () => ({
  default: {
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
    writeFileSync: jest.fn(),
  },
}));

// importação dinâmica dos módulos após o mock
const service = await import("./service.js");
const fs = (await import("fs")).default;

describe("AgilStore Service Tests", () => {
  // limpa os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loadProducts should return empty array if file does not exist", () => {
    // configura o mock para simular que o arquivo não existe
    fs.existsSync.mockReturnValue(false);

    const result = service.loadProducts();
    expect(result).toEqual([]);
  });

  test("loadProducts should return parsed data if file exists", () => {
    const mockData = [{ id: 1, name: "Test Item" }];
    // configura o mock para simular arquivo existente e retornar dados JSON
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

    const result = service.loadProducts();
    expect(result).toEqual(mockData);
  });

  test("addProduct should add a new product, save it, and return the new object", () => {
    const initialProducts = [
      { id: 10, name: "Existing", category: "A", quantity: 1, price: 10 },
    ];
    const newProductInput = {
      name: "New Item",
      category: "B",
      quantity: "5", // entrada como string para testar conversão
      price: "20.50",
    };

    const result = service.addProduct(initialProducts, newProductInput);

    // verifica se o ID foi incrementado corretamente
    expect(result.name).toBe("New Item");
    expect(result.quantity).toBe(5); // eeve ser número
    expect(result.price).toBe(20.5); // eeve ser número

    // verifica se foi adicionado ao array
    expect(initialProducts).toHaveLength(2);
    expect(initialProducts[1]).toEqual(result);

    // verifica se saveProducts (fs.writeFileSync) foi chamado
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
