
const debug = false

function linky (text: string) {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[\/[a-zA-Z0-9()@:%_\-\+.~#?&=]*]*/g
  const linkedText = text.replace(re, '<a href="$&" target="_blank">$&</a>')
  if (debug) { console.log('T2H linky', text, linkedText) }
  return linkedText
}

function worker (el: { innerHTML: string },
                 binding: { value: string; modifiers: { noAutoLink: any } },
                 source: string) {
  if (debug) { console.log('T2H directive source' , source, binding) }
  if (binding.value) {
    if (debug) { console.log('T2H directive binding', binding.value) }
    const sentences = binding.value.split('\n')
    const html = []
    let seenOne = false
    html.push('<p>')
    sentences.forEach((s) => {
      if (seenOne) { html.push('</p><p>') }
      if (binding.modifiers.noAutoLink) {
        html.push(s)
      } else {
        html.push(linky(s))
      }
      seenOne = true
    })
    html.push('</p>')
    el.innerHTML = html.join('\n')
    if (debug) { console.log('T2H el.innerHTML', el.innerHTML) }
  }
}

export default {
  bind (el: any, binding: any) {
    worker(el, binding, 'bind')
  },
  update (el: any, binding: any) {
    worker(el, binding, 'update')
  },

}
