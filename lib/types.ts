export type MachineType = {
  name: string;
  type: string;
  model: string;
  manufactureDate: string;
  serialNumber: string;
  location: string;
  imagesUrl: string[];
};

export type MaintenanceType = {
  code: string;
  title: string;
  description: string;
  status: string;
  type: "preventiva" | "corretiva" | "preditiva";
  requisitionDate: string;
  priority: string;
  responsableTeam: string
};

export type InventoryItemType = {
  id: string;
  name: string;
  type: "ferramenta" | "peça";
  quantity: number;
  location: string;
  supplier: string;
  acquisitionDate: string;
  status: "disponível" | "em uso" | "em manutenção";
};