import {create} from 'zustand'

type Store = {
    loading: boolean, 
    setLoading: (value: boolean) => void,
}

export const useStore = create<Store>((set) => ({ 
    loading: false, 
    setLoading: (value: boolean) => set((state) => ({ loading: value })),
}))