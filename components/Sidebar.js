import { Avatar, IconButton, Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useCollectionOnce, useCollectionData } from 'react-firebase-hooks/firestore'
import Chat from './Chat';

function Sidebar() {

    //tutorial practice
    const [user] = useAuthState(auth)
    // console.log(user)
    //     const a =db.collection('chats').where('users', 'array-contains', user.email)
    //     console.log(a)
    //a?.then(snapshot => {console.log(snapshot.docs)})
    //tutorial practice

    // auth.getRedirectResult().then((result)=>{
    //     console.log(result)
    // })
    //console.log(auth.currentUser.providerData)
    //console.log(user)

    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt(
            'Please enter the email address for the user you want to chat with')
        if (!input) {
            return null
        };
        if(!EmailValidator.validate(input)){
            alert("invalid email")
        }
        if(
            EmailValidator.validate(input) && 
            input !== user.email &&
            !chatAlreadyExists(input)
            ){
            
            // we need to add the chat into the DB chats collection
            db.collection('chats').add({
                users:[user.email, input],

            })
        }
        if(chatAlreadyExists(input)){
            alert("Email already exists")
        }
    }

    const chatAlreadyExists = (recepientEmail)=>{
    //console.log()
        return (!!chatsSnapshot?.docs.find(
            (chat) => 
            //console.log(chat.data().users)
             chat.data().users.find((user) =>user === recepientEmail)?.length > 0
            )
        )
        }
        console.log(chatsSnapshot?.docs)
    //console.log(chatAlreadyExists)
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick = {()=>auth.signOut()}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput
                    placeholder="Search in chats" />
            </Search>
            <SidebarButton
                onClick={createChat}>
                Start a new chat
            </SidebarButton>

            {/*list of chats*/}
            {chatsSnapshot?.docs.map((chat)=>{
                return <Chat key = {chat.id} id = {chat.id} users = {chat.data().users}/>
            })}
            
            
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height:100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;

::-webkit-scrollbar{
    display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color:white;
  z-index: 1;
  justify-content:space-between;
  align-items:center;
  padding: 15px;
  height:80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover{
      opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  
  `;
const SearchInput = styled.input`
  outline-width: none;
  flex: 1;
  border: none;
`

const SidebarButton = styled(Button)`
  width:100%;

  &&&{
      border-top: 1px solid whitesmoke;
      border-bottom: 1px solid whitesmoke;
  }
`