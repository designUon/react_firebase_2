import React, { useState } from 'react'
//초기화해준 db 들고오기
import { db } from '../database/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function BookComp() {

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");


    // 책 추가 메소드
    // const addBook = (e) => {
    // 아래 await 를 사용하기위해 async 추가
    const addBook = async(e) => {

        e.preventDefault();

        // 데이터 추가에서 가져온 내용
        // https://firebase.google.com/docs/firestore/quickstart?hl=ko&authuser=0#add_data
        
        // try하는 중에 오류가 생기면 catch값이 출력
        // addDoc과 연결된 모든 내용은 try안에 입력
        try {
            // try안에 작성되는 내용은 서버와 연결되고,
            // 서버에서 받아온 값을 활용하는 내용
            // const docRef = await addDoc(collection(db, "users"), {
            const docRef = await addDoc(collection(db, "readingbooks"), { // "readingbooks" Cloud Firestore의 생성될 컬렉션명
                // first: "Ada",
                // last: "Lovelace",
                // born: 1815
                done : false, // 고정값
                memo : "", // 고정값
                // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0#data_types
                // API참조 => 웹
                // https://firebase.google.com/docs/reference/js/firestore_.timestamp?hl=ko&authuser=0
                // 클릭한 당시의 날짜값 가져오기 가능
                startDate : Timestamp.fromDate(new Date()), // Timestamp
                title : title, // 입력받아오는 값
                writer : writer, // 입력받아오는 값
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            // 어떤 오류가 발생했는지, 발생했다면 어떻게 처리할지 작성
            console.error("Error adding document: ", e);
        }

        // try catch 상관없이 실행될 내용
        setTitle("");
        setWriter("");
        // value={title},value={writer} 각각의 value 값으로 넣어주기
    }

    return (
        <div>
            <h3>Reading Books Collection</h3>
            <h3>책 추가</h3>
            <form onSubmit={addBook}>
                <label htmlFor="">도서명</label>
                <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/> <br />
                <label htmlFor="">작가명</label>
                <input type="text" value={writer} onChange={(e)=>{setWriter(e.target.value)}}/> <br />
                <button type='submit'>추가</button>
            </form>
            <hr />
            <form action="">
                <input type="text" />
                <button type='submit'>읽은 책 검색하기</button>
            </form>
            <hr />
            <h3>추가한 날짜 책 제목</h3>
            <p>메모없음 또는 메모</p>
            <hr />
            <h4>추가 날짜 ~ 읽는중 / 느낀점 날짜 책 제목</h4>
            <p>메모</p>
            <button>감상문 적기</button>
            <button>X</button>
        </div>
    )
}
