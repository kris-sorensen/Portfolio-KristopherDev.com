import create from 'zustand';



const useSkateboardStore = create((set) => ({
    selectedColor: '#00ffff',
    selectedPart: 'Deck',
    selectedTexture: 'checkered',
    updatePart: (part) => set((state) => ({ selectedPart: part })),
    updateColor: (color) => set((state) => ({ selectedColor: color })),
    updateTexture: (texture) => set((state) => ({ selectedTexture: texture })),
}));



export default useSkateboardStore;