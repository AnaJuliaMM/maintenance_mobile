export type itemType = {
    id: number;
    name: string;
    description: string;
    type: string;
    acquisitionDate: string;
    supplier: string;
    quantity: number;
    status: "Disponível" | "Indisponível";
  };