import { useRouter } from 'next/router'
import React from "react"

const users = [
    { id: 1, email: "email1@mail.com", lastName: 'Snow', name: 'Jon', role: "manager" },
    { id: 2, email: "email2@mail.com", lastName: 'Lannister', name: 'Cersei', role: "user" },
    { id: 3, email: "email3@mail.com", lastName: 'Lannister', name: 'Jaime', role: "user" },
    { id: 4, email: "email4@mail.com", lastName: 'Stark', name: 'Arya', role: "user" },
    { id: 5, email: "email5@mail.com", lastName: 'Targaryen', name: 'Daenerys', role: "user" },
    { id: 6, email: "email6@mail.com", lastName: 'Melisandre', name: null, role: "user" },
    { id: 7, email: "email7@mail.com", lastName: 'Clifford', name: 'Ferrara', role: "user" },
    { id: 8, email: "email8@mail.com", lastName: 'Frances', name: 'Rossini', role: "user" },
    { id: 9, email: "email9@mail.com", lastName: 'Roxie', name: 'Harvey', role: "user" },
];

const UserDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [currentUser, setCurrentUser] = React.useState(null)

    React.useEffect(() => {
        let user = users.find(user =>  user.id === parseInt(id as string))
        if(user) setCurrentUser(user)
        else setCurrentUser(null)
    }, [])

    return (
        <>
            <h1>User Detail: {id}</h1>
            <p>{currentUser && currentUser.email}</p>
        </>    
    )
}

export default UserDetail;