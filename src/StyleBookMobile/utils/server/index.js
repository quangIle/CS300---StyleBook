const DEBUG = true
const ERR_TOKEN_NULL = "Token is null"
const ERR_REQUEST_TIMEOUT = {
  name: "Request timeout",
  message: "Please check your internet connection and try again.",
}
const ERR_UNKNOWN = {
  name: "Unknown error",
  message: "Unexpected error occurred. Please try again.",
}
const TEN_SECONDS = 10000
const SUCCESS = "success"
const FAIL = "fail"

export const ENDPOINT = `http://${"192.168.0.10"}:8000`

const errorHandler = (error) => {
  if (DEBUG) console.log(error)
  const { name, message } = error

  switch (name) {
    case "AbortError":
      return ERR_REQUEST_TIMEOUT
      break

    default:
      return ERR_UNKNOWN
      break
  }
}
export const signInAsync = async (data, onResponse) => {
  try {
    const endpoint = `${ENDPOINT}/authentication/signin`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}

export const signupAsync = async (data, onResponse) => {
  try {
    const endpoint = `${ENDPOINT}/authentication/signup`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}

export const getItemsAsync = async (onResponse) => {
  try {
    const endpoint = `${ENDPOINT}/item/`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)

    const response = await fetch(endpoint, {
      method: "GET",
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}

export const fetchItemDetailAsync = async (swipedItem, onResponse) => {
  try {
    const endpoint = `${ENDPOINT}/item/detail`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)

    const response = await fetch(endpoint, {
      method: "GET",
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}

export const updateUserInformationAsync = async (info, onResponse) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)
    const endpoint = `${ENDPOINT}/user/update`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}
export const loadPostFeedAsync = async (username, onResponse) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TEN_SECONDS)
    const endpoint = `${ENDPOINT}/post?username=${username}`

    const response = await fetch(endpoint, { signal: controller.signal })
    clearTimeout(timeoutId)

    const jsonResponse = await response.json()
    onResponse(jsonResponse, SUCCESS)
  } catch (error) {
    const response = errorHandler(error)
    onResponse(response, FAIL)
  }
}
