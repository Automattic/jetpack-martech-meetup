// Card Component - Modern functional component with hooks
const Card = ({ title, content, footer, image }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const expandCard = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="card">
			{image && <img src={image} className="card-img" />}
			<div className="card-header" onClick={expandCard}>
				<h3>{title}</h3>
			</div>
			{isExpanded && (
				<div className="card-body">
					<div className="card-content">{content}</div>
					{footer && <div className="card-footer">{footer}</div>}
				</div>
			)}
		</div>
	);
};

export default Card;