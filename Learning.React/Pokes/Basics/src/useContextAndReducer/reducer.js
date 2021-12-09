const generateNewId = users => Math.max(...users.map(u => u.id)) + 1

const todoReducer = (state, action) =>
{
    switch (action.type)
    {
        case 'ADD_USER' : return [...state, { id : generateNewId(state), name : action.payload }];
        case 'DELETE_USER' : return state.filter(u => u.id !== action.payload);
        default : return state;
    }
}

export default todoReducer