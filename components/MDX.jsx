import Markdown from "markdown-to-jsx";
import TopNav from "./TopNav";

export default function MDX(props){
    const {text} = props // gives us access to the text attribute, or really the attribute assigned to it
    const md = `# this is a header 1
## this is a header 2


hello world

[click me](https://www.google.com)
    `
    return (
        <section className="p-4 flex flex-col gap-2 flex-1 md:col-span-2 lg:col-span-3">
            <TopNav {...props}/>
            <article className="typography">
                <Markdown>
                    {text.trim() || 'Hop in the editor to create a new note'}
                </Markdown>
            </article>
        </section>
    );
}