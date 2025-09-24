import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


/* shadcn/ui */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 若在localStorage裡面有theme值則依據其切換dark mode，若無則使用system theme(瀏覽器設定)
 */
export function changeDarkModeByCondition(): void {
  const theme = localStorage.getItem("theme")

  document.documentElement.classList.toggle(
    "dark",
    theme === "dark" ||
    (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
}

/**
 * 切換dark mode / light mode，並回傳更新後的值
 * @returns 更新後的isDarkmode，true => 正在dark mode，反之則是light mode
 */
export function toggleDarkMode(): boolean {
  const newValue = !getIsDarkMode()
  localStorage.setItem("theme", newValue ? "dark" : "light")
  changeDarkModeByCondition()
  return newValue
}

/**
 * 根據localStorage和使用者系統設定來取得是否使用dark mode
 * @returns true => 正在dark mode，反之則是light mode
 */
export function getIsDarkMode(): boolean {
  const theme = localStorage.getItem("theme")

  return theme === "dark" ||
    (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
}
