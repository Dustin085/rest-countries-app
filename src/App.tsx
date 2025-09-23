import './App.css'

function App() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  console.log(isDarkMode); // true 或 false


  return (
    <>
      <main>
        Home
      </main>
    </>
  )
}

export default App
