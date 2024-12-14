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

      // Normaliza o texto da pesquisa e passa para o componente pai
      const normalizedQuery = input.replace(/\s+/g, " ").trim().toLowerCase();
      onSearch(normalizedQuery);
    }
  };

  const handleSearch = () => {
    // Normaliza a consulta, removendo espaços extras
    const normalizedQuery = searchQuery
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    onSearch(normalizedQuery);
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
        className="p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:bg-primary-dark transition-transform duration-200 hover:scale-110"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchInput;
