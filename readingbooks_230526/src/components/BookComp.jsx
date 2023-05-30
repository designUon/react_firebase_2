import React, { useEffect, useState } from 'react'
//초기화해준 db 들고오기
import { db } from '../database/firebase';
import { collection, addDoc, Timestamp, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function BookComp() {

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [books, setBooks] = useState("");


    // 책 추가 메소드
    // const addBook = (e) => {
    // 아래 await 를 사용하기위해 async 추가
    const addBook = async (e) => {

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
                done: false, // 고정값
                memo: "", // 고정값
                // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0#data_types
                // API참조 => 웹
                // https://firebase.google.com/docs/reference/js/firestore_.timestamp?hl=ko&authuser=0
                // 클릭한 당시의 날짜값 가져오기 가능
                startDate: Timestamp.fromDate(new Date()), // Timestamp
                title: title, // 입력받아오는 값
                writer: writer, // 입력받아오는 값
            });
            console.log("Document written with ID: ", docRef.id);

            // 값이 제대로 추가 되었다면 실행해주기
            getBook();
        // 위 메소드를 추가해주어야 값이 바로 실행이 됨

        } catch (e) {
            // 어떤 오류가 발생했는지, 발생했다면 어떻게 처리할지 작성
            console.error("Error adding document: ", e);
        }

        // try catch 상관없이 실행될 내용
        setTitle("");
        setWriter("");
        // value={title},value={writer} 각각의 value 값으로 넣어주기
    }


    // 책을 가져오는 메소드
    // https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko#get_all_documents_in_a_collection
    const getBook = async() => {

        const querySnapshot = await getDocs(collection(db, "readingbooks"));

        let array = [];

        querySnapshot.forEach((doc) => {
            
            array.push({
                id : doc.id,
                ...doc.data()
            })
            console.log(`${doc.id} =>  ${doc.data()}`);
            // dir로 doc.data() 객체 확인해보기 => timestamp는 toDate를 통해 Date객체로 변환
            console.dir(doc.data());
            // 콘솔 => object => startDate => [Prototype]:Object => toDate
            console.dir(doc.data().startDate.toDate());
        });
        setBooks(array);
    }


    // 책을 삭제하는 메소드
    // https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko#delete_documents
    // const deleteBook =()=>{
    const deleteBook = async(id)=>{
        // await deleteDoc(doc(db, "cities", "DC"));
        await deleteDoc(doc(db, "readingbooks", id));
        // 새로고침을 해주어야 삭제가 되어있음
        getBook();
        // 위 메소드를 추가해주어야 값이 바로 실행이 됨
    }


    // 현재 컴포넌트가 실행되었을때 바로 출력
    useEffect(() => {
        getBook();
    }, [])


    // return 화면에 값을 출력하기 위한 함수
    // timestamp값을 넣으면 값을 변환해서 문자열로 return하는 함수
    const printTime =(date)=>{

        const month = date.toDate().getMonth()+1;
        const day = date.toDate().getDate();

        return `${month}/${day}`;

    }


    return (
        <div>
            <h3>Reading Books Collection</h3>
            <h3>책 추가</h3>
            <form onSubmit={addBook}>
                <label htmlFor="">도서명</label>
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /> <br />
                <label htmlFor="">작가명</label>
                <input type="text" value={writer} onChange={(e) => { setWriter(e.target.value) }} /> <br />
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
                {
                    // 외부에서 값을 가져오는 시간이 걸림
                    // 값이 있을 때에만 출력되도록 && 연산자 활용
                    books && books.map((book)=>(
                        <div key={book.id}>
                            {/* {book.id} */}

                            {/* <h4>{book.startDate} {book.title}</h4> */}
                            {/* object오류발생 => getBook에서 콘솔로 확인해보기*/}
                            
                            {/* <h4>{book.startDate.toDate().getMonth()+1} {book.title}</h4> */}
                            {/* getMonth()+1 해주어야 제대로 된 월 숫자가 출력됨 */}
                            
                            {/* 위 내용을 따로 빼서 메소드로 만들어 출력하기 */}
                            <h4>
                                {
                                printTime(book.startDate)} ~ {
                                    book.done ? printTime(book.endDate) : "읽는 중"
                                }
                                ,{` `}{book.title}
                            </h4>

                            
                            {
                                book.done ? <p>{book.memo}</p> : <button>감상문 적기</button>
                            }
                            
                            {/* <button onClick={ deleteBook }>X</button> */}
                            {/* 바로 삭제되지않고 클릭했을 때 실행되기 위해서 화살표함수로 작성 */}
                            <button onClick={ ()=>{ deleteBook(book.id) } }>X</button>
                        </div>
                    ))
                }
            {/* <h4>추가 날짜 ~ 읽는중 / 느낀점 날짜 책 제목</h4>
            <p>메모</p>
            <button>감상문 적기</button>
            <button>X</button> */}
        </div>
    )
}
