import data from "./components/file-explore/data"
import FileExplore from "./components/file-explore/FileExplore"

const App = () => {
  return (
    <div className="w-full flex justify-center items-center">
      {/* <Faq /> */}
      {/* <FileUploader /> */}
      {/* <InfiniteScroll /> */}
      {/* <DragAndDrop /> */}
      {/* <Select /> */}
      <FileExplore key={Math.random()} node={data[1]} />
    </div>
  )
}

export default App