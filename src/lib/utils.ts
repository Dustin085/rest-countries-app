import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod"


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

/**
 * 使用cca3代碼取得國家名稱
 * @param cca3 目標國家的cca3代碼
 * @returns 包含common和official兩個屬性的物件，分別代表國家常用名與正式名
 */
export async function getCountryNameBycca3(cca3: string) {
  const CountryNameSchema = z.object({
    name: z.object({
      common: z.string(),
      official: z.string(),
    })
  })

  const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}&fields=name`)
  const data = await response.json()
  const result = CountryNameSchema.array().safeParse(data)

  if (!result.success) {
    console.error("API type error:", z.treeifyError(result.error));
    throw new Error("API type error.");
  }

  if (result.data.length > 1) { throw new Error("Two Countries share the same cca3") }

  return result.data[0];
}
