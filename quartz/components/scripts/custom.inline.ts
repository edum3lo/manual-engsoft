document.addEventListener("nav", () => {
  // 1. Reveal on Scroll (Fade-up)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })

  const elementsToReveal = document.querySelectorAll("p, li, blockquote, .callout, pre")
  elementsToReveal.forEach((el) => {
    el.classList.add("reveal-element")
    observer.observe(el)
  })

  // 2. Custom Glowing Cursor Background in Dark Mode
  let cursorGlow = document.getElementById("cursor-glow")
  if (!cursorGlow) {
    cursorGlow = document.createElement("div")
    cursorGlow.id = "cursor-glow"
    document.body.appendChild(cursorGlow)
  }

  document.addEventListener("mousemove", (e) => {
    const isDarkMode = document.documentElement.getAttribute("saved-theme") === "dark" || 
                       (document.documentElement.getAttribute("saved-theme") === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDarkMode) {
      cursorGlow!.style.display = "block"
      cursorGlow!.style.left = `${e.clientX}px`
      cursorGlow!.style.top = `${e.clientY}px`
    } else {
      cursorGlow!.style.display = "none"
    }
  })
})
