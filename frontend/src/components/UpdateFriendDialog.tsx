import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Friend } from "../api/Friend";

interface UpdateFriendDialogProps {
  onSubmit: (updatedData: { friendLevel: number; fatLevel: number }) => void;
  dialogTitle: string;
  dialogDescription: string;
  open: boolean; // Estado de abertura do modal
  onClose: () => void; // Função para fechar o modal
  selectedFriend: Friend; // Amigo selecionado para edição
}

export function UpdateFriendDialog({
  onSubmit,
  dialogTitle,
  dialogDescription,
  open,
  onClose,
  selectedFriend,
}: UpdateFriendDialogProps) {
  const [friendLevel, setFriendLevel] = useState<number | "">("");
  const [fatLevel, setFatLevel] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedFriend) {
      setFriendLevel(selectedFriend.friendLevel);
      setFatLevel(selectedFriend.fatLevel);
    }
  }, [selectedFriend]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (friendLevel === "" || fatLevel === "") {
      toast.error("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        friendLevel: Number(friendLevel),
        fatLevel: Number(fatLevel),
      });
      onClose(); // Fecha o modal após a submissão
      toast.success("Friend updated successfully!");
    } catch (err) {
      toast.error("Error updating friend!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="friendLevel">Friend Level</Label>
            <div className="col-span-3">
              <Input
                id="friendLevel"
                name="friendLevel"
                type="number"
                value={friendLevel}
                onChange={(e) => setFriendLevel(e.target.valueAsNumber || "")}
                autoComplete="off"
                min={1}
                max={10}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="fatLevel">Fat Level</Label>
            <div className="col-span-3">
              <Input
                id="fatLevel"
                name="fatLevel"
                type="number"
                value={fatLevel}
                onChange={(e) => setFatLevel(e.target.valueAsNumber || "")}
                autoComplete="off"
                min={1}
                max={10}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
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

export default UpdateFriendDialog;
