import {create} from 'zustand'

type Store = {
    loading: boolean, 
    picture: string,
    setLoading: (value: boolean) => void,
    setProfilePicture: (picture: string) => void;
}

export const useStore = create<Store>((set) => ({ 
    loading: false, 
    picture: "",
    setLoading: (value: boolean) => set((state) => ({ loading: value })),
    setProfilePicture: (picture: string) => set((state) => ({picture: picture}))
}))