const whiskeyReducer = (state = [], action) => {
    if (action.type === 'SET_WHISKEY'){
        return action.payload;
    }
    return state; 
}

export default whiskeyReducer; 