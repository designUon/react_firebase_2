import { Timestamp, collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../database/firebase';

export default function Board() {

    const user = useSelector((state)=>state.user)

    const [boards, setBoards] = useState();
    // firestore에서 문서 가져오기
    // https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0#get_multiple_documents_from_a_collection
    useEffect(()=>{
        const getBoards = async () => {

            // 데이터 정렬
            // https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko&authuser=0#order_and_limit_data
            const q = query(collection(db, "boards"), orderBy("writeTime", "desc"));
            // "writeTime(시간순)", "desc(내림차순)"

            const querySnapshot = await getDocs(collection(db, "boards"));
            
            // 내용을 꺼내오기위해서 빈 배열로 작성해주기
            // state 사용하지않은 값들은 업데이트시 화면에 표시가 안됨
            let dataArray = [];

            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data = {
                    id : doc.id,
                    // uid : doc.data().uid,
                    email : doc.data().email,
                    title : doc.data().title,
                    writeTime : doc.data().writeTime
                    // writeTime : Timestamp.fromDate.doc.data().writeTime
                }
                console.log(doc.id, " => ", doc.data());
            });

            // 반복이 모두 끝났을 때 출력
            setBoards(dataArray)
        }
    })

    return (
        <div>
            {/* user의 값이 있을 때만 user의 email 값 가져오기 */}
            {/* {user && user.email} */}
            <h3>게시물</h3>
            {
                // {user && }
                <Link to='/board-write-form'>글 작성하기</Link>
            }
            <ul>
                <Link>
                    <li>게시물 이름, 작성자, 시간</li>
                </Link>

                {/* setBoards(dataArray)가 출력될 공간 */}
                {
                    boards && boards.map((b)=>(
                        <Link to={`/board/${b.id}`} key={boards.id}>
                            <li>{b.title}, {b.email}, {boards.writeTime.toDate()}</li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}
