import React, { useState } from 'react';
import { TextField, Popover, IconButton, InputAdornment } from '@mui/material';
import { TagFaces } from '@mui/icons-material';
import EmojiPicker, {
	EmojiStyle,
	SkinTones,
	Theme,
	Categories,
	EmojiClickData,
	Emoji,
	SuggestionMode,
	SkinTonePickerLocation,
} from 'emoji-picker-react';

export const TextFieldEmoji = ({ value, setValue }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const onClick = (emojiData, event) => {
		// const textAreaElement: HTMLElement | null =
		// 	document.getElementById('text-field');
		setValue(value.substring(0, value.length) + emojiData.emoji);
	};
	return (
		<>
			<TextField
				id="text-field"
				placeholder="Введите сообщение.."
				value={value}
				fullWidth
				onPaste={(event) => setValue(event.clipboardData.getData('text'))}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton aria-describedby={id} onClick={handleClick}>
								<TagFaces
									sx={{ color: open ? '#00aeae' : '' }}
									fontSize="large"
								/>
							</IconButton>
						</InputAdornment>
					),
				}}
				multiline
				sx={{
					paddingX: 1,
					'& .MuiOutlinedInput-root': {
						borderRadius: '10px',
						'&.Mui-focused fieldset': {
							borderColor: '#00aeae',
						},
					},
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: '90px',
				}}
			/>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<EmojiPicker
					onEmojiClick={onClick}
					autoFocusSearch={false}
					theme={Theme.AUTO}
					searchDisabled
					skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
					// height={350}
					// width="50%"
					emojiVersion="0.6"
					lazyLoadEmojis={true}
					previewConfig={{
						defaultCaption: 'Pick one!',
						defaultEmoji: '1f92a', // 🤪
					}}
					suggestedEmojisMode={SuggestionMode.RECENT}
					skinTonesDisabled
					searchPlaceHolder="Filter"
					defaultSkinTone={SkinTones.MEDIUM}
					emojiStyle={EmojiStyle.NATIVE}
					// categories={[
					// 	{
					// 		name: 'Fun and Games',
					// 		category: Categories.ACTIVITIES,
					// 	},
					// 	{
					// 		name: 'Smiles & Emotions',
					// 		category: Categories.SMILEYS_PEOPLE,
					// 	},
					// 	{
					// 		name: 'Flags',
					// 		category: Categories.FLAGS,
					// 	},
					// 	{
					// 		name: 'Yum Yum',
					// 		category: Categories.FOOD_DRINK,
					// 	},
					// ]}
				/>
			</Popover>
		</>
	);
};
