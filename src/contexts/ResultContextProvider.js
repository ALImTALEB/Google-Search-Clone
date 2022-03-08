import React, {createContext, useState, useContext} from "react";

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'


export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'EU',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '4ec54bd042msh3634e0d7241a99fp168e88jsnedfaf76dc4db'
              }
            })

              const data = await response.json()
              console.log(data)

              setResults(data)
              setIsLoading(false)
            
      
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }} >
        {children}
        </ResultContext.Provider>
    )

}



export const useResultContext = () => useContext(ResultContext)