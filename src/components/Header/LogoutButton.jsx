import authService from '../../auth/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authslice'

function LogoutButton() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.userLogout()
            .then(() => {
                dispatch(logout());
            }).catch(error => console.log("Logout Error", error))
    }
    return (
        <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
    )
}

export default LogoutButton