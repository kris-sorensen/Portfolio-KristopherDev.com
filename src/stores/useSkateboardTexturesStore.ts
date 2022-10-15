import create from 'zustand';

interface Params {
    griptapeUrls: string[];
    displacementScale: number;
}


const useSkateboardTexturesStore = create<Params>((set) => ({
    griptapeUrls: ['/skatepark/skateboard/griptape/Griptape_basecolor.jpg'],
    displacementScale: .01,
}));

export default useSkateboardTexturesStore;