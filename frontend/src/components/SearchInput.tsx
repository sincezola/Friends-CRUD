import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const regex = /^[A-Za-zÀ-ú0-9 ]*$/;
    if (regex.test(input)) {
      setSearchQuery(input);

      // Lógica para normalizar o texto da pesquisa e passar para o componente pai
      const normalizedQuery = input.replace(/\s+/g, " ").trim().toLowerCase();
      onSearch(normalizedQuery); // Passa a pesquisa normalizada para o componente pai
    }
  };

  const handleSearch = () => {
    // Normaliza a consulta, removendo espaços extras
    const normalizedQuery = searchQuery
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    onSearch(normalizedQuery); // Passa a pesquisa normalizada para o componente pai
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      <Input
        placeholder="Search by ID or Name"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-primary text-primary-foreground rounded-md flex items-center"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchInput;
