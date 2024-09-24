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
  options: string[];
}

export function CustomSelect({ options }: CustomSelectProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Select
      defaultValue={{ value: options[0].replace(/\s+/g, '').toLowerCase(), label: options[0] }}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder="Select a fruit"
        />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-[250px]">
        <SelectGroup>
          {options.map((item, index) => (
            <SelectItem key={index} label={item} value={item.replace(/\s+/g, '').toLowerCase()}>
            {item}
          </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
