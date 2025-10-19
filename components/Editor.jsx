import TopNav from "./TopNav";

export default function Editor(props){
    const{text, setText} = props
    return(
        <section className="p-4 flex flex-col gap-2 flex-1 md:col-span-2 lg:col-span-3">
            <TopNav {...props}/>
            <textarea className="flex-1 bg-white border-none resize-none" value={text} onChange={setText} placeholder="Enter your text here"/>
        </section>
    );
}