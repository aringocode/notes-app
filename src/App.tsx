import "bootstrap/dist/css/bootstrap.min.css";

import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

import { NewNoteScreen } from "./NewNoteScreen.tsx";
import { useLocalStorage } from "./useLocalStorage";


export type Note = {
	id: string
} & NoteData

export type Tag = {
	id: string
	label: string
}

export type NoteData = {
	title: string
	markdown: string
	tags: Tag[]
}

export type RawNote = {
	id: string
} & RawNoteData
  
export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);


	const notesWithTags = useMemo(() => {
		return notes.map(note => {
			return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
		});
	}, [notes, tags]);


	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes(prevNotes => {
		  return [
			...prevNotes,
			{ ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
		  ]
		})
	};

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<h1>Hi</h1>
					}
				/>
				<Route
					path="/new"
					element={
						<NewNoteScreen onSubmit={onCreateNote} />
					}
				/>
				<Route path="/:id" element={<h1>veve</h1>}>
					<Route index element={<h1>lal</h1>} />
					<Route
						path="edit"
						element={
							<h1>lsls</h1>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
