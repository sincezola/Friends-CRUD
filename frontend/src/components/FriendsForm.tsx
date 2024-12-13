import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface FriendsFormProps {
  onSubmit: (data: Friend) => void;
}

interface Friend {
  name: string;
  friendLevel: number;
  fatLevel: number;
}

export function FriendsForm({ onSubmit }: FriendsFormProps) {
  const [formData, setFormData] = useState<Friend>({
    name: "",
    friendLevel: 0,
    fatLevel: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "friendLevel" || name === "fatLevel" ? +value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Chama onSubmit e passa os dados do formulário
    setFormData({ name: "", friendLevel: 0, fatLevel: 0 }); // Limpa o formulário após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-6 items-center gap-3">
        <Label htmlFor="name" className="col-span-2 text-right">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="col-span-4"
          placeholder="Friend's name"
          required
        />
      </div>

      <div className="grid grid-cols-6 items-center gap-3">
        <Label htmlFor="friendLevel" className="col-span-2 text-right">
          Friend Level
        </Label>
        <Input
          id="friendLevel"
          name="friendLevel"
          value={formData.friendLevel}
          onChange={handleChange}
          type="number"
          className="col-span-4"
          placeholder="Friend level"
          required
        />
      </div>

      <div className="grid grid-cols-6 items-center gap-3">
        <Label htmlFor="fatLevel" className="col-span-2 text-right">
          Fat Level
        </Label>
        <Input
          id="fatLevel"
          name="fatLevel"
          value={formData.fatLevel}
          onChange={handleChange}
          type="number"
          className="col-span-4"
          placeholder="Fat level"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
