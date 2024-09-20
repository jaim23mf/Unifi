import { Style } from "./style_model";

export interface Layers {
    layers: LayersClass;
}

export interface LayersClass {
    layer: Layer[];
}

export class Layer {
    name: string;
    workspace:string;
    href: string;
    visible:boolean;
}

export class LayerJson{
    name:string;
    title:string;
    description:string;
    workspace:string;
    styles:Style[];
    store:string;
}