// import { NoteData, Tag } from "./App"
import { NewForm } from "./NewForm"

// type NewNoteProps = {
//   onSubmit: (data: NoteData) => void
//   onAddTag: (tag: Tag) => void
//   availableTags: Tag[]
// }

export function NewNoteScreen() {
  return (
	<>
	  <h1 className="mb-4">New Note</h1>
	  <NewForm />
	</>
  )
}