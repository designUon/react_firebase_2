import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../database/firebase';

export default function BoardPage() {

    const [board, setBoard] = useState();

    // 주소창의 params 값 가져옴
    const params = useParams();

    // 주소창에서 가져온 params.id를 이용해서 firebase의 문서를 가져옴
    // 화면이 보이자마자 들고옴
    useEffect(()=>{
        // firebase 문서 가져오기
        // https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0#get_a_document
        // const docSnap = await getDoc(doc(db, "boards", params.id))
        // => 비동기함수로 만들기 위해 getBoard 안으로 이동
        // getDoc으로 가져오려면 id이 있어야함


        const getBoard = async() => {
            // firestore에서 저장된 갑승ㄹ 가져옴
            const docSnap = await getDoc(doc(db, "boards", params.id));
            // state에서 화면 출력
            setBoard({
                ...docSnap.data()
            })
        }

        getBoard();

    }, [])

    return (
        <div>
            {
                // 처음에 값이 비어있을 경우는 항상 &&를 통해서 값이 있을때만 보이게하기
                board &&
                <div>
                    <p>{params.id}</p>
                    <h3>{board.title}</h3>
                    <p>{board.email} / {board.writeTime.toDate().getHoures()} : 00분</p>
                    <hr />
                    <p>{board.content}</p>
                </div>
            }
        </div>
    )
}
