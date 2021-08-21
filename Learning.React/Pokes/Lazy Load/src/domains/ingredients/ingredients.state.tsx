import {Ingredient} from "./ingredients.model";

export interface IngredientsState
{
    ingredients : Ingredient[]
}

export const initialIngredienState = {
    ingredients : [
        { id : '1', title : 'Sel', unity : 'gr', userId : '1'  },
        { id : '1', title : 'Poivre', unity : 'gr', userId : '1'  },
    ]
}