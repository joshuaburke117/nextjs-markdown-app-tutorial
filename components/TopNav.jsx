export default function TopNav(props){
    const {isViewer, handleToggleViewer,handleToggleMenu, savingNote, handleSaveNote} = props
    return(
        <>
            <div className="flex items-stretch gap-2">
                    <button onClick={handleToggleMenu} 
                    className="flex font-2p justify-center gap-2 w-full items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300 md:hidden">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <button disabled={savingNote} onClick={handleSaveNote} className="flex justify-center font-2p w-full items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300">
                        <h6>Save</h6>
                        <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button onClick={handleToggleViewer} 
                    className="flex font-2p justify-center gap-2 w-full items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300">
                        {isViewer ? 
                            <>
                                <h6>Editor</h6>
                                <i className="fa-solid fa-pencil"></i>
                            </>
                        :
                            <>
                                <h6>Viewer</h6>
                                <i className="fa-solid fa-check-double"></i>
                            </>
                        }
                    </button>
                </div>
            <div className="h-px w-full bg-green-800"></div>
        </>
    );
}