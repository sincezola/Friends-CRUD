import axios from "axios";
import { Friend } from "./Friend";

const API_BASE_URL = "http://localhost:3333/sinz";

export async function getFriends(): Promise<Friend[]> {
  const response = await axios.get(`${API_BASE_URL}/friends`);
  return response.data.map((friend: { data: Friend }) => friend.data);
}

export async function createFriend(Friend: Omit<Friend, "id" | "created_at">) {
  const { name, friendLevel, fatLevel } = Friend;

  const response = await axios.post(`${API_BASE_URL}/new-friend`, {
    name,
    friendLevel,
    fatLevel,
  });
  return response.data;
}

export async function deleteFriend(id: number) {
  await axios.delete(`${API_BASE_URL}/delete-friend/${id}`);
}

export async function updateFriend(
  id: number,
  updatedFriend: Partial<Omit<Friend, "id" | "created_at">>
) {
  const response = await axios.put(
    `${API_BASE_URL}/update-friend/${id}`,
    updatedFriend
  );
  return response.data;
}
