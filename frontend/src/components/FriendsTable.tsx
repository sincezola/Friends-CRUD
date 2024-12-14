import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "./ui/table";
import { Pen, Trash } from "lucide-react";
import { format } from "date-fns";
import { Friend } from "../api/Friend";
import { UpdateFriendDialog } from "./UpdateFriendDialog"; // Importando o modal

interface FriendsTableProps {
  friends: Friend[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: { friendLevel: number; fatLevel: number }) => void; // Função de edição
}

export function FriendsTable({
  friends = [],
  onDelete,
  onEdit,
}: FriendsTableProps) {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleOpenEditModal = (friend: Friend) => {
    setSelectedFriend(friend); // Define o amigo selecionado para abrir o modal
  };

  const handleCloseEditModal = () => {
    setSelectedFriend(null); // Limpa o estado para fechar o modal
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Friend Level</TableHead>
            <TableHead>Fat Level</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell>{friend.id}</TableCell>
                <TableCell>{friend.name}</TableCell>
                <TableCell>{friend.friendLevel}</TableCell>
                <TableCell>{friend.fatLevel}</TableCell>
                <TableCell>
                  {format(new Date(friend.created_at), "MMM dd, yyyy hh:mm a")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDelete(friend.id)}
                      className="p-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition-transform duration-200 hover:scale-110"
                      aria-label={`Delete friend ${friend.name}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(friend)}
                      className="p-2 bg-yellow-500 text-white rounded-md flex items-center justify-center hover:bg-yellow-600 transition-transform duration-200 hover:scale-110"
                      aria-label={`Edit friend ${friend.name}`}
                    >
                      <Pen className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No friends found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal para editar */}
      {selectedFriend && (
        <UpdateFriendDialog
          onSubmit={(updatedData) => {
            onEdit(selectedFriend.id, updatedData); // Chama a função de edição
            handleCloseEditModal(); // Fecha o modal após a edição
          }}
          dialogTitle="Edit Friend"
          dialogDescription={`Editing details for ${selectedFriend.name}`}
          open={!!selectedFriend} // Controla se o modal está aberto
          onClose={handleCloseEditModal} // Fecha o modal
          selectedFriend={selectedFriend}
        />
      )}
    </>
  );
}
