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
import { toast } from "sonner";

interface UpdateFriendDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedData: { friendLevel: number; fatLevel: number }) => void;
  friend: Friend;
}

export function UpdateFriendDialog({
  open,
  onClose,
  onSubmit,
  friend,
}: UpdateFriendDialogProps) {
  const [friendLevel, setFriendLevel] = useState(friend.friendLevel.toString());
  const [fatLevel, setFatLevel] = useState(friend.fatLevel.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regex = /^[0-9]+$/;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (regex.test(value) || value === "") {
      setter(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedFriendLevel = parseInt(friendLevel, 10);
    const updatedFatLevel = parseInt(fatLevel, 10);

    if (
      updatedFriendLevel < 1 ||
      updatedFriendLevel > 10 ||
      updatedFatLevel < 1 ||
      updatedFatLevel > 10
    ) {
      toast.error("Friend Level and Fat Level must be between 1 and 10");
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit({ friendLevel: updatedFriendLevel, fatLevel: updatedFatLevel });

      toast.success("Friend updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Error updating friend!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button>Edit Friend</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Friend: {friend.name}</DialogTitle>
          <DialogDescription>Update the friend details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="friendLevel">Friend Level</Label>
            <div className="col-span-3">
              <Input
                id="friendLevel"
                name="friendLevel"
                type="text"
                value={friendLevel}
                onChange={(e) => handleInputChange(e, setFriendLevel)}
                min={1}
                max={10}
                required
                className="border rounded-md p-2 w-full appearance-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-6 items-center text-right gap-3">
            <Label htmlFor="fatLevel">Fat Level</Label>
            <div className="col-span-3">
              <Input
                id="fatLevel"
                name="fatLevel"
                type="text"
                value={fatLevel}
                onChange={(e) => handleInputChange(e, setFatLevel)}
                min={1}
                max={10}
                required
                className="border rounded-md p-2 w-full appearance-none"
              />
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
