export const CheckFilesQuantity = ({ needPhoto, manyPhoto, manyFiles }) => {
	if (needPhoto) {
		return (
			<div className="mx-auto mt-3">
				<b style={{ color: 'red' }}>
					Необходимо добавить хотя бы одно изображение!
				</b>
			</div>
		);
	}
	if (manyPhoto) {
		return (
			<div className="mx-auto mt-3">
				<b style={{ color: 'red' }}>Слишком много изображений (Максимум 10!)</b>
			</div>
		);
	}
	if (manyFiles) {
		return (
			<div className="mx-auto mt-3">
				<b style={{ color: 'red' }}>Слишком много файлов (Максимум 10!)</b>
			</div>
		);
	}

	return null;
};
