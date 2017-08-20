import * as D from '../../definitions'
import * as Redux from 'redux'

const initialState: D.ProductsState  = {
    available: [{
        name: "string",
        price: "string",
        img: "string",
        description: "string",
        owner: {
            username: "string",
            objectId: "string"
        },
        buyer: {
            username: "string",
            objectId: "string"
        },
        objectId: "string"
    }],
    owned: [],
    bought: [],
    imageUrl: []
}

const productReducer: Redux.Reducer<D.ProductsState> = (state: D.ProductsState, action: Redux.Action): D.ProductsState => {
    state = state || initialState
    return state
}

export default productReducer