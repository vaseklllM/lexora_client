import { create } from "zustand";

interface State {
  data: any;
}

interface Actions {
  setData: (data: any) => void;
}

type Store = State & Actions;

export async function getPosts() {
  const data = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME`,
    { cache: "force-cache" },
  );
  return await data.json();
}

export class DataLoader {
  private _store = create<Store>((set) => ({
    data: undefined,
    setData: (data) => set((state) => ({ ...state, data })),
  }));

  constructor() {}

  public async fetch() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}blog`, {
      cache: "force-cache",
    });
    const posts: any[] = await data.json();

    this._store.getState().setData(posts);
  }

  public useData() {
    return this._store();
  }
}
