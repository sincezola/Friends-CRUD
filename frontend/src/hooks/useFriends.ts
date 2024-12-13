import { useState, useCallback } from "react";
import { Friend } from "../api/Friend";
import { createFriend, getFriends, deleteFriend } from "@/api/friends";

export default function useFriends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return {
    friends,
    error,
    fetchFriends,
    addFriend,
    deleteFriend: handleDeleteFriend,
  };
}
