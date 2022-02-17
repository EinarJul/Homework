import { REQUEST_URL } from '../constants'
import { useEffect, useState } from 'react'

interface IUser {
  name: string
  lastname: string
  age: string
  email: string
  created_date: string
  profile: string
  account_type: string
}

const useCurrentUser = () => {
  const [data, setData] = useState<IUser>({
    name: '',
    lastname: '',
    age: '',
    email: '',
    created_date: '',
    account_type: 'normal',
    profile: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await fetch(REQUEST_URL + '/auth/current', {
          method: 'POST',
          credentials: 'include',
        }).then((res) => res.json())

        setData(result[0])
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])
  return { data, isLoading, isError }
}

export default useCurrentUser
