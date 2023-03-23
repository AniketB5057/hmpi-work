export const getItem = (item_key: string) => {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(item_key)
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : null
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    return null
  }
}

export const setItem = (item_key: string, value: any) => {
  try {
    // Get from local storage by key
    const item = window.localStorage.setItem(item_key, value)
    // Parse stored json or if none return initialValue
    return true
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    return null
  }
}
