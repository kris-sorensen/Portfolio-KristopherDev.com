import create from 'zustand'

const useStore = create((set) => ({
    top: 0,
    setTop: (value) => set(() => ({ top: value }))
}))

export default useStore