import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView ??= () => {}
  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // motion-v cancels in-flight WAAPI animations on unmount. happy-dom rejects
  // `animation.finished` with AbortError and nobody catches it.
  const cancelAnimation = window.Animation?.prototype.cancel
  if (cancelAnimation) {
    window.Animation.prototype.cancel = function (this: Animation) {
      void this.finished.catch(() => {})
      return cancelAnimation.call(this)
    }
  }
}
