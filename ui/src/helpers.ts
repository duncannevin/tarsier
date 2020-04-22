export function lazyScriptLoad(path: string) {
  const scriptEl = document.createElement('script')
  scriptEl.setAttribute('src', path)
  document.head.appendChild(scriptEl)
}
