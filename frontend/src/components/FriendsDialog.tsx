import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Friend } from "../api/Friend";
import { toast } from "sonner"; // Importando o toast

// Criar um tipo para dados de entrada (sem id e created_at)
type NewFriend = Omit<Friend, "id" | "created_at">;

interface FriendsDialogProps {
  onSubmit: (friend: NewFriend) => void;
  dialogTitle: string;
  dialogDescription: string;
  triggerText: string;
  triggerIcon: JSX.Element;
}

export function FriendsDialog({
  onSubmit,
  dialogTitle,
  dialogDescription,
  triggerText,
  triggerIcon,
}: FriendsDialogProps) {
  const [errors, _setErrors] = useState({
    name: "",
    friendLevel: "",
    fatLevel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usando o estado `open` para controlar o modal
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = (formData.get("name") as string).trim();
    const friendLevel = parseInt(formData.get("friendLevel") as string, 10);
    const fatLevel = parseInt(formData.get("fatLevel") as string, 10);

    // Validações para o campo "Friend Name"
    if (name.length < 4) {
      toast.error("Friend Name must have at least 4 characters.");
      return;
    }

    if (name.length > 20) {
      toast.error("Friend Name must have no more than 20 characters.");
      return;
    }

    const regex = /^[A-Za-zÀ-ú ]+$/;
    if (!regex.test(name)) {
      toast.error("Friend Name can only contain letters and spaces");
      return;
    }

    setIsSubmitting(true);

    try {
      const newFriend: NewFriend = { name, friendLevel, fatLevel };
      await onSubmit(newFriend);

      setOpen(false);
      toast.success("Friend added successfully!");
    } catch (err) {
      toast.error("Error adding friend!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {triggerIcon} {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="name">Friend Name</Label>
            <div className="col-span-3">
              <Input id="name" name="name" required autoComplete="off" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="friendLevel">Friend Level</Label>
            <div className="col-span-3">
              <Input
                id="friendLevel"
                name="friendLevel"
                type="number"
                autoComplete="off"
                min={1}
                max={10}
                required
              />
              {errors.friendLevel && (
                <p className="text-red-500 text-sm">{errors.friendLevel}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="fatLevel">Fat Level</Label>
            <div className="col-span-3">
              <Input
                id="fatLevel"
                name="fatLevel"
                type="number"
                autoComplete="off"
                min={1}
                max={10}
                required
              />
              {errors.fatLevel && (
                <p className="text-red-500 text-sm">{errors.fatLevel}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}