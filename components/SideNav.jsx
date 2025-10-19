import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SideNav(props){

    const {showNav, setShowNav, noteIds, setNoteIds, handleCreateNote, setIsViewer} = props
    const {logout, currentUser} = useAuth()

    const ref = useRef()
    const router = useRouter()

    async function deleteNote(noteIdx) {
        try{
            console.log("here");
            const noteRef = doc(db,'users',currentUser.uid, 'notes', noteIdx)
            await deleteDoc(noteRef)
            setNoteIds((curr) => {
                return curr.filter(idx => idx !== noteIdx)
            })
        }catch(err){
            console.log(err.message)
        }finally{ }
    }

    useEffect(()=>{
        //this is the code block that gets executed when our ref changes(so in this case it's when ref is assigned)
        function handleClickOutside(event){
            if (ref.current && !ref.current.contains(event.target)){
                setShowNav(false)
            }
        }

        document.addEventListener('mousedown',handleClickOutside)
        return() => {
            //cleanup -- unbind the event listener on clean up
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[ref])

    useEffect(()=>{
        if(!currentUser){return} /// if we dont have a user we can't fetch anything

        async function fetchIndexes() { // this fetches the id's of all our documents
            try{
                const noteRef = collection(db, 'users', currentUser.uid, 'notes')
                const snapshot = await getDocs(noteRef)
                const notesIndexes = snapshot.docs.map((doc) => {
                    return doc.id
                })
                setNoteIds(notesIndexes)
            }catch(err){
                console.log(err.message)
            }finally{

            }
        }
        fetchIndexes()

    },[])

    return (
        <section ref={ref} className={`p-4 flex-col flex gap-2 h-screen overflow-hidden fixed t-0 max-w-65/100  border-r bg-background-colour z-10" md:sticky md:max-w-full! ${showNav? ``: `hidden! md:flex!`}`}>
            <h1 className="font-2p text-transparent bg-clip-text box-decoration-clone w-fit text-4xl bg-gradient-to-r from-emerald-500 from-10% via-green-500 via-30% to-green-300 to-90%">Notes App</h1>
            <h6 className="font-2p text-white text-3xl">Notes</h6>
            <div className="h-px w-full bg-green-800"></div>
            <button className="flex font-2p gap-2 w-full grid items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300"onClick={handleCreateNote}>
                <h6 className="font-2p text-white">New note</h6>
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                {noteIds.length == 0? 
                <p>You have 0 notes</p> :  
                noteIds.map((note,idx) =>{
                    const [n, d] = note.split('__')
                    const date = (new Date(parseInt(d))).toString()
                    return (
                        <button onClick={() => {
                            router.push('/notes?id=' + note)
                            setIsViewer(true)
                        }} key ={idx} className="group flex flex-col items-start gap-1 capitalize overflow-hidden p-2 m-h-fit relative bg-lime-300 hover:bg-lime-200">
                            <p className="w-full text-left whitespace-nowrap overflow-hidden text-ellipsis">{n}</p>
                            <small>{date.split(' ').slice(1, 4).join(' ')}</small>
                            <div onClick={(e) => {
                                e.stopPropagation()
                                deleteNote(note)
                            }} className="absolute right-2 top-50/100 -translate-y-2/4 opacity-0 pointer-events-none duration-200 group-hover:opacity-100 group-hover:text-delete-colour group-hover:pointer-events-auto">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="full-line"></div>
            <button onClick={logout} className="flex gap-2 font-2p w-full grid items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300">
                <h6 className="font-2p text-white">Logout</h6>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </section>
    );
}