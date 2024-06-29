export const initTheme = () => {
  if (window.localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-bs-theme', window.localStorage.getItem('theme'))
    document.documentElement.setAttribute('data-theme', window.localStorage.getItem('theme'))
  }
}

export const checkTheme = () => {
  if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
    return false
  } else {
    return true
  }
}