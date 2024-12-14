import { useEffect, useState } from "react";
import { FriendsTable } from "./components/FriendsTable";
import useFriends from "./hooks/useFriends";
import { FriendsDialog } from "./components/CreateFriendDialog";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import SearchInput from "./components/SearchInput";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const {
    friends,
    error,
    fetchFriends,
    addFriend,
    deleteFriend,
    updateFriend,
  } = useFriends();
  const [filteredFriends, setFilteredFriends] = useState(friends);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter((friend) => {
        const matchesName = friend.name.toLowerCase().includes(query);
        const matchesId = String(friend.id).includes(query);
        return matchesName || matchesId;
      });
      setFilteredFriends(filtered);
    }
  };

  const handleAddFriend = async (newFriend: {
    name: string;
    friendLevel: number;
    fatLevel: number;
  }) => {
    try {
      await addFriend(newFriend);
      toast.success("Friend added successfully!");
    } catch {
      toast.error("Error adding friend!");
    }
  };

  const handleDeleteFriend = async (id: number) => {
    try {
      await deleteFriend(id);
      toast.success("Friend deleted successfully!");
    } catch {
      toast.error("Error deleting friend!");
    }
  };

  const handleEditFriend = async (
    id: number,
    updatedData: { friendLevel: number; fatLevel: number }
  ) => {
    try {
      await updateFriend(id, updatedData);
      toast.success("Friend updated successfully!");
    } catch {
      toast.error("Error updating friend!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Toaster />

      <ThemeToggle />

      <h1 className="text-3xl font-bold">Friends</h1>

      <div className="flex items-center justify-between space-x-4">
        <SearchInput onSearch={handleSearch} />

        <FriendsDialog
          onSubmit={handleAddFriend}
          dialogTitle="Add New Friend"
          dialogDescription="Fill in the details to add a new friend."
          triggerText="Add Friend"
          triggerIcon={<PlusCircle />}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <FriendsTable
        friends={filteredFriends}
        onDelete={handleDeleteFriend}
        onEdit={handleEditFriend}
      />
    </div>
  );
}

export default App;
