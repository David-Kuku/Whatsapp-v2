const getRecipientEmail =(users, userLoggedIn) => {
    return users?.filter((userTofilter) => userTofilter !== userLoggedIn?.email)[0]
}

export default getRecipientEmail