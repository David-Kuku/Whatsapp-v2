import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase'


function Login() {
    const signin =()=>{
        //auth.signInWithRedirect(provider).catch(alert)
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>
                    Login
                </title>

            </Head>
            <LoginContainer>
                <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <Button
                onClick={signin}
                variant = "outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
display:grid;
place-items: center;
height:100vh;
background-color:whitesmoke;
`
const LoginContainer = styled.div`
display: flex;
flex-direction: column;
background-color:white;
align-items: center;
border-radius: 5px;
padding: 20px ;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7)
`
const Logo = styled.img`
height: 150px;
width: 150px;
margin-bottom: 30px;
`