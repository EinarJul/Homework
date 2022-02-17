import { REQUEST_URL } from '../constants'
import { useEffect, useState } from 'react'

interface IUseFetch {
  path: string
  method: 'GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  body?: object
  headers?: object
}

interface ICallInterface<T> {
  variables: IUseFetch
  response: T | null
  isLoading: boolean
  isError: boolean
}

function useFetch<T>(
  props: IUseFetch
): [Omit<ICallInterface<T>, 'variables'>, (props: IUseFetch) => void] {
  const [call, setCall] = useState<ICallInterface<T>>({
    variables: props,
    response: null,
    isLoading: false,
    isError: false,
  })

  const { path, body, method, headers } = call.variables

  const fetchData = async (override?: IUseFetch) => {
    const reqPath = override?.path ? override?.path : path
    const reqHeaders = override?.headers ? override.headers : headers
    const reqMethod = override?.method ? override.method : method
    const reqBody = override?.body ? override.body : body

    try {
      setCall((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        }
      })
      const result = await fetch(REQUEST_URL + reqPath, {
        headers: {
          'Content-Type': 'application/json',
          ...reqHeaders,
        },
        mode: 'cors',
        method: reqMethod,
        body: JSON.stringify(reqBody),
        credentials: 'include',
      }).then((res) => res.json())

      setCall((prevState) => {
        return {
          ...prevState,
          response: result,
          isLoading: result ? false : false,
        }
      })
    } catch (error) {
      setCall((prevState) => {
        return {
          ...prevState,
          isError: true,
        }
      })
    }
  }

  function refetch(props: IUseFetch) {
    fetchData(props)
  }

  useEffect(() => {
    fetchData()
  }, [call.variables])

  const ret = {
    response: call.response,
    isLoading: call.isLoading,
    isError: call.isError,
  }
  return [ret, refetch]
}

export default useFetch
