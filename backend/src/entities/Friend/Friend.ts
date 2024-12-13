export interface friendData {
  id?: number;
  name: string;
  friendLevel: number;
  fatLevel: number;
  created_at?: Date;
}

export class Friend {
  constructor(private data: friendData) {}

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get friendLevel() {
    return this.data.friendLevel;
  }

  get fatLevel() {
    return this.data.fatLevel;
  }

  get created_at() {
    return this.data.created_at;
  }
}
