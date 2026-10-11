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
    li.classList.add(`category-${note.category}`);

    const noteText = document.createElement("span");
    noteText.textContent = note.text;
    li.appendChild(noteText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
      notes = notes.filter(function (item) {
        return item.id !== note.id;
      });

      errorMessage.textContent = "";
      render();
    });

    li.appendChild(deleteButton);
    notesList.appendChild(li);
  });

  // Update the note count
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Handle form submission and validation
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Your note must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);

  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});
