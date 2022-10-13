import create from 'zustand';

interface Params {
    wheels: string,
    boardColor: string,
}


const useStore = create<Params>((set) => ({
    wheels: '#ffffff',
    boardColor: '#ff0000'
}));

export default useStore;