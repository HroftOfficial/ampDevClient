import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export const FileChip = ({ files, setFiles }) => {
	const handleDelete = (fileToDelete) => () => {
		setFiles((files) =>
			files.filter((file) => file.name !== fileToDelete.name)
		);
	};
	return (
		<>
			{files?.length > 0 ? (
				<Paper
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						listStyle: 'none',
						p: 0.5,
						m: 0,
					}}
					component="ul"
				>
					{files?.map((file, index) => {
						return (
							<li key={index}>
								<Chip onDelete={handleDelete(file)} label={file.name} />
							</li>
						);
					})}
				</Paper>
			) : null}
		</>
	);
};
