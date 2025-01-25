import { useRef, useState, FormEvent } from "react";
import { Form, Stack, Row, Col, FormGroup, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";


import { NoteData, Tag } from "./App";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void
	onAddTag: (tag: Tag) => void
	availableTags: Tag[]
  } & Partial<NoteData>

export function NewForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate();

	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)


	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		})

		navigate("..");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<FormGroup controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required ref={titleRef} defaultValue={title} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect isMulti
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id }
								})}
								onChange={tags => {
									setSelectedTags(
										tags.map(tag => {
										return { label: tag.label, id: tag.value }
										})
									)
								}}
								onCreateOption={label => {
									const newTag = { id: uuidV4(), label }
									onAddTag(newTag)
									setSelectedTags(prev => [...prev, newTag])
								}}
								options={availableTags.map(tag => {
									return { label: tag.label, value: tag.id }
								})}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						defaultValue={markdown}
						required
						as="textarea"
						ref={markdownRef}
						rows={15}
					/>
				</Form.Group>
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to=".."> {/* Back to previous page */}
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}
