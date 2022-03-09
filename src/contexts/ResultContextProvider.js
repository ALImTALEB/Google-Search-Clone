import React, {createContext, useState, useContext} from "react";

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'


export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('Js mastery')


    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'EU',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '21eb5c19cfmshfa114f80148598ap137cfdjsn5a5ae5624a19'
              }
            
            })

              const data = await response.json()
              if (type.includes('/news')) {
                  setResults(data.entries)
              } else if(type.includes('/images')) {
                  setResults(data.image_results)
              } else {
                  setResults(data.results)
              }
              console.log(data)

              setIsLoading(false)
            
      
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }} >
        {children}
        </ResultContext.Provider>
    )

}



export const useResultContext = () => useContext(ResultContext)