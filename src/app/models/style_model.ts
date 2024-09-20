export interface Styles {
    styles: StylesClass;
}

export interface StylesClass {
    style: Style[];
}

export interface Style {
    name: string;
    href: string;
}


/*export class Layer{
    name:String = ""; 
    visible:Boolean = true;
    opacity:Number = 20;
    depth: Number = 0;

}*/