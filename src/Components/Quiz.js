
export default function Quiz(props) {
 

  return (
    <main className="flex-col items-center">
        <div className="flex w-1/4">
        </div>
          <div className="flex w-1/2 mx-auto max-w-7xl py-6 col-span-2">
            <div className="w-full px-4 py-6">
                
              <div className="h-100 rounded-lg border-4 border-dashed py-4 px-4 border-gray-200" >
                    {props.children}
                
              </div>
            </div>

          </div>
          <div className="flex w-1/4">
        </div>
    </main>
    
  )
}
