import { Suspense } from "react"

export default function NoteLayout(props) {
    const { children } = props
    return (
        <>
            <Suspense fallback={<h6 className="font-2p text-transparent bg-clip-text box-decoration-clone w-fit bg-gradient-to-r from-emerald-500 from-10% via-green-500 via-30% to-green-300 to-90%">Loading...</h6>}>
                {children}
            </Suspense>
        </>
    )
}