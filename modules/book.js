import { state } from "../core/state.js";

// === BOOK DATA (CORE IMPORT FROM YOUR ORIGINAL SYSTEM) ===

const BOOK = [
  {
    title: "The Landscape of the Storm",
    content: `You are not dealing with one problem.

You are navigating a system.

Thoughts, emotions, body signals, and environment all mix together into one dynamic state.

Stop asking: "What's wrong with me?"

Start asking: "What state am I in?"`
  },
  {
    title: "Shutdown is Protection",
    content: `Shutdown is not failure.

It is a safety response.

When overwhelmed, your system reduces output to survive.

The solution is not force.

The solution is reset.`
  },
  {
    title: "Architect vs Pilot",
    content: `The Pilot reacts.

The Architect designs.

You are not here to control every moment.

You are here to build systems that work when you can't.`
  },
  {
    title: "Color States",
    content: `Blue = Low energy  
Purple = Anxiety  
Yellow = Scatter  
Red = Overload  
Green = Flow  

You don't fix everything.

You identify the state and respond correctly.`
  },
  {
    title: "Minimum Viable Step",
    content: `Do not complete the task.

Start the task.

One step breaks inertia.

Momentum follows.`
  }
];

// === STATE INIT ===

if (!state.book) {
  state.book = {
    index: 0,
    open: false
  };
}

// === NAVIGATION ===

window.openBook = function () {
  state.book.open = true;
  renderBook();
};

window.closeBook = function () {
  state.book.open = false;
  document.getElementById("book-overlay")?.remove();
};

window.nextChapter = function () {
  state.book.index = (state.book.index + 1) % BOOK.length;
  renderBook();
};

window.prevChapter = function () {
  state.book.index =
    (state.book.index - 1 + BOOK.length) % BOOK.length;
  renderBook();
};

window.goToChapter = function (i) {
  state.book.index = i;
  renderBook();
};

// === RENDER ===

function renderBook() {
  let overlay = document.getElementById("book-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "book-overlay";
    overlay.className =
      "fixed inset-0 bg-black/95 z-[9999] flex";
    document.body.appendChild(overlay);
  }

  const chapter = BOOK[state.book.index];

  overlay.innerHTML = `
    <div class="w-1/4 border-r border-white/10 p-4 overflow-y-auto hidden md:block">
      <div class="text-xs opacity-50 mb-4 uppercase">Chapters</div>

      ${BOOK.map((c, i) => `
        <div 
          onclick="goToChapter(${i})"
          class="cursor-pointer text-sm py-2 ${i === state.book.index ? "text-indigo-400" : "opacity-60"}"
        >
          ${i + 1}. ${c.title}
        </div>
      `).join("")}
    </div>

    <div class="flex-1 p-10 overflow-y-auto max-w-3xl mx-auto">

      <div class="flex justify-between mb-6">
        <button onclick="closeBook()" class="text-xs opacity-50">Close</button>
        <div class="text-xs opacity-50">Chapter ${state.book.index + 1}</div>
      </div>

      <h1 class="text-2xl mb-6">${chapter.title}</h1>

      <div class="whitespace-pre-line leading-relaxed opacity-80 text-lg">
        ${chapter.content}
      </div>

      <div class="flex justify-between mt-10">
        <button onclick="prevChapter()" class="text-sm opacity-60">← Prev</button>
        <button onclick="nextChapter()" class="text-sm opacity-60">Next →</button>
      </div>

    </div>
  `;
}
