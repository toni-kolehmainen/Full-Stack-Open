export const initTheme = (theme) => {
  if (window.localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-bs-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export const checkTheme = () => {
  if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
    return false
  } else {
    return true
  }
}

export const getTheme = () => {
  return document.documentElement.getAttribute('data-bs-theme')
}
