import { useRef } from "react";
import { Form, Stack, Row, Col, FormGroup, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";

export function NewForm({ onSubmit }) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate()


	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			// tags: selectedTags,
		})

		navigate("..");
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<FormGroup controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required ref={titleRef} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect isMulti />
						</FormGroup>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						// defaultValue={markdown}
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
