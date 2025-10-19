'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true)
    // const [text, setText] = useState('')
    const [showNav, setShowNav] = useState(false)
    const [note, setNote] = useState({
        content: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [noteIds, setNoteIds] = useState([])
    const [savingNote, setSavingNote] = useState(false)

    const {currentUser,isLoadingUser} = useAuth()

    const searchParams = useSearchParams()

    function handleToggleViewer() {
        //isViewer = !isViewer
        setIsViewer(!isViewer)
    }

    function handleToggleMenu() {
        setShowNav(!showNav)
    }

    function handleCreateNote() {
        setNote({
            content: ''
        })
        setIsViewer(false)
        window.history.replaceState(null,'',`/notes`)
    }

    function handleEditNote(e) {
        setNote({...note, content: e.target.value})
    }

    async function handleSaveNote() {
        if(!note?.content){return}
        setSavingNote(true)
        try{
            //see if not already exists in database
            if(note.id){
                //then we have an existing note cuase we have it's id, so write to existing note
                const noteRef = doc(db,'users',currentUser.uid, 'notes', note.id)
                await setDoc(noteRef, {
                    ...note
                }, {merge: true})
            }else{
                //that means that it's a brand new note and will only have the content feild, 
                const newId = note.content.replaceAll('#',' ').slice(0,15) + '__' + Date.now()
                const notesRef = doc(db, 'users', currentUser.uid, 'notes', newId)
                const newDocInfo = await setDoc(notesRef, {
                    content: note.content,
                    createdAt: serverTimestamp()
                })
                setNoteIds(curr => [...curr, newId])
                setNote({...note, id: newId})
                window.history.pushState(null, '', `?id=${newId}`)
            }
        }catch(err){
            console.log(err.message)
        }finally{
            setSavingNote(false)
        }
    }

    useEffect(() => {
        //locally cache notes in a global context (like the one we already have, you perhaps just need an extra state)
        const value = searchParams.get('id')

        if(!value || !currentUser){return}

        async function fetchNote() {
            if(isLoading){return}
            try {
                setIsLoading(true)
                const noteRef = doc(db,'users',currentUser.uid, 'notes', value)
                const snapshot = await getDoc(noteRef)
                const docData = snapshot.exists() ? {id: snapshot.id, ...snapshot.data()} : null 
                if(docData) {
                    setNote({...docData})
                }
            }catch (err){
                console.log(err.message)
            }finally{
                setIsLoading(false)
             }
        }
        fetchNote()
    }, [currentUser, searchParams])

    if(isLoadingUser){
        return (
        <h6 className="text-gradient">loading...</h6>
        )
    }

    if(!currentUser) {
        // if no user found, the boot them to the home page cause this is the notes page (for auth users only)
        window.location.href = '/'
    }

    return(
        <main className="relative grid grid-cols-1 flex-1 max-w-[1440px] w-full mx-auto gap-1 md:grid-cols-3 md:flex-1 lg:grid-cols-4">
            <SideNav setIsViewer={setIsViewer} handleCreateNote={handleCreateNote} noteIds={noteIds} setNoteIds={setNoteIds} showNav={showNav} setShowNav={setShowNav}/>
            {!isViewer &&(
                <Editor savingNote={savingNote}
                handleSaveNote={handleSaveNote} 
                setText={handleEditNote}
                text={note.content} 
                isViewer={isViewer} 
                handleToggleViewer={handleToggleViewer}
                handleToggleMenu={handleToggleMenu} />
            )}

            {isViewer &&(
                <MDX savingNote={savingNote}
                handleSaveNote={handleSaveNote}
                text={note.content}  
                isViewer={isViewer} 
                handleToggleViewer={handleToggleViewer}
                handleToggleMenu={handleToggleMenu}/>
            )}
        </main>
    );
}