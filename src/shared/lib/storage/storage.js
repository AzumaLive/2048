export const createStorage = (key) => {
  return {
    get: () => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(`Error reading from localStorage (${key})`, error)
        return null
      }
    },

    set: (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(`Error writing file to localStorage (${key})`, error)
      }
    },

    remove: () => {
      try {
        localStorage.removeItem(key)
      }  catch (error) {
        console.error(`Error removing from localStorage (${key})`, error)
      }
    },
  }
}