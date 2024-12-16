import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// Definindo a interface de tipos para as propriedades do CustomCard
interface CustomCardProps {
  /**
   * Título que será exibido no topo do cartão.
   * Tipo: string (obrigatório)
   */
  title: string;

  /**
   * Descrição opcional que será exibida abaixo do título.
   * Tipo: string (opcional)
   */
  description?: string;

  /**
   * Conteúdo que será exibido dentro do corpo do cartão.
   * Tipo: React.ReactNode (obrigatório)
   */
  children: React.ReactNode;
}

// Componente CustomCard que utiliza o Card, CardHeader, CardTitle e outros componentes internos
function CustomCard({ title, description, children }: CustomCardProps) {
  return (
    // Componente Card que encapsula todo o cartão
    <Card className="w-full max-w-sm">
      {/* CardHeader contém o título e a descrição do cartão */}
      <CardHeader>
        {/* Título do cartão */}
        <CardTitle>{title}</CardTitle>
        
        {/* Descrição do cartão, caso fornecida */}
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* CardContent exibe o conteúdo que é passado como children */}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default CustomCard;
