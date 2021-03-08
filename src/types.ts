
export type Lib = 'playwright' | 'puppeteer'
export type Kernal = 'chromium'
export type Directive = 'navigate' | 'input' | 'select' | 'click' | 'submit' | 'list' | 'wait'

export interface Config {
  libs?: Lib[]
  kernals?: Kernal[]
  plugins?: string[]
  baseUrl?: string
  include?: string
  extname?: string
  files?: string[]
  outDir?: string
  watch?: boolean
}



export interface DirectiveCode {
  directive: Directive
  param?: string | number
  selector?: string
}