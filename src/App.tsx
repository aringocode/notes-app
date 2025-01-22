import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNoteScreen } from "./NewNoteScreen.tsx";

function App() {

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
					<NewNoteScreen />
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
