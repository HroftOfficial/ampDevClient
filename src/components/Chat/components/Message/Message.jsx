import Avatar from '@mui/material/Avatar';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DownloadIcon from '@mui/icons-material/Download';
import { textUrl } from '../../../../utils/services';

import classes from './Message.module.css';

export const Message = ({ message, own }) => {
	return (
		<div
			className={
				own ? `${classes.message} ${classes.own}` : `${classes.message}`
			}
		>
			<div
				className={own ? `${classes.messageTopOwn}` : `${classes.messageTop}`}
			>
				{/* <Avatar sx={{ width: 30, height: 30 }} /> */}
				<div className={classes.messageText}>
					{message?.title && (
						<div
							className={
								own ? `${classes.themeTextOwn}` : `${classes.themeText}`
							}
						>
							{message?.title}
						</div>
					)}
					{textUrl(message?.urlFile) && message?.realNameFile ? (
						<a href={message?.urlFile} target="_blanc">
							<div className={classes.messageFile}>
								<SummarizeIcon sx={{ fontSize: 70 }} />
								<p>{message?.realNameFile}</p>

								<DownloadIcon fontSize="large" />
							</div>
						</a>
					) : (
						message?.text
					)}
					{/* {textUrl(message?.urlFile) ? (
						<a href={message?.urlFile} target="_blanc">
							<SummarizeIcon sx={{ fontSize: 80 }} />
						</a>
					) : (
						message?.text
					)} */}
					<div
						className={
							own ? `${classes.messageBottomOwn}` : `${classes.messageBottom}`
						}
					>
						{message?.createdAt &&
							formatRelative(new Date(message?.createdAt), new Date(), {
								locale: ru,
							})}
					</div>
				</div>
			</div>
			{/* <div className={classes.messageBottom}>
				{message?.createdAt &&
					formatRelative(new Date(message?.createdAt), new Date(), {
						locale: ru,
					})}
			</div> */}
		</div>
	);
};
