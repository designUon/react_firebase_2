import React, { useEffect, useState } from 'react'
//초기화해준 db 들고오기
import { db } from '../database/firebase';
import { collection, addDoc, Timestamp, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import AddBookBox from './AddBookBox';

export default function BookComp() {

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    
    // 검색하기 위한 값
    const [searchTitle, setSearchTitle] = useState("");

    // 검색된 책 배열
    const [searchBooks, setSearchBooks] = useState();
    
    // 전체 화면에 출력 될 책 리스트
    const [books, setBooks] = useState("");






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


    // 감상문을 추가하고 책의 값을 수정하는 메소드
    // 문서 업데이트
    // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#update-data
    const updateBook = async(id)=> {

        const memo = prompt("감상내용을 작성해주세요")

        // memo의 값이 없을 때는 return을 실행하여 메소드 종료시켜주기
        if(!memo)
            return;

        // const washingtonRef = doc(db, "cities", "DC");
        // f2를 눌러서 수정하면 함수 내에 함께 수정할 단어 한꺼번에 수정이 가능
        const updateRef = doc(db, "readingbooks", id);


        await updateDoc(updateRef, {
            // capital: true
            memo : memo,
            done : true,
            endDate : Timestamp.fromDate(new Date())
        });

        // 수정된 값을 화면에 출력할수있도록 작성
        getBook();

    }



    // 책 제목을 통해서 책을 찾는 메소드
    // 데이터읽기 => 단순쿼리 => 쿼리 실행
    // https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#execute_a_query
    const searchBook = async(e) => {

        e.preventDefault();

        // const q = query(collection(db, "cities"), where("capital", "==", true));
        const q = query(collection(db, "readingbooks"), where("title", "==", searchTitle));

        // 배열에 담아서 사용
        const querySnapshot = await getDocs(q);

        let array = [];

        querySnapshot.forEach((doc) => {

            array.push(
                {
                    id : doc.id,
                    ...doc.data()
                }
            )

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

        // 찾은 정보값 화면에 출력
        setSearchBooks(array);

    }

    // const searchBook = async(e) => {
    //     e.preventDefault();
    //     const q = query(collection(db, "readingbooks"), where("title", "==", searchTitle));
    
    //     // 배열에 담아서 사용
    //     const querySnapshot = await getDocs(q);
    //     let array = [];
        
    //     querySnapshot.forEach((doc) => {
    //         array.push(
    //             {
    //                 id : doc.id,
    //                 ...doc.data()
    //             }
    //         )
    //         console.log(doc.id, " => ", doc.data());
    //     });
    //     // 찾은 정보값 화면에 출력
    //     setSearchBooks(array)
    
    // }



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

            <AddBookBox getBook={getBook}/>

            <hr />
            <form onSubmit={ searchBook }>
                <input type="text" 
                    onChange={(e)=>{setSearchTitle(e.target.value)}}/>
                <button type='submit'>읽은 책 검색하기</button>
            </form>
            <hr />
            {
                searchBooks && searchBooks.map((book)=>(
                    <div>
                        <h4>{printTime(book.startDate)} {book.title}</h4>
                        <p>{ book.memo ? book.memo : "메모없음"}</p>
                    </div>
                ))
            }

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
                                book.done ? <p>{book.memo}</p> : <button onClick={()=>{updateBook(book.id)}}>감상문 적기</button>
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
