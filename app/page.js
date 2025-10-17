import Login from "@/components/Login";

export default function Home() {
  
  return (
    <main className="grid sm:grid-cols-1 sm:grid-cols-2 sm:flex-1 lg:grid-cols-3 lg:">
      <div className="pad-2 fixed top-0 left-0 w-full h-screen -z-1 overflow-hidden sm:sticky sm:max-h-screen lg:col-span-2">
        <img className="absolute bot-0 left-0 w-full h-screen object-cover -z-1" alt="hero-img" src ="background.jpg"/>
        {/* Photo by <a href="https://unsplash.com/@sincerelymedia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sincerely Media</a> on <a href="https://unsplash.com/photos/green-and-blue-color-illustration-4dSXcNTyXaI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
      
      </div>
      <div className="pad-2">
         <Login/>
      </div>
    </main>
  );
}
