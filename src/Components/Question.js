export default function Question(props) {
  
    return (
      <div className="pb-4 px-4">
        <p className="text-gray-400">QUESTION</p>
        <p className="text-lg">{props.children}</p>
      </div>    
    )
  }
  