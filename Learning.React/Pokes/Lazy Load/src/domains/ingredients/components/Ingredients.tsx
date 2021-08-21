import {selectIngredients} from "../ingredients.selectors";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {ingredientsReducer} from "../ingredients.reducer";
import {useLazyReducer} from "../../../shared/hooks/useLazyReducer";

const Ingredients : FC = () =>
{
    const ingredients = useSelector(selectIngredients)
    const ingredientsReducerInjected = useLazyReducer('ingredients', ingredientsReducer)

    console.log(ingredientsReducerInjected, ingredients)

    return ingredientsReducerInjected ? <>
        {JSON.stringify(ingredients)}
    </> : null
}

export default Ingredients