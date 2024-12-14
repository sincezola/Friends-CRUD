import { useState, useCallback } from "react";
import { Friend } from "../api/Friend";
import {
  createFriend,
  getFriends,
  deleteFriend,
  updateFriend,
} from "@/api/friends";

export default function useFriends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const fetchFriends = useCallback(async () => {
    setError(null);
    try {
      const data = await getFriends();
      setFriends(data);
    } catch (err) {
      setError("Failed to fetch friends");
    }
  }, []);

  const addFriend = async (newFriend: Omit<Friend, "id" | "created_at">) => {
    setError(null);
    try {
      await createFriend(newFriend);
      await fetchFriends();
    } catch (err) {
      setError("Failed to add friend");
    }
  };

  const handleDeleteFriend = async (id: number) => {
    setError(null);
    try {
      await deleteFriend(id);
      await fetchFriends();
    } catch (err) {
      setError("Failed to delete friend");
    }
  };

  const handleUpdateFriend = async (
    id: number,
    updatedFriend: Partial<Omit<Friend, "id" | "created_at">>
  ) => {
    setError(null);
    try {
      await updateFriend(id, updatedFriend);
      await fetchFriends();
    } catch (err) {
      setError("Failed to update friend");
    }
  };

  const openModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFriend(null);
    setIsModalOpen(false);
  };

  return {
    friends,
    error,
    isModalOpen,
    selectedFriend,
    fetchFriends,
    addFriend,
    deleteFriend: handleDeleteFriend,
    updateFriend: handleUpdateFriend,
    openModal,
    closeModal,
  };
}
