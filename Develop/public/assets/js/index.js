var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");
//delete note $?//////////////////////////////////////////////////////////////
// var $deleteNoteBtn = $('.delete.note')

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function(note) {
  console.log(note)
  return $.ajax({
    
    url: "/api/notes",
    data: note,
    method: "POST",
    contentType: "application/json; charset=utf-8",
    complete: function(response){
      saveNoteSuccess()
      console.log('saveNoteSuccess');
      console.log(response)
    }
  });
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    id: Date.now()

  };

  let jsonNote = JSON.stringify(newNote) 

// console.log(jsonNote)
  saveNote(jsonNote)
  // .then(function(data) {
  //   getAndRenderNotes();
  //   renderActiveNote();
  // });
};

function saveNoteSuccess() {
  getAndRenderNotes();
  renderActiveNote();

}

// Delete the note
// Need to add an id???
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  /////////////////// ERROR IN CODE BELOW. DO NOT FORGET BRUH///////////////////
  id: Date.now();
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};
//look at save to figure out the delete 
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
