const LOCAL_STORAGE_KEY = 'RHAEGO_STORAGE'

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, '{}')
}

export const getStorage = key => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))[key]
}

export const setStorage = (key, value) => {
  const store = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  store[key] = value
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store))
}