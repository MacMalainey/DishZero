import React, {useContext, useEffect} from 'react';
import {
    Stage,
    Layer,
    Rect,
} from 'react-konva';

import { GoogleAuth, FirebaseAuth, FirebaseContext } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import DishAPI from "../features/api";

const useQuery = () => new URLSearchParams(useLocation().search);

function Login() {
    const fbContext = useContext(FirebaseContext);
    const navigate = useNavigate();
    // const {transaction_id} = useParams();
    const query = useQuery();
    const transaction_id = query.get("transaction_id");
    useEffect(() => {
        if (fbContext?.user) {
            console.log(transaction_id)
            if(transaction_id){
                DishAPI.updateDocWithUserID(transaction_id, fbContext?.user?.uid);  
                //send a firebase request to add the user to the document with the handle
                
            }
            navigate("/home");
        }
    }, [fbContext?.user]);

    if (fbContext?.user) {
        return (<div/>)
    }

    // fired on button click while the user is not signed in.
    // the userEmail state is set (or "dispatched") after getting it from "credentials".
    const handleSignIn = () => {
        signInWithPopup(FirebaseAuth, GoogleAuth)
            .then((credentials) => {
                if (!credentials.user.email?.match('@ualberta.ca')) {
                    credentials.user?.delete();
                    alert('Please login with your University of Alberta CCID')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <div
            className='App'
            id='outer-container'
            style={{
            paddingBottom: 50,
            paddingTop: 10,
            textAlign: "center"
        }}>
            <img
                width={100}
                height={100}
                src="https://image.shutterstock.com/image-vector/plate-vector-illustrationisolated-on-white-260nw-1815162875.jpg"></img>
            <h1 style={{
                fontWeight: "bolder"
            }}>
                DishZero
            </h1>
            <h3 >
                Helping the planet one dish<br></br>
                at a time
            </h3>
            <Stage width={window.innerWidth} height={200}>
                <Layer>
                    <Rect x={125} y={0} width={150} height={150} fill="#D6D6D6"/>
                </Layer>
            </Stage>
            <br></br>
            <button onClick={handleSignIn}>Login with Google</button>
        </div>
    );
}
export default Login;