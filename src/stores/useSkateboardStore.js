import create from 'zustand';



const useSkateboardStore = create((set) => ({
    selectedColor: '#00ffff',
    updateColor: (color) => set((state) => ({ selectedColor: color })),
}));



export default useSkateboardStore;