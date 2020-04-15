import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
const Logout = (props) => {
    // useEffect(() => {
    //     props.onLogout()
    // })
    // props.onLogout()
    const dispatch = useDispatch()
    dispatch(actions.logout())
    return (
        <Redirect to="/" />
    )
}


// export default connect(mapStateToProps, mapDispatchToProps)(Logout)
export default Logout
