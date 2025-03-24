// Component Library - Current Implementation
/* global Component */

// Button Component - Has inconsistent styling and naming
class Button extends Component {
	render() {
		const { label, onClick, isDisabled, type, size } = this.props;
		
		let className = 'btn';
		if ( size == 'large' ) className += ' btn-lg';
		if ( size == 'small' ) className += ' btn-sm';
		if ( type == 'primary' ) className += ' btn-primary';
		if ( type == 'secondary' ) className += ' btn-secondary';
		if ( type == 'danger' ) className += ' btn-danger';
		
		return (
			<button 
				className={ className } 
				onClick={ onClick } 
				disabled={ isDisabled ? 'disabled' : '' }>
				{ label }
			</button>
		);
	}
}

// Card Component - Uses outdated patterns and has CSS specificity issues
class Card extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			isExpanded: false
		};
		this.expandCard = this.expandCard.bind( this );
	}
	
	expandCard() {
		this.setState( { isExpanded: ! this.state.isExpanded } );
	}
	
	render() {
		const { title, content, footer, image } = this.props;
		
		return (
			<div className="card">
				{ image && <img src={ image } className="card-img" /> }
				<div className="card-header" onClick={ this.expandCard }>
					<h3>{ title }</h3>
				</div>
				{ this.state.isExpanded && 
					<div className="card-body">
						<div className="card-content">{ content }</div>
						{ footer && <div className="card-footer">{ footer }</div> }
					</div>
				}
			</div>
		);
	}
}

// Tooltip Component - Has issues with styling inconsistency and positioning
class Tooltip extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			visible: false
		};
	}
	
	showTooltip = () => { this.setState( { visible: true } ); };
	hideTooltip = () => { this.setState( { visible: false } ); };
	
	render() {
		const { text, position, children } = this.props;
		const { visible } = this.state;
		
		return (
			<div 
				className="tooltip-container" 
				onMouseEnter={ this.showTooltip }
				onMouseLeave={ this.hideTooltip }>
				{ children }
				{ visible && 
					<div className={ `tooltip tooltip-${position || 'top'}` }>
						{ text }
					</div>
				}
			</div>
		);
	}
}

// Form Input Component - Has inconsistent styling and lacks proper structure
function Input( props ) {
	return (
		<div className="input-group">
			<label>{ props.label }</label>
			<input 
				type={ props.type || 'text' }
				value={ props.value }
				onChange={ props.onChange }
				placeholder={ props.placeholder } />
		</div>
	);
}

export { Button, Card, Tooltip, Input };