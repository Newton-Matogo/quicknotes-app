const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// Store all notes in an array
let notes = [];

// Display notes on the page
function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const li = document.createElement("li");
    li.textContent = note.text;
    li.classList.add(`category-${note.category}`);

    notesList.appendChild(li);
  });

  // Display the correct note count
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Add a new note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);

  render();

  noteInput.value = "";
});
