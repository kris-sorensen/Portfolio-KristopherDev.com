import create from 'zustand';



const useSkateboardStore = create((set) => ({
    selectedColor: '#00ffff',
    selectedPart: 'Select Part',
    updatePart: (part) => set((state) => ({ selectedPart: part })),
    updateColor: (color) => set((state) => ({ selectedColor: color })),
}));



export default useSkateboardStore;