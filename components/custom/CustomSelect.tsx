import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"; 
interface CustomSelectProps {
  /**
   * Um array de strings que define as opções do select.
   * Tipo: string[] (obrigatório)
   */
  options: string[];
}

export function CustomSelect({ options }: CustomSelectProps) {
  // Obtém as margens seguras da tela, adaptando o conteúdo à área visível na tela
  const insets = useSafeAreaInsets();

  // Ajusta as margens do conteúdo, aplicando as margens seguras da parte superior e inferior
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12, // margem de 12px para a esquerda
    right: 12, // margem de 12px para a direita
  };

  return (
    // Componente Select é o container principal para o dropdown
    <Select
      defaultValue={{ value: options[0].replace(/\s+/g, '').toLowerCase(), label: options[0] }}
    >
      {/* SelectTrigger define o botão de acionamento do dropdown */}
      <SelectTrigger className="w-[250px]">
        {/* SelectValue exibe o valor selecionado ou o placeholder */}
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder="Select a fruit" // Placeholder exibido caso nenhum valor tenha sido selecionado
        />
      </SelectTrigger>

      {/* SelectContent define a área de conteúdo do dropdown */}
      <SelectContent insets={contentInsets} className="w-[250px]">
        <SelectGroup>
          {/* Mapeia as opções fornecidas e renderiza um SelectItem para cada uma */}
          {options.map((item, index) => (
            <SelectItem key={index} label={item} value={item.replace(/\s+/g, '').toLowerCase()}>
              {/* O valor do SelectItem é o item da lista, com espaços removidos e convertido para minúsculas */}
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
