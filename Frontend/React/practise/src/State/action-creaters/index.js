const Increment=(count)=>{
    return (dispatch)=>{
        dispatch({
            type:'Increment',
            payload:count
        })
    }
}
const Decrement=(count)=>{
    return (dispatch)=>{
        dispatch({
            type:'Decrement',
            payload:count
        })
    }
}